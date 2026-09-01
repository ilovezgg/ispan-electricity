export type Locale = "es" | "en" | "ru";

export interface StatEntry {
  readonly value: string;
  readonly label: string;
}

export interface Translation {
  readonly meta: {
    readonly htmlLang: string;
  };
  readonly header: {
    readonly logo: string;
    readonly nav: readonly [string, string, string];
    readonly cta: string;
  };
  readonly hero: {
    readonly badge: string;
    readonly titleLine1: string;
    readonly titleLine2: string;
    readonly subtitle: string;
    readonly stats: readonly [StatEntry, StatEntry];
  };
  readonly features: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly cta: string;
    readonly items: readonly [
      FeatureEntry,
      FeatureEntry,
      FeatureEntry,
      FeatureEntry,
    ];
  };
  readonly quiz: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly steps: readonly [
      QuizStep,
      QuizStep,
      QuizStep,
      QuizStep,
      QuizStep,
    ];
    readonly final: {
      readonly eyebrow: string;
      readonly heading: string;
      readonly subtitle: string;
      readonly phonePlaceholder: string;
      readonly emailPlaceholder: string;
      readonly commentPlaceholder: string;
      readonly submit: string;
      readonly submitting: string;
      readonly consent: string;
      readonly errorPhone: string;
      readonly errorEmail: string;
    };
    readonly thanks: {
      readonly badge: string;
      readonly heading: string;
      readonly subtitle: string;
    };
    readonly back: string;
    readonly next: string;
  };
  readonly about: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly subtitle: string;
    readonly founder: {
      readonly name: string;
      readonly role: string;
      readonly since: string;
    };
    readonly quoteKicker: string;
    readonly quote: string;
    readonly paragraph1: string;
    readonly paragraph2: string;
    readonly pillars: readonly [Pillar, Pillar, Pillar, Pillar];
  };
  readonly contacts: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly subtitle: string;
    readonly channels: readonly [Channel, Channel, Channel];
    readonly place: {
      readonly kicker: string;
      readonly area: string;
      readonly note: string;
      readonly hoursLabel: string;
      readonly hours: string;
      readonly mapLabel: string;
      readonly mapNote: string;
    };
  };
}

export interface FeatureEntry {
  readonly title: string;
  readonly description: string;
}

export interface QuizStep {
  readonly question: string;
  readonly options: readonly [string, string, string, string, string?];
}

export interface Pillar {
  readonly title: string;
  readonly text: string;
}

export interface Channel {
  readonly label: string;
  readonly value: string;
  readonly note: string;
}

export type Translations = Record<Locale, Translation>;
