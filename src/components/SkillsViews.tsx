import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { Layers, List, Code2 } from "lucide-react";
import { skillGroups, skillIcons, skillColors, skillRows } from "./skills-data";
import "./skills.css";

function Token({ name }: { name: string }) {
  const Icon = skillIcons[name] ?? Code2;
  return (
    <span className="tech-token">
      <span
        className="skill-brand-icon"
        data-dark-mark={name === "Solidity" || name === "Ethereum"}
        style={{ color: skillColors[name] }}
      >
        <Icon aria-hidden="true" className="size-5 shrink-0" />
      </span>
      <span>{name}</span>
    </span>
  );
}

function MovingRow({
  skills,
  label,
  reverse,
}: {
  skills: string[];
  label: string;
  reverse: boolean;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const sequence = useRef<HTMLUListElement>(null);
  const [copies, setCopies] = useState(1);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const container = viewport.current!;
    const original = sequence.current!;
    const measure = () => {
      const measured = original.getBoundingClientRect().width;
      if (!measured) return;
      setWidth(measured);
      setCopies(Math.max(1, Math.ceil(container.clientWidth / measured)));
    };
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    observer.observe(original);
    measure();
    return () => observer.disconnect();
  }, []);

  return (
    <div className="skills-lane" ref={viewport} role="group" aria-label={label}>
      <div
        className="skills-track"
        data-reverse={reverse}
        style={{ "--travel-time": `${Math.max((width * copies) / 28, 1)}s` } as CSSProperties}
      >
        {[0, 1].map((half) => (
          <div className="skills-sequence" key={half} aria-hidden={half === 1 ? true : undefined}>
            {Array.from({ length: copies }, (_, copy) => (
              <ul
                key={copy}
                ref={half === 0 && copy === 0 ? sequence : undefined}
                className="skills-repeat"
                aria-label={label}
                aria-hidden={half === 1 || copy > 0 ? true : undefined}
              >
                {skills.map((name) => (
                  <li key={name}>
                    <Token name={name} />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkillsViews() {
  const { t } = useTranslation();
  const [view, setView] = useState<"animated" | "grouped">("animated");
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current!;
    let inView = false;
    const update = () => {
      element.dataset["running"] = String(inView && !document.hidden);
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry?.isIntersecting ?? false;
      update();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    <div ref={root} className="skills-views mt-10 md:mt-16">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div role="group" aria-label={t("skills.views.view")} className="skills-switch">
          {(["animated", "grouped"] as const).map((option) => {
            const Icon = option === "animated" ? Layers : List;
            return (
              <button
                key={option}
                type="button"
                aria-pressed={view === option}
                aria-controls="skills-content"
                onClick={() => setView(option)}
              >
                <Icon aria-hidden="true" className="size-4" />
                {t(`skills.views.${option}`)}
              </button>
            );
          })}
        </div>
      </div>
      <div id="skills-content" className="border-t border-border">
        {view === "animated" ? (
          <div className="space-y-4 border-b border-border py-6 md:py-8">
            {skillRows.map((skills, index) => (
              <MovingRow
                key={index}
                skills={skills}
                label={t("skills.views.row", { number: index + 1 })}
                reverse={index % 2 === 1}
              />
            ))}
          </div>
        ) : (
          skillGroups.map(({ id, icon: GroupIcon, skills }, index) => (
            <div
              key={id}
              className="skill-row grid gap-6 border-b border-border py-8 md:grid-cols-[64px_1fr_2fr] md:items-center"
            >
              <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
              <div className="flex items-center gap-3">
                <GroupIcon aria-hidden="true" className="size-5 text-signal" />
                <h3 className="font-display text-lg font-medium">{t(`skills.groups.${id}`)}</h3>
              </div>
              <ul
                className="flex flex-wrap gap-3 md:justify-end"
                aria-label={t(`skills.groups.${id}`)}
              >
                {skills.map((name) => (
                  <li key={name}>
                    <Token name={name} />
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
