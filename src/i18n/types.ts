export interface AuthDict {
  login: string;
  logout: string;
  loginTitle: string;
  signupTitle: string;
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  password: string;
  passwordPlaceholder: string;
  loginSubmit: string;
  signupSubmit: string;
  switchToSignup: string;
  switchToLogin: string;
  loggedInAs: string;
  close: string;
  forgotPassword: string;
  resetTitle: string;
  resetTitleAccent: string;
  resetSubmit: string;
  resetSent: string;
  resetDevLinkNote: string;
  registerLink: string;
  loginLink: string;
  newPasswordTitle: string;
  newPasswordTitleAccent: string;
  newPassword: string;
  confirmPassword: string;
  confirmPasswordPlaceholder: string;
  newPasswordSubmit: string;
  newPasswordSuccess: string;
  newPasswordSuccessCta: string;
  errors: {
    invalid_input: string;
    email_taken: string;
    server_error: string;
    invalid_credentials: string;
    invalid_token: string;
    passwords_mismatch: string;
  };
}

export interface WelcomePanelDict {
  greeting: string; // contains {name} placeholder
  socialIntro: string;
  socialText: string;
  navTitle: string;
  navCalculators: string;
  navCalculatorsLink: string;
  savedMatrices: string;
  savedMatricesLink: string;
}

export interface AccountCard {
  title: string;
  accent: string;
  cta: string;
}

export interface AccountDict {
  sidebar: {
    myMatrices: string;
    pricing: string;
    history: string;
    matrixOfDestiny: string;
    finances: string;
    changePassword: string;
    support: string;
    logout: string;
  };
  availableDates: { title: string; accent: string; empty: string };
  subscriptions: { title: string; accent: string; empty: string };
  cards: AccountCard[];
}

export interface CardItem {
  title: string;
  text: string;
}

export interface FreeCard {
  title: string;
  text: string;
  items: string[];
}

export interface PricingPlan {
  name: string;
  price: number;
  oldPrice: number;
  features: string[];
  highlighted: boolean;
}

export interface PromoItem {
  title: string;
  text: string;
  cta: string;
  icon: string;
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    items: string[];
    login: string;
  };
  auth: AuthDict;
  welcomePanel: WelcomePanelDict;
  account: AccountDict;
  hero: {
    title: string;
    titleAccent: string;
    subtitle: string;
    kicker: string[];
    features: string[];
  };
  tabs: string[];
  form: {
    heading: string;
    todayTooltip: string;
    gender: string;
    man: string;
    woman: string;
    name: string;
    namePlaceholder: string;
    day: string;
    month: string;
    year: string;
    submit: string;
    freeNote: string;
    comingSoonNote: string;
    backToMatrix: string;
    dateError: string;
  };
  method: {
    badge: string;
    heading: string;
    paragraphs: string[];
  };
  reviews: {
    badge: string;
    heading: string;
    items: { name: string; text: string }[];
  };
  faq: {
    badge: string;
    heading: string;
    items: { q: string; a: string }[];
  };
  whatMatrix: {
    heading: string;
    headingAccent: string;
    items: string[];
    cta: string;
  };
  unique: {
    heading: string;
    headingAccent: string;
    body: string;
    cta: string;
  };
  energies: {
    heading: string;
    headingAccent: string;
    paragraphs: string[];
    cta: string;
  };
  learn: {
    heading: string;
    headingAccent: string;
    items: CardItem[];
    cta: string;
  };
  freeCalculate: {
    heading: string;
    cards: FreeCard[];
    cardCta: string;
  };
  pricing: {
    heading: string;
    popularBadge: string;
    plans: PricingPlan[];
    cta: string;
  };
  promo: {
    items: PromoItem[];
  };
  finalCta: {
    heading: string;
    subtitle: string;
    cta: string;
  };
  footer: {
    brand: string;
    links: string[];
    disclaimer: string;
  };
  result: {
    freeLabel: string;
    title: string;
    subtitle: string;
    summary: {
      personality: string;
      higherSelf: string;
      comfort: string;
      karma: string;
    };
    chakraTitle: string;
    chakraSubtitle: string;
    chakraHealthDisclaimer: string;
    chakraColumns: {
      chakra: string;
      physics: string;
      energy: string;
      emotions: string;
      health: string;
      total: string;
    };
    destinationsTitle: string;
    destinationsSubtitle: string;
    destinations: {
      personal: string;
      personalAge: string;
      sky: string;
      earth: string;
      social: string;
      socialAge: string;
      maleLine: string;
      femaleLine: string;
      spiritual: string;
      spiritualAge: string;
    };
    channelsTitle: string;
    channelsSubtitle: string;
    channels: {
      love: string;
      money: string;
      entrance: string;
      junction: string;
    };
    blocks: {
      visitTitle: string;
      comfortTitle: string;
      diagnosisTitle: string;
      diagnosisQuestion: string;
    };
    unlockList: {
      unlockLabel: string;
      freeCharacterTitle: string;
      freeComfortTitle: string;
      items: { key: string; title: string }[];
    };
    talentSupport: {
      heading: string;
      point1: string;
      point2: string;
    };
    paywall: {
      title: string;
      subtitle: string;
      items: string[];
    };
    ancestralPrograms: {
      title: string;
      subtitle: string;
      genericNameLabel: string;
      comingSoon: string;
      corners: {
        nw: string;
        ne: string;
        sw: string;
        se: string;
      };
    };
    sexualityProgram: {
      title: string;
      teaser: string;
      genericNameLabel: string;
      comingSoon: string;
    };
    karmicTail: {
      title: string;
      subtitle: string;
      teaser: string;
      genericNameLabel: string;
      comingSoon: string;
    };
    purposeSection: {
      title: string;
      subtitle: string;
    };
    chakraDeepDive: {
      title: string;
      subtitle: string;
      comingSoon: string;
      positiveLabel: string;
      negativeLabel: string;
    };
    agePeriods: {
      title: string;
      subtitle: string;
      currentLabel: string;
      comingSoon: string;
    };
    pricingTitle: string;
    notFoundTitle: string;
    notFoundBody: string;
    backHome: string;
  };
}
