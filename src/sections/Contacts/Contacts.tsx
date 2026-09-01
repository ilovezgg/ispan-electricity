import { useTranslation } from "../../i18n/useTranslation";
import styles from "./Contacts.module.css";

export function Contacts() {
  const { t } = useTranslation();
  const { eyebrow, heading, subtitle, channels, place } = t.contacts;

  const [call, whatsapp, mail] = channels;
  const phoneHref = "+34602684006";

  return (
    <section className={styles.contacts} aria-label={heading}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <div className={styles.grid}>
        <ul className={styles.channels}>
          <li>
            <a className={styles.channel} href={`tel:${phoneHref}`}>
              <span className={styles.channelLabel}>{call.label}</span>
              <span className={styles.channelValue}>{call.value}</span>
              <span className={styles.channelNote}>{call.note}</span>
              <span className={styles.arrow}>↗</span>
            </a>
          </li>
          <li>
            <a
              className={styles.channel}
              href={`https://wa.me/${phoneHref.replace("+", "")}`}
              target="_blank"
              rel="noreferrer"
            >
              <span className={styles.channelLabel}>{whatsapp.label}</span>
              <span className={styles.channelValue}>{whatsapp.value}</span>
              <span className={styles.channelNote}>{whatsapp.note}</span>
              <span className={styles.arrow}>↗</span>
            </a>
          </li>
          <li>
            <a className={styles.channel} href={`mailto:${mail.value}`}>
              <span className={styles.channelLabel}>{mail.label}</span>
              <span className={styles.channelValue}>{mail.value}</span>
              <span className={styles.channelNote}>{mail.note}</span>
              <span className={styles.arrow}>↗</span>
            </a>
          </li>
        </ul>

        <div className={styles.place}>
          <span className={styles.placeKicker}>{place.kicker}</span>
          <p className={styles.placeArea}>{place.area}</p>
          <p className={styles.placeNote}>{place.note}</p>
          <div className={styles.placeHours}>
            <span>{place.hoursLabel}</span>
            <b>{place.hours}</b>
          </div>
          <div className={styles.placeMap}>
            <span className={styles.placeMapLabel}>{place.mapLabel}</span>
            <span>{place.mapNote}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
