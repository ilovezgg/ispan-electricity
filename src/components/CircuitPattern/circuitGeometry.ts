export interface CircuitNode {
  readonly id: number;
  readonly x: number;
  readonly y: number;
}

export interface CircuitEdge {
  readonly a: number;
  readonly b: number;
  readonly length: number;
}

export interface CircuitGeometry {
  readonly nodes: readonly CircuitNode[];
  /** Node ids with degree !== 2 — dead ends and branch points, drawn as pads. */
  readonly junctions: readonly CircuitNode[];
  /** One `d` string per degree-2 chain (and per closed loop), for the static line art. */
  readonly polylines: readonly string[];
  /** Raw node-to-node segments, used to walk pulses hop by hop. */
  readonly edges: readonly CircuitEdge[];
  /** nodeId -> neighbour nodeIds. */
  readonly adjacency: ReadonlyMap<number, readonly number[]>;
}

/** Deterministic PRNG (mulberry32) so a given seed always reproduces the same board. */
function makeRng(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Candidate step directions, deduped (the reverse of each is implicit in an undirected graph). */
const STEP_DIRECTIONS: readonly (readonly [number, number])[] = [
  [1, 0],
  [0, 1],
  [1, 1],
  [-1, 1],
];

/** Coarse random field, bilinearly sampled, so density clusters instead of scattering evenly. */
function makeDensityField(rng: () => number, cols: number, rows: number, blockSize: number) {
  const blocksX = Math.max(2, Math.ceil(cols / blockSize) + 1);
  const blocksY = Math.max(2, Math.ceil(rows / blockSize) + 1);
  const values = Array.from({ length: blocksX * blocksY }, () => rng());

  return (col: number, row: number): number => {
    const fx = col / blockSize;
    const fy = row / blockSize;
    const x0 = Math.min(blocksX - 2, Math.floor(fx));
    const y0 = Math.min(blocksY - 2, Math.floor(fy));
    const tx = fx - x0;
    const ty = fy - y0;
    const at = (x: number, y: number) => values[y * blocksX + x]!;
    const top = at(x0, y0) * (1 - tx) + at(x0 + 1, y0) * tx;
    const bottom = at(x0, y0 + 1) * (1 - tx) + at(x0 + 1, y0 + 1) * tx;
    return top * (1 - ty) + bottom * ty;
  };
}

export interface GenerateCircuitOptions {
  readonly width: number;
  readonly height: number;
  readonly seed: number;
  /** 0..1 overall coverage — higher keeps more branches and starts more trees. */
  readonly density: number;
  readonly cellSize?: number;
}

export function generateCircuit({
  width,
  height,
  seed,
  density,
  cellSize = 72,
}: GenerateCircuitOptions): CircuitGeometry {
  if (width <= 0 || height <= 0) {
    return { nodes: [], junctions: [], polylines: [], edges: [], adjacency: new Map() };
  }

  const rng = makeRng(seed);
  // Pad one extra cell on every side so the network bleeds off all four edges.
  const cols = Math.ceil(width / cellSize) + 2;
  const rows = Math.ceil(height / cellSize) + 2;
  const originX = -cellSize;
  const originY = -cellSize;

  const idOf = (col: number, row: number) => row * cols + col;
  const inBounds = (col: number, row: number) => col >= 0 && col < cols && row >= 0 && row < rows;

  const densityAt = makeDensityField(rng, cols, rows, 4);
  const clampedDensity = Math.min(1, Math.max(0, density));

  const visited = new Set<number>();
  const adjacency = new Map<number, number[]>();
  const edgeKeys = new Set<string>();
  const edges: CircuitEdge[] = [];

  const nodePos = (col: number, row: number) => ({
    x: originX + col * cellSize,
    y: originY + row * cellSize,
  });

  function addEdge(aCol: number, aRow: number, bCol: number, bRow: number) {
    const a = idOf(aCol, aRow);
    const b = idOf(bCol, bRow);
    const key = a < b ? `${a}:${b}` : `${b}:${a}`;
    if (edgeKeys.has(key)) return;
    edgeKeys.add(key);
    const pa = nodePos(aCol, aRow);
    const pb = nodePos(bCol, bRow);
    const length = Math.hypot(pb.x - pa.x, pb.y - pa.y);
    edges.push({ a, b, length });
    (adjacency.get(a) ?? adjacency.set(a, []).get(a)!).push(b);
    (adjacency.get(b) ?? adjacency.set(b, []).get(b)!).push(a);
  }

  interface Frontier {
    readonly fromCol: number;
    readonly fromRow: number;
    readonly toCol: number;
    readonly toRow: number;
  }
  const frontier: Frontier[] = [];

  function visit(col: number, row: number) {
    visited.add(idOf(col, row));
    for (const [dx, dy] of STEP_DIRECTIONS) {
      for (const sign of [1, -1] as const) {
        const toCol = col + dx * sign;
        const toRow = row + dy * sign;
        if (!inBounds(toCol, toRow) || visited.has(idOf(toCol, toRow))) continue;
        frontier.push({ fromCol: col, fromRow: row, toCol, toRow });
      }
    }
  }

  // Multi-source growth: more seeds (and a touch of extra reach) at higher density.
  const seedCount = Math.max(4, Math.round((cols * rows) / (26 - clampedDensity * 10)));
  for (let i = 0; i < seedCount; i += 1) {
    const col = Math.floor(rng() * cols);
    const row = Math.floor(rng() * rows);
    if (!visited.has(idOf(col, row))) visit(col, row);
  }

  while (frontier.length > 0) {
    const pickIndex = Math.floor(rng() * frontier.length);
    const candidate = frontier[pickIndex]!;
    frontier.splice(pickIndex, 1);
    if (visited.has(idOf(candidate.toCol, candidate.toRow))) continue;

    const local = densityAt(candidate.toCol, candidate.toRow);
    const acceptChance = 0.28 + local * 0.55 * clampedDensity + clampedDensity * 0.15;
    if (rng() > acceptChance) continue;

    addEdge(candidate.fromCol, candidate.fromRow, candidate.toCol, candidate.toRow);
    visit(candidate.toCol, candidate.toRow);
  }

  // Light second pass: occasional cross-links between already-visited neighbours, for loops.
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      if (!visited.has(idOf(col, row))) continue;
      for (const [dx, dy] of STEP_DIRECTIONS) {
        const toCol = col + dx;
        const toRow = row + dy;
        if (!inBounds(toCol, toRow) || !visited.has(idOf(toCol, toRow))) continue;
        if (rng() < 0.035 * clampedDensity) addEdge(col, row, toCol, toRow);
      }
    }
  }

  const nodes: CircuitNode[] = Array.from(visited, (id) => {
    const col = id % cols;
    const row = Math.floor(id / cols);
    const { x, y } = nodePos(col, row);
    return { id, x, y };
  });

  const degree = (id: number) => adjacency.get(id)?.length ?? 0;
  const junctions = nodes.filter((node) => degree(node.id) !== 2);

  // Trace polylines: walk out from every junction/endpoint through degree-2 chains.
  const usedEdgeKeys = new Set<string>();
  const edgeKey = (a: number, b: number) => (a < b ? `${a}:${b}` : `${b}:${a}`);
  const positionOf = new Map(nodes.map((n) => [n.id, n] as const));
  const polylines: string[] = [];

  function walkChain(startId: number, firstNeighbor: number): CircuitNode[] {
    const chain: CircuitNode[] = [positionOf.get(startId)!];
    let prev = startId;
    let current = firstNeighbor;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      usedEdgeKeys.add(edgeKey(prev, current));
      chain.push(positionOf.get(current)!);
      if (degree(current) !== 2) break;
      const neighbors = adjacency.get(current)!;
      const next = neighbors[0] === prev ? neighbors[1]! : neighbors[0]!;
      prev = current;
      current = next;
    }
    return chain;
  }

  for (const junction of junctions) {
    for (const neighbor of adjacency.get(junction.id) ?? []) {
      const key = edgeKey(junction.id, neighbor);
      if (usedEdgeKeys.has(key)) continue;
      const chain = walkChain(junction.id, neighbor);
      polylines.push(toPathD(chain));
    }
  }

  // Remaining unused edges only belong to pure cycles (every node on them has degree 2).
  for (const edge of edges) {
    const key = edgeKey(edge.a, edge.b);
    if (usedEdgeKeys.has(key)) continue;
    const chain = walkChain(edge.a, edge.b);
    if (chain.length > 1) polylines.push(toPathD(chain));
  }

  return { nodes, junctions, polylines, edges, adjacency };
}

function toPathD(points: readonly CircuitNode[]): string {
  if (points.length === 0) return "";
  const [first, ...rest] = points;
  return `M ${first!.x.toFixed(1)} ${first!.y.toFixed(1)} ` + rest.map((p) => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
}
