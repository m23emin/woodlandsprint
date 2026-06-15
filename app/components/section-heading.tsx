export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  light?: boolean;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "mx-auto max-w-2xl" : "max-w-2xl"}>
      <p
        className={`text-xs font-semibold uppercase tracking-wider ${
          light ? "text-accent" : "text-brand"
        } ${centered ? "text-center" : ""}`}
      >
        {eyebrow}
      </p>
      <h2
        className={`font-display mt-2 text-3xl font-bold tracking-tight sm:text-4xl ${
          light ? "text-white" : "text-foreground"
        } ${centered ? "text-center" : ""}`}
      >
        {title}
      </h2>
      <p
        className={`mt-3 text-base leading-relaxed ${
          light ? "text-white/70" : "text-muted"
        } ${centered ? "text-center" : ""}`}
      >
        {description}
      </p>
    </div>
  );
}
