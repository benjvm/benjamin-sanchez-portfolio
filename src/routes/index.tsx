import { SkillsViews } from "@/components/SkillsViews";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { Trans, useTranslation } from "react-i18next";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Download,
  Github,
  Instagram,
  Linkedin,
  Menu,
  Send,
  Smartphone,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { contactSchema } from "@/lib/contact-schema";
import { sendContactMessage } from "@/lib/contact.functions";
import { en, es, getStoredLanguage } from "@/i18n";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import internHubVideo from "@/assets/video_internhub.mp4";
import internHubImage1 from "@/assets/internhub_image_1.jpeg";
import internHubImage2 from "@/assets/internhub_image_2.jpeg";
import wtfoodVideo1 from "@/assets/WTFood_video_1.mp4";
import wtfoodVideo2 from "@/assets/WTFood_video_2.mp4";
import wtfoodImage1 from "@/assets/wtfood_image_1.png";
import wtfoodImage2 from "@/assets/wtfood_image_2.png";
import excellenceCertificate from "@/assets/excellence_certificate.png";
import cvPdf from "@/assets/Benjamin_Sanchez.pdf";

export const Route = createFileRoute("/")({
  head: () => {
    const dict = getStoredLanguage() === "es" ? es : en;
    return {
      meta: [
        { title: dict.meta.title },
        {
          name: "description",
          content: dict.meta.description,
        },
        { property: "og:title", content: dict.meta.ogTitle },
        {
          property: "og:description",
          content: dict.meta.ogDescription,
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: Portfolio,
});

const navItems = [
  { key: "about", target: "about" },
  { key: "skills", target: "skills" },
  { key: "projects", target: "projects" },
  { key: "contact", target: "contact" },
] as const;

type ProjectMedia = {
  src: string;
  mediaKey: string;
  type: "image" | "video";
};

const projects = [
  {
    id: "internhub",
    index: "01",
    hash: "0x1A7F...B24C",
    githubUrl: "https://github.com/benjvm/InternHub",
    tech: ["React", "Firebase", "JavaScript", "Cloudinary"],
    media: [
      {
        type: "image",
        src: internHubImage1,
        mediaKey: "image1",
      },
      {
        type: "video",
        src: internHubVideo,
        mediaKey: "video1",
      },
      {
        type: "image",
        src: internHubImage2,
        mediaKey: "image2",
      },
    ] satisfies ProjectMedia[],
    certificate: excellenceCertificate,
  },
  {
    id: "wtfood",
    index: "02",
    hash: "0x8D3E...90AF",
    githubUrl: "https://github.com/benjvm/WTFood",
    tech: ["Flutter", "Dart", "Firebase", "AI"],
    media: [
      { type: "image", src: wtfoodImage1, mediaKey: "image1" },
      { type: "video", src: wtfoodVideo1, mediaKey: "video1" },
      {
        type: "video",
        src: wtfoodVideo2,
        mediaKey: "video2",
      },
      { type: "image", src: wtfoodImage2, mediaKey: "image2" },
    ] satisfies ProjectMedia[],
  },
];

function Portfolio() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactStatus, setContactStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [contactError, setContactError] = useState("");
  const sendMessage = useServerFn(sendContactMessage);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 32);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const result = contactSchema.safeParse({
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
    });

    if (!result.success) {
      setContactStatus("error");
      setContactError(t(result.error.issues[0]?.message ?? "contact.errors.checkForm"));
      return;
    }

    setContactStatus("submitting");
    setContactError("");

    try {
      await sendMessage({ data: result.data });
      setContactStatus("success");
      form.reset();
    } catch {
      setContactStatus("error");
      setContactError(t("contact.errors.sendFailed"));
    }
  };

  const moveHero = (event: PointerEvent<HTMLElement>) => {
    if (!window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches)
      return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    event.currentTarget.style.setProperty("--pointer-x", x.toFixed(3));
    event.currentTarget.style.setProperty("--pointer-y", y.toFixed(3));
  };

  const resetHero = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--pointer-x", "0");
    event.currentTarget.style.setProperty("--pointer-y", "0");
  };

  const blockchainItems = ["0", "1", "2", "3", "4"].map((key) => t(`blockchain.items.${key}`));

  return (
    <main className="text-foreground">
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${scrolled || menuOpen ? "border-border bg-background/90 backdrop-blur-xl" : "border-transparent bg-transparent"}`}
      >
        <nav
          aria-label={t("nav.ariaLabel")}
          className="mx-auto flex h-16 max-w-[1480px] items-center justify-between gap-4 px-5 md:px-10 xl:grid xl:grid-cols-[1fr_auto_1fr]"
        >
          <a
            href="#top"
            className="justify-self-start font-sans text-sm font-semibold tracking-[0.08em] text-foreground"
          >
            <span className="text-signal">{`{ `}</span>BS.DEV
            <span className="text-signal">{` }`}</span>
          </a>
          <div className="hidden items-center gap-5 lg:flex xl:gap-8">
            {navItems.map((item, index) => (
              <a key={item.key} href={`#${item.target}`} className="nav-link">
                <span>0{index + 1}</span>
                {t(`nav.${item.key}`)}
              </a>
            ))}
          </div>
          <div className="hidden items-center gap-3 lg:flex lg:justify-self-end">
            <ThemeToggle />
            <LanguageSwitcher />
            <Button asChild variant="signal" size="sm">
              <a href={cvPdf} download target="_blank" rel="noreferrer">
                <Download />
                {t("nav.cvShort")}
              </a>
            </Button>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </nav>
        {menuOpen && (
          <div className="border-t border-border bg-background px-5 py-6 lg:hidden">
            {navItems.map((item, index) => (
              <a
                key={item.key}
                href={`#${item.target}`}
                onClick={() => setMenuOpen(false)}
                className="flex border-b border-border py-4 font-sans text-lg font-semibold"
              >
                <span className="mr-5 font-mono text-xs text-signal">0{index + 1}</span>
                {t(`nav.${item.key}`)}
              </a>
            ))}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <ThemeToggle />
              <LanguageSwitcher />
              <Button asChild variant="signal" className="w-full">
                <a href={cvPdf} download target="_blank" rel="noreferrer">
                  <Download />
                  {t("nav.downloadCv")}
                </a>
              </Button>
            </div>
          </div>
        )}
      </header>

      <section
        id="top"
        onPointerMove={moveHero}
        onPointerLeave={resetHero}
        className="hero-depth relative flex min-h-[100svh] items-center overflow-hidden border-b border-border px-5 py-28 md:px-10"
      >
        <div className="hero-gradient absolute inset-0" aria-hidden="true" />
        <div className="node-field absolute inset-0" aria-hidden="true">
          <span className="node node-a" />
          <span className="node node-b" />
          <span className="node node-c" />
          <span className="node node-d" />
          <i className="chain-line chain-one" />
          <i className="chain-line chain-two" />
        </div>
        <div className="hero-depth-copy relative z-10 mx-auto w-full max-w-[1480px]">
          <p className="eyebrow mb-4">{t("hero.eyebrow")}</p>
          <h1
            aria-label={t("hero.nameAria")}
            className="typing-name max-w-6xl font-display text-[clamp(3.4rem,11vw,10rem)] font-semibold leading-[0.82]"
          >
            <span className="typing-line typing-line-first" aria-hidden="true">
              BENJAMIN
            </span>
            <span className="typing-line typing-line-second outline-type" aria-hidden="true">
              SÁNCHEZ
            </span>
          </h1>
          <div className="mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <p className="max-w-xl text-lg leading-8 text-muted-foreground md:text-xl">
              {t("hero.tagline")}
            </p>
            <Button asChild variant="signal" size="lg">
              <a href={cvPdf} download target="_blank" rel="noreferrer">
                <Download />
                {t("nav.downloadCv")}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Section id="about" number="01" labelKey="about.label">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="eyebrow">{t("about.eyebrow")}</p>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.05] md:text-7xl">
              {t("about.heading")}
            </h2>
            <div className="mt-10 max-w-2xl space-y-5 text-base leading-8 text-muted-foreground md:text-lg">
              <p>
                <Trans
                  i18nKey="about.p1"
                  components={{
                    1: <strong className="text-foreground" />,
                    2: <strong className="text-foreground" />,
                  }}
                />
              </p>
              <p>
                <Trans
                  i18nKey="about.p2"
                  components={{
                    1: <strong className="text-foreground" />,
                    2: <strong className="text-foreground" />,
                  }}
                />
              </p>
            </div>
          </div>
          <CodePanel />
        </div>
      </Section>

      <section id="skills" className="border-y border-border bg-surface py-24 md:py-36">
        <div className="mx-auto max-w-[1480px] px-5 md:px-10">
          <SectionHeading number="02" labelKey="skills.label" />
          <SkillsViews />
        </div>
      </section>

      <section id="projects" className="py-24 md:py-36">
        <div className="mx-auto max-w-[1480px] px-5 md:px-10">
          <SectionHeading number="03" labelKey="projects.label" />
          <div className="mt-16 space-y-20 md:space-y-32">
            {projects.map((project, index) => (
              <article
                key={project.id}
                className="project-block grid gap-8 lg:grid-cols-12 lg:items-center"
              >
                <ProjectCarousel project={project} className={index % 2 ? "lg:order-2" : ""} />
                <div className="lg:col-span-5 lg:px-8">
                  <div className="flex items-center justify-between border-b border-border pb-4 font-mono text-[10px] text-muted-foreground">
                    <span>{t(`projects.items.${project.id}.type`)}</span>
                    <span>{project.hash}</span>
                  </div>
                  <h3 className="mt-7 font-display text-5xl font-semibold md:text-7xl">
                    {t(`projects.items.${project.id}.name`)}
                  </h3>
                  <p className="mt-6 text-base leading-8 text-muted-foreground md:text-lg">
                    {t(`projects.items.${project.id}.description`)}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="border border-border px-3 py-2 font-mono text-[10px] uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-9 flex items-center gap-4">
                    <Button asChild variant="signal">
                      <a href={project.githubUrl} target="_blank" rel="noreferrer">
                        <Github />
                        {t("projects.viewOnGithub")}
                        <ArrowUpRight />
                      </a>
                    </Button>
                    {project.certificate && (
                      <img
                        src={project.certificate}
                        alt={t(`projects.items.${project.id}.certificateAlt`)}
                        width={110}
                        height={110}
                        className="size-[110px] object-contain"
                      />
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-24 flex items-center gap-4 border-t border-border pt-6 font-mono text-xs uppercase text-muted-foreground">
            <span className="status-dot" />
            {t("projects.moreComingSoon")}
          </div>
        </div>
      </section>

      <section className="career-band relative overflow-hidden border-y border-border bg-surface py-24 md:py-36">
        <div className="orbit-lines absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1480px] gap-12 px-5 md:px-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="eyebrow">{t("blockchain.eyebrow")}</p>
            <h2 className="mt-5 font-display text-5xl font-semibold md:text-7xl">
              {t("blockchain.heading")}
              <br />
              <span className="text-signal">{t("blockchain.headingAccent")}</span>
            </h2>
          </div>
          <div className="lg:pt-12">
            <p className="max-w-3xl text-2xl leading-relaxed md:text-4xl">
              {t("blockchain.description")}
            </p>
            <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2">
              {blockchainItems.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-4 bg-surface px-5 py-5 font-mono text-xs"
                >
                  <span className="text-signal">0{index + 1}</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section id="contact" number="04" labelKey="contact.label">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">{t("contact.eyebrow")}</p>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-none md:text-7xl">
              {t("contact.heading")}
            </h2>
            <p className="mt-7 max-w-md leading-7 text-muted-foreground">{t("contact.intro")}</p>
            <Socials className="mt-10" />
          </div>
          <form
            onSubmit={submit}
            className="border border-border bg-surface p-6 md:p-10"
            aria-label={t("contact.formAria")}
          >
            <div className="mb-9 flex items-center justify-between border-b border-border pb-4 font-sans text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
              <span>{t("contact.requestLabel")}</span>
              <span className="text-signal">{t("contact.channel")}</span>
            </div>
            <div className="space-y-7">
              <Field labelKey="contact.fields.name" name="name" type="text" autoComplete="name" />
              <Field
                labelKey="contact.fields.email"
                name="email"
                type="email"
                autoComplete="email"
              />
              <label className="block">
                <span className="field-label">{t("contact.fields.message").toLowerCase()}:</span>
                <textarea
                  name="message"
                  required
                  minLength={10}
                  maxLength={5000}
                  rows={5}
                  className="field-control resize-none"
                />
              </label>
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label>
                  {t("contact.fields.website")}
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              <div className="flex flex-wrap items-center gap-5">
                <Button
                  type="submit"
                  variant="signal"
                  size="lg"
                  disabled={contactStatus === "submitting"}
                >
                  <Send />
                  {contactStatus === "submitting" ? t("contact.submitting") : t("contact.submit")}
                </Button>
                {contactStatus === "success" && (
                  <p role="status" className="text-sm text-muted-foreground">
                    {t("contact.success")}
                  </p>
                )}
                {contactStatus === "error" && (
                  <p role="alert" className="text-sm text-destructive">
                    {contactError}
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </Section>

      <footer className="border-t border-border bg-surface py-8">
        <div className="mx-auto flex max-w-[1480px] flex-col gap-6 px-5 md:flex-row md:items-center md:justify-between md:px-10">
          <p className="font-mono text-xs text-muted-foreground">
            {t("footer.copyright")} <span className="text-signal">//</span> {t("footer.status")}
          </p>
          <Socials />
        </div>
      </footer>
    </main>
  );
}

function CodePanel() {
  const { t } = useTranslation();
  return (
    <div className="code-panel">
      <div className="code-panel-head">
        <span className="flex items-center gap-2">
          <Braces className="size-4 text-signal" />
          {t("codePanel.file")}
        </span>
        <span>{t("codePanel.encoding")}</span>
      </div>
      <pre aria-label={t("codePanel.ariaLabel")}>
        <code>
          <span className="code-punc">{`{`}</span>
          {`\n  `}
          <span className="code-key">"name"</span>:{" "}
          <span className="code-value">"Benjamin Sánchez"</span>,{`\n  `}
          <span className="code-key">"education"</span>: [<span className="code-value">"DAW"</span>,{" "}
          <span className="code-value">"DAM"</span>],{`\n  `}
          <span className="code-key">"builds"</span>: [{`\n    `}
          <span className="code-value">"web"</span>,{`\n    `}
          <span className="code-value">"backend"</span>,{`\n    `}
          <span className="code-value">"mobile"</span>
          {`\n  `}],{`\n  `}
          <span className="code-key">"next_block"</span>: <span className="code-value">"web3"</span>
          ,{`\n  `}
          <span className="code-key">"status"</span>:{" "}
          <span className="code-bool">"{t("codePanel.status")}"</span>
          {`\n`}
          <span className="code-punc">{`}`}</span>
        </code>
      </pre>
    </div>
  );
}

function Section({
  id,
  number,
  labelKey,
  children,
}: {
  id: string;
  number: string;
  labelKey: string;
  children: ReactNode;
}) {
  const { t } = useTranslation();

  return (
    <section id={id} aria-label={t(labelKey)} className="scroll-mt-16 py-24 md:py-36">
      <div className="mx-auto max-w-[1480px] px-5 md:px-10">
        <SectionHeading number={number} labelKey={labelKey} />
        <div className="mt-16">{children}</div>
      </div>
    </section>
  );
}

function SectionHeading({ number, labelKey }: { number: string; labelKey: string }) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between border-b border-border pb-4">
      <div className="flex items-center gap-4">
        <span className="font-mono text-[10px] text-signal">[{number}]</span>
        <p className="font-mono text-xs uppercase text-muted-foreground">{t(labelKey)}</p>
      </div>
    </div>
  );
}

function Field({
  labelKey,
  name,
  type,
  autoComplete,
}: {
  labelKey: string;
  name: string;
  type: string;
  autoComplete: string;
}) {
  const { t } = useTranslation();

  return (
    <label className="block">
      <span className="field-label">{t(labelKey).toLowerCase()}:</span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required
        className="field-control"
      />
    </label>
  );
}

function Socials({ className = "" }: { className?: string }) {
  const { t } = useTranslation();
  const links = [
    { key: "github", icon: Github, href: "https://github.com/benjvm" },
    { key: "linkedin", icon: Linkedin, href: "https://linkedin.com/in/benjvm" },
    { key: "instagram", icon: Instagram, href: "https://www.instagram.com/sl.bvvnja" },
  ];
  return (
    <div className={`flex gap-3 ${className}`}>
      {links.map(({ key, icon: Icon, href }) => {
        const label = t(`socials.${key}`);
        return (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            title={label}
            className="social-link"
          >
            <Icon className="size-4" />
          </a>
        );
      })}
    </div>
  );
}

function ProjectCarousel({
  project,
  className,
}: {
  project: (typeof projects)[number];
  className: string;
}) {
  const { t } = useTranslation();
  const hasMultipleItems = project.media.length > 1;
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const syncActiveMedia = () => setActiveMediaIndex(carouselApi.selectedScrollSnap());
    syncActiveMedia();
    carouselApi.on("select", syncActiveMedia);

    return () => {
      carouselApi.off("select", syncActiveMedia);
    };
  }, [carouselApi]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) {
        return;
      }

      if (index === activeMediaIndex) {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }, [activeMediaIndex]);

  useEffect(() => {
    if (!carouselApi || !hasMultipleItems || project.media[activeMediaIndex]?.type !== "image") {
      return;
    }

    const timer = window.setTimeout(() => carouselApi.scrollNext(), 3000);
    return () => window.clearTimeout(timer);
  }, [activeMediaIndex, carouselApi, hasMultipleItems, project.media]);

  const mediaAlt = (mediaKey: string) => t(`projects.items.${project.id}.media.${mediaKey}`);

  return (
    <div
      className={`relative overflow-hidden border border-border bg-surface lg:col-span-7 ${className}`}
    >
      <Carousel
        opts={{ loop: hasMultipleItems }}
        setApi={setCarouselApi}
        className="w-full"
        aria-label={t("projects.carouselAria", { name: t(`projects.items.${project.id}.name`) })}
      >
        <CarouselContent className="ml-0">
          {project.media.map((media, index) => (
            <CarouselItem key={media.src} className="relative pl-0">
              {media.type === "video" ? (
                <video
                  preload="metadata"
                  autoPlay={index === 0}
                  muted
                  playsInline
                  ref={(element) => {
                    videoRefs.current[index] = element;
                  }}
                  onEnded={() => carouselApi?.scrollNext()}
                  className="aspect-[16/10] w-full object-cover"
                  aria-label={mediaAlt(media.mediaKey)}
                >
                  <source src={media.src} type="video/mp4" />
                  {t("projects.videoUnsupported")}
                </video>
              ) : (
                <img
                  src={media.src}
                  alt={mediaAlt(media.mediaKey)}
                  width={1408}
                  height={880}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover transition duration-700"
                />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        {hasMultipleItems && (
          <>
            <CarouselPrevious className="left-4 border-border bg-background/90 hover:bg-background" />
            <CarouselNext className="right-4 border-border bg-background/90 hover:bg-background" />
          </>
        )}
      </Carousel>
    </div>
  );
}
