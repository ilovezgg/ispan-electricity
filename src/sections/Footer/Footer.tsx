import { useTranslation } from "../../i18n/useTranslation";
import { CONTACT_INFO, WHATSAPP_LINK } from "../../config/contacts";
import { FooterCables } from "./FooterCables";
import styles from "./Footer.module.css";

export function Footer() {
  const { t } = useTranslation();
  const { logo } = t.header;
  const { cities, tagline, phoneLabel, callCta, whatsappCta, addressLabel, address, copyright, nif, privacyLink, legalLink } =
    t.footer;

  const { phoneDisplay, phoneHref, email } = CONTACT_INFO;
  const telHref = phoneHref;
  const waHref = WHATSAPP_LINK;

  return (
    <footer className={styles.footer}>
      <div className={styles.panel}>
        <FooterCables />

        <div className={styles.content}>
          <div className={styles.left}>
            <span className={styles.logo}>{logo}</span>

            <ul className={styles.cities}>
              {cities.map((city) => (
                <li key={city}>{city}</li>
              ))}
            </ul>

            <p className={styles.tagline}>{tagline}</p>
          </div>

          <div className={styles.right}>
            <span className={styles.phoneLabel}>{phoneLabel}</span>
            <a className={styles.phone} href={`tel:${telHref}`}>
              {phoneDisplay}
            </a>

            <div className={styles.buttons}>
              <a className={styles.whatsapp} href={waHref} target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.77.46 3.45 1.28 4.9L2 22l5.32-1.39a9.9 9.9 0 0 0 4.72 1.2h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.06c-.24.68-1.4 1.31-1.93 1.36-.5.05-1.02.24-3.42-.71-2.9-1.15-4.76-4.11-4.9-4.3-.14-.19-1.17-1.56-1.17-2.97 0-1.41.74-2.1 1-2.39.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.15.07.14.12.31.02.5-.1.19-.15.31-.29.48-.14.17-.3.37-.43.5-.14.14-.29.29-.13.57.17.28.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.33 1.44.28.14.44.12.6-.07.17-.19.71-.83.9-1.11.19-.28.38-.24.64-.14.26.09 1.66.78 1.95.93.28.14.47.21.54.33.07.12.07.68-.17 1.36Z" />
                </svg>
                {whatsappCta}
              </a>
              <a className={styles.call} href={`tel:${telHref}`}>
                {callCta}
              </a>
            </div>

            <div className={styles.details}>
              <span className={styles.addressLabel}>{addressLabel}</span>
              <span>{address}</span>
              <a href={`mailto:${email}`}>{email}</a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>
            {copyright} · {nif}
          </span>
          <div className={styles.legal}>
            <a href="#privacidad">{privacyLink}</a>
            <a href="#aviso-legal">{legalLink}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
