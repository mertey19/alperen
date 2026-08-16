export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Section({
  id,
  tone = "paper",
  className = "",
  children,
}: {
  id?: string;
  tone?: "paper" | "paper-2" | "ink";
  className?: string;
  children: React.ReactNode;
}) {
  const tones = {
    paper: "bg-paper text-ink",
    "paper-2": "bg-paper-2 text-ink",
    ink: "bg-ink text-paper",
  } as const;

  return (
    <section id={id} className={`${tones[tone]} py-16 sm:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  onInk = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  onInk?: boolean;
}) {
  return (
    <header className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <p className={onInk ? "eyebrow eyebrow-on-ink" : "eyebrow"}>{eyebrow}</p>
      ) : null}
      <h2
        className={`mt-3 font-display text-3xl leading-tight tracking-tight sm:text-4xl ${
          onInk ? "text-paper" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <div className={`mt-4 text-base leading-relaxed ${onInk ? "text-paper-3" : "text-muted"}`}>
          {description}
        </div>
      ) : null}
    </header>
  );
}
