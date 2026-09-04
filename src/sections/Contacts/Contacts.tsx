import { useState, type FormEvent } from "react";
import { useTranslation } from "../../i18n/useTranslation";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { CONTACT_INFO, WHATSAPP_LINK } from "../../config/contacts";
import { submitLead } from "../../lib/leads";
import { ContactIcon, WhatsAppIcon } from "./icons";
import { formatSpanishPhone, isNameValid, isSpanishPhoneValid } from "./phoneMask";
import styles from "./Contacts.module.css";

type Status = "idle" | "sending" | "done";

function scrollToQuiz(): void {
  document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Contacts() {
  const { t } = useTranslation();
  const { eyebrow, heading, badge, statusLine, quizLink, channels, form, thanks } = t.contacts;
  const reducedMotion = useReducedMotion();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [task, setTask] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const nameValid = isNameValid(name);
  const phoneValid = isSpanishPhoneValid(phone);
  const showNameError = (nameTouched || submitAttempted) && !nameValid;
  const showPhoneError = (phoneTouched || submitAttempted) && !phoneValid;
  const canSubmit = nameValid && phoneValid && status !== "sending";

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSubmitAttempted(true);
    if (!nameValid || !phoneValid || status === "sending") return;

    setStatus("sending");
    try {
      await submitLead({ name, phone, message: task, source: "contact" });
    } catch (err) {
      console.error("[contacts] submission failed", err);
    }
    setStatus("done");
  }

  const telHref = `tel:${CONTACT_INFO.phoneHref}`;
  const mailHref = `mailto:${CONTACT_INFO.email}`;

  return (
    <section className={styles.contacts} id="contacto-directo" aria-label={heading}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 className={styles.heading}>{heading}</h2>

          <span className={styles.pill}>
            <span className={styles.pillDot} />
            {badge}
          </span>

          <div className={styles.status}>
            <span className={reducedMotion ? styles.statusDotStill : styles.statusDot} />
            {statusLine}
          </div>

          <ul className={styles.channelList}>
            <li>
              <a className={styles.channelRow} href={telHref}>
                <span className={styles.channelIcon}>
                  <ContactIcon name="phone" />
                </span>
                <span className={styles.channelLabel}>{channels.call.label}</span>
                <span className={styles.channelValue}>
                  {CONTACT_INFO.phoneDisplay}
                  <span className={styles.channelNote}>{channels.call.note}</span>
                </span>
              </a>
            </li>
            <li>
              <a className={styles.channelRow} href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
                <span className={styles.channelIcon}>
                  <WhatsAppIcon />
                </span>
                <span className={styles.channelLabel}>{channels.whatsapp.label}</span>
                <span className={styles.channelValue}>
                  {CONTACT_INFO.phoneDisplay}
                  <span className={styles.channelNote}>{channels.whatsapp.note}</span>
                </span>
              </a>
            </li>
            <li>
              <a className={styles.channelRow} href={mailHref}>
                <span className={styles.channelIcon}>
                  <ContactIcon name="mail" />
                </span>
                <span className={styles.channelLabel}>{channels.email.label}</span>
                <span className={styles.channelValue}>
                  {CONTACT_INFO.email}
                  <span className={styles.channelNote}>{channels.email.note}</span>
                </span>
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.right}>
          <div className={styles.card}>
            {status === "done" ? (
              <div className={styles.doneState}>
                <span className={styles.doneCheck}>
                  <ContactIcon name="check" />
                </span>
                <h3 className={styles.doneHeading}>{thanks.heading}</h3>
                <p className={styles.doneSubtitle}>{thanks.subtitle}</p>
                <a className={styles.doneWhatsapp} href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
                  <WhatsAppIcon />
                  {thanks.whatsappCta}
                </a>
              </div>
            ) : (
              <>
                <div className={styles.cardHeader}>
                  <span className={styles.quizLink}>{quizLink}</span>
                  <button
                    type="button"
                    className={styles.quizButton}
                    onClick={scrollToQuiz}
                    aria-label={quizLink}
                  >
                    <ContactIcon name="arrowUpRight" />
                  </button>
                </div>

                <form className={styles.form} onSubmit={submit} noValidate>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="contact-name">
                      {form.nameLabel}
                    </label>
                    <input
                      id="contact-name"
                      className={showNameError ? `${styles.input} ${styles.inputError}` : styles.input}
                      type="text"
                      autoComplete="name"
                      placeholder={form.namePlaceholder}
                      value={name}
                      aria-invalid={showNameError}
                      aria-describedby={showNameError ? "contact-name-error" : undefined}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={() => setNameTouched(true)}
                    />
                    {showNameError ? (
                      <span id="contact-name-error" className={styles.errorText}>
                        {form.errorName}
                      </span>
                    ) : null}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="contact-phone">
                      {form.phoneLabel}
                    </label>
                    <input
                      id="contact-phone"
                      className={showPhoneError ? `${styles.input} ${styles.inputError}` : styles.input}
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder={form.phonePlaceholder}
                      value={phone}
                      aria-invalid={showPhoneError}
                      aria-describedby={showPhoneError ? "contact-phone-error" : undefined}
                      onChange={(e) => setPhone(formatSpanishPhone(e.target.value))}
                      onBlur={() => setPhoneTouched(true)}
                    />
                    {showPhoneError ? (
                      <span id="contact-phone-error" className={styles.errorText}>
                        {form.errorPhone}
                      </span>
                    ) : null}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="contact-task">
                      {form.taskLabel}
                    </label>
                    <textarea
                      id="contact-task"
                      className={styles.textarea}
                      placeholder={form.taskPlaceholder}
                      value={task}
                      rows={3}
                      onChange={(e) => setTask(e.target.value)}
                    />
                  </div>

                  <button type="submit" className={styles.submit} disabled={!canSubmit}>
                    {status === "sending" ? (
                      <>
                        <ContactIcon name="spinner" className={styles.spinner!} />
                        {form.submitting}
                      </>
                    ) : (
                      form.submit
                    )}
                  </button>

                  <p className={styles.consent}>
                    {form.consentPrefix}
                    <a href="#privacidad">{form.consentLinkText}</a>
                    {form.consentSuffix}
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
