import { useState, type FormEvent } from "react";
import { useTranslation } from "../../i18n/useTranslation";
import styles from "./Quiz.module.css";

type Status = "idle" | "sending" | "done" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Quiz() {
  const { t } = useTranslation();
  const { eyebrow, heading, steps, final, thanks, back } = t.quiz;

  const totalSteps = steps.length + 1;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const isFinal = step === steps.length;
  const progress = ((step + 1) / totalSteps) * 100;

  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const pick = (value: string) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setAnswers((a) => ({ ...a, [step]: value }));
    setTimeout(() => {
      setStep((s) => Math.min(s + 1, steps.length));
      setIsTransitioning(false);
    }, 220);
  };

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;

    if (phone.replace(/\D/g, "").length < 9) {
      setStatus("error");
      setError(final.errorPhone);
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      setError(final.errorEmail);
      return;
    }

    setStatus("sending");

    // No backend wired up yet — this project has no API route, so the
    // submission is simulated locally until a lead endpoint exists.
    await new Promise((resolve) => setTimeout(resolve, 600));
    setStatus("done");
  }

  if (status === "done") {
    return (
      <section className={styles.quiz} id="contacto" aria-label={thanks.heading}>
        <div className={styles.thanks}>
          <span className={styles.pill}>
            <span className={styles.dot} />
            {thanks.badge}
          </span>
          <h2 className={styles.thanksHeading}>{thanks.heading}</h2>
          <p className={styles.thanksSubtitle}>{thanks.subtitle}</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.quiz} id="contacto" aria-label={heading}>
      <div className={styles.header}>
        <div className={styles.top}>
          <span className={styles.pill}>
            <span className={styles.dot} />
            {eyebrow}
          </span>
          <span className={styles.stepCount}>
            {String(step + 1).padStart(2, "0")} / {String(totalSteps).padStart(2, "0")}
          </span>
        </div>
        <h2 className={styles.heading}>{isFinal ? final.heading : heading}</h2>
        <div className={styles.progress}>
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div
        key={step}
        className={isFinal ? `${styles.card} ${styles.dark}` : styles.card}
      >
        {isFinal ? (
          <>
            <p className={styles.finalSubtitle}>{final.subtitle}</p>

            <form className={styles.form} onSubmit={submit}>
              <input
                className={styles.input}
                type="tel"
                inputMode="tel"
                placeholder={final.phonePlaceholder}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
              />
              <input
                className={styles.input}
                type="email"
                placeholder={final.emailPlaceholder}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
              />
              <textarea
                className={styles.textarea}
                placeholder={final.commentPlaceholder}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
              />

              <div className={styles.nav}>
                <button type="button" className={styles.back} onClick={goBack}>
                  {back}
                </button>
                <button type="submit" className={styles.submit} disabled={status === "sending"}>
                  {status === "sending" ? final.submitting : final.submit}
                  <span className={styles.arrow} aria-hidden="true">
                    ↗
                  </span>
                </button>
              </div>

              <small className={status === "error" ? `${styles.small} ${styles.err}` : styles.small}>
                {status === "error" ? error : final.consent}
              </small>
            </form>
          </>
        ) : (
          <>
            <div className={styles.question}>
              <h3>{steps[step]!.question}</h3>
              <span className={styles.stepBadge}>{String(step + 1).padStart(2, "0")}</span>
            </div>

            <div className={styles.opts}>
              {steps[step]!.options
                .filter((o): o is string => Boolean(o))
                .map((option, i) => (
                  <button
                    type="button"
                    key={option}
                    className={
                      answers[step] === option ? `${styles.opt} ${styles.sel}` : styles.opt
                    }
                    disabled={isTransitioning}
                    onClick={() => pick(option)}
                  >
                    <span>
                      <span className={styles.optMeta}>{String(i + 1).padStart(2, "0")}</span>
                      <span className={styles.optLabel}>{option}</span>
                    </span>
                    <span className={styles.check} aria-hidden="true" />
                  </button>
                ))}
            </div>

            <div className={styles.nav}>
              <button
                type="button"
                className={styles.back}
                onClick={goBack}
                disabled={step === 0}
              >
                {back}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
