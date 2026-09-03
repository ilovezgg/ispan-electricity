export interface ContactInfo {
  /** Human-readable, e.g. "+34 602 684 006" */
  readonly phoneDisplay: string;
  /** Digits-only with leading +, for tel: hrefs */
  readonly phoneHref: string;
  /** Digits-only, no +, for wa.me links */
  readonly whatsappNumber: string;
  readonly email: string;
}

export const CONTACT_INFO: ContactInfo = {
  phoneDisplay: "+34 602 684 006",
  phoneHref: "+34602684006",
  whatsappNumber: "34602684006",
  email: "info@voltia.es",
};

export const WHATSAPP_LINK = `https://wa.me/${CONTACT_INFO.whatsappNumber}`;
