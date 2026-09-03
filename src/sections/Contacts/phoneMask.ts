/** Reformats free-typed input into "+34 XXX XXX XXX" as the user types. */
export function formatSpanishPhone(input: string): string {
  const digits = input.replace(/\D/g, "").replace(/^34/, "");
  const national = digits.slice(0, 9);
  if (!national) return "";
  const groups = national.match(/.{1,3}/g) ?? [];
  return `+34 ${groups.join(" ")}`;
}

export function isSpanishPhoneValid(phone: string): boolean {
  return /^\+34\d{9}$/.test(phone.replace(/\s/g, ""));
}

export function isNameValid(name: string): boolean {
  return name.trim().length >= 2;
}
