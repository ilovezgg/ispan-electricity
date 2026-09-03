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
    readonly footnote: string;
    readonly cardWork: FeatureCardWork;
    readonly cardStats: FeatureCardStats;
    readonly cardRegions: FeatureCardRegions;
  };
  readonly quiz: {
    readonly heading: string;
    readonly hint: string;
    readonly steps: readonly [QuizStep, QuizStep, QuizStep, QuizStep];
    readonly final: {
      readonly heading: string;
      readonly subtitle: string;
      readonly namePlaceholder: string;
      readonly phonePlaceholder: string;
      readonly submit: string;
      readonly submitting: string;
      readonly consent: string;
      readonly errorName: string;
      readonly errorPhone: string;
    };
    readonly thanks: {
      readonly badge: string;
      readonly heading: string;
      readonly subtitle: string;
    };
    readonly back: string;
    readonly next: string;
    readonly pick: string;
  };
  readonly about: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly subtitle: string;
    readonly founder: {
      readonly name: string;
      readonly role: string;
    };
    readonly quoteKicker: string;
    readonly quote: string;
    readonly paragraph: string;
    readonly pillars: readonly [Pillar, Pillar, Pillar, Pillar];
  };
  readonly contacts: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly badge: string;
    readonly statusLine: string;
    readonly quizLink: string;
    readonly channels: {
      readonly call: ChannelCopy;
      readonly whatsapp: ChannelCopy;
      readonly email: ChannelCopy;
    };
    readonly form: {
      readonly nameLabel: string;
      readonly namePlaceholder: string;
      readonly phoneLabel: string;
      readonly phonePlaceholder: string;
      readonly taskLabel: string;
      readonly taskPlaceholder: string;
      readonly submit: string;
      readonly submitting: string;
      readonly errorName: string;
      readonly errorPhone: string;
      readonly consentPrefix: string;
      readonly consentLinkText: string;
      readonly consentSuffix: string;
    };
    readonly thanks: {
      readonly heading: string;
      readonly subtitle: string;
      readonly whatsappCta: string;
    };
  };
  readonly footer: {
    readonly cities: readonly string[];
    readonly tagline: string;
    readonly phoneLabel: string;
    readonly callCta: string;
    readonly whatsappCta: string;
    readonly addressLabel: string;
    readonly address: string;
    readonly copyright: string;
    readonly nif: string;
    readonly privacyLink: string;
    readonly legalLink: string;
  };
}

export interface ChannelCopy {
  readonly label: string;
  readonly note: string;
}

export interface FeatureCardWork {
  readonly title: string;
  readonly description: string;
  readonly statusLabel: string;
}

export interface FeatureCardStats {
  readonly number: string;
  readonly title: string;
  readonly subtitle: string;
  readonly stat1Label: string;
  readonly stat1Value: string;
  readonly stat2Label: string;
  readonly stat2Value: string;
  readonly text: string;
}

export interface FeatureCardRegions {
  readonly label: string;
  readonly heading: string;
  readonly tags: readonly string[];
}

export interface QuizOption {
  readonly label: string;
  readonly tag: string;
}

export interface QuizStep {
  readonly question: string;
  readonly options: readonly [QuizOption, QuizOption, QuizOption, QuizOption];
}

export interface Pillar {
  readonly title: string;
}

export type Translations = Record<Locale, Translation>;
