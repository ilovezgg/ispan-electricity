import { useLayoutEffect, useRef, useState, type FormEvent } from "react";
import { useTranslation } from "../../i18n/useTranslation";
import { PASTELS, QUIZ_OPTION_ICONS } from "./quizConfig";
import { QuizOptionCard } from "./QuizOptionCard";
import { QuizStepper } from "./QuizStepper";
import styles from "./Quiz.module.css";

type Status = "idle" | "sending" | "done" | "error";

/** Selected option index per question step; `null` until answered. */
type QuizAnswers = readonly (number | null)[];

/** Snapshot handed to onSubmit — a stub, since there is no lead endpoint yet. */
interface QuizSubmission {
  readonly answers: readonly { readonly question: string; readonly option: string }[];
  readonly name: string;
  readonly phone: string;
}

function handleQuizSubmit(submission: QuizSubmission): void {
  // No backend wired up yet — this project has no API route, so submission
  // is just logged until a lead endpoint exists.
  console.info("[quiz] submission", submission);
}

export function Quiz() {
  const { t } = useTranslation();
  const { heading, hint, steps, final, thanks, back, next, pick } = t.quiz;

  const totalSteps = steps.length;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>(steps.map(() => null));

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const isFinal = step === totalSteps;
  const currentAnswer = isFinal ? null : answers[step]!;

  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">("auto");

  useLayoutEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [step, status]);

  const goBack = () => setStep((s) => Math.max(0, s - 1));
  const goNext = () => setStep((s) => Math.min(s + 1, totalSteps));

  const selectOption = (optionIndex: number) => {
    setAnswers((prev) => prev.map((value, i) => (i === step ? optionIndex : value)));
  };

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;

    if (name.trim().length < 2) {
      setStatus("error");
      setError(final.errorName);
      return;
    }
    if (phone.replace(/\D/g, "").length < 9) {
      setStatus("error");
      setError(final.errorPhone);
      return;
    }

    setStatus("sending");

    handleQuizSubmit({
      answers: steps.map((s, i) => ({ question: s.question, option: s.options[answers[i]!]!.label })),
      name,
      phone,
    });

    await new Promise((resolve) => setTimeout(resolve, 500));
    setStatus("done");
  }

  if (status === "done") {
    return (
      <section className={styles.quiz} id="contacto" aria-label={thanks.heading}>
        <div className={styles.outer}>
          <div className={styles.thanks}>
            <span className={styles.pill}>
              <span className={styles.dot} />
              {thanks.badge}
            </span>
            <h2 className={styles.thanksHeading}>{thanks.heading}</h2>
            <p className={styles.thanksSubtitle}>{thanks.subtitle}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.quiz} id="contacto" aria-label={heading}>
      <div className={styles.outer}>
        <div className={styles.header}>
          <QuizStepper total={totalSteps} currentIndex={step} />
          <span className={styles.hint}>{hint}</span>
        </div>

        <div className={styles.cardOuter} style={{ height: height === "auto" ? "auto" : `${height}px` }}>
          <div ref={contentRef} key={step} className={styles.cardInner}>
            {isFinal ? (
              <>
                <h3 className={styles.question}>{final.heading}</h3>
                <p className={styles.finalSubtitle}>{final.subtitle}</p>

                <form className={styles.form} onSubmit={submit}>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder={final.namePlaceholder}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                  />
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

                  <div className={styles.nav}>
                    <button type="button" className={styles.back} onClick={goBack}>
                      {back}
                    </button>
                    <button type="submit" className={styles.submit} disabled={status === "sending"}>
                      {status === "sending" ? final.submitting : final.submit}
                    </button>
                  </div>

                  <small className={status === "error" ? `${styles.small} ${styles.err}` : styles.small}>
                    {status === "error" ? error : final.consent}
                  </small>
                </form>
              </>
            ) : (
              <>
                <h3 className={styles.question}>{steps[step]!.question}</h3>

                <div className={styles.opts}>
                  {steps[step]!.options.map((option, i) => (
                    <QuizOptionCard
                      key={option.label}
                      label={option.label}
                      tag={option.tag}
                      icon={QUIZ_OPTION_ICONS[step]![i]!}
                      pastel={PASTELS[i]!}
                      selected={currentAnswer === i}
                      pickLabel={pick}
                      onSelect={() => selectOption(i)}
                    />
                  ))}
                </div>

                <div className={styles.nav}>
                  {step > 0 ? (
                    <button type="button" className={styles.back} onClick={goBack}>
                      {back}
                    </button>
                  ) : (
                    <span />
                  )}
                  <button
                    type="button"
                    className={styles.next}
                    disabled={currentAnswer === null}
                    onClick={goNext}
                  >
                    {next}
                    <span className={styles.arrow} aria-hidden="true">→</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
