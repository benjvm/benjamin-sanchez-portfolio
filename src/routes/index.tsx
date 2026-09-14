import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ComponentType, type FormEvent, type PointerEvent, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Braces,
  Code2,
  Database,
  Download,
  FileCode2,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Menu,
  Network,
  Send,
  Smartphone,
  Terminal,
  Waypoints,
  X,
} from "lucide-react";
import { SiCss, SiDocker, SiEthereum, SiFirebase, SiGit, SiGithub, SiHtml5, SiJavascript, SiMysql, SiNodedotjs, SiPhp, SiPython, SiReact, SiSolidity } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import internHubAsset from "@/assets/internhub-project.jpg.asset.json";
import wtfoodAsset from "@/assets/wtfood-project.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Benjamin Sánchez — Web & Blockchain Developer" },
      { name: "description", content: "Portfolio de Benjamin Sánchez: desarrollo web, móvil y aprendizaje de Blockchain y Web3." },
      { property: "og:title", content: "Benjamin Sánchez — Web & Blockchain Developer" },
      { property: "og:description", content: "Proyectos web y móvil, tecnología y una trayectoria en desarrollo hacia Blockchain y Web3." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const navItems = ["About", "Skills", "Projects", "Contact"];
const skillGroups = [
  { title: "Frontend", icon: Code2, skills: ["HTML", "CSS", "JavaScript", "React"] },
  { title: "Backend", icon: Terminal, skills: ["Java", "PHP", "Python", "Node.js"] },
  { title: "Databases", icon: Database, skills: ["MySQL", "Firebase"] },
  { title: "Tools & Technologies", icon: Blocks, skills: ["Git", "GitHub", "REST APIs", "Docker"] },
  { title: "Learning now", icon: Network, skills: ["Blockchain", "Web3", "Solidity", "Ethereum", "Smart Contracts"] },
];

const skillIcons: Record<string, ComponentType<{ className?: string }>> = {
  HTML: SiHtml5, CSS: SiCss, JavaScript: SiJavascript, React: SiReact,
  Java: FaJava, PHP: SiPhp, Python: SiPython, "Node.js": SiNodedotjs,
  MySQL: SiMysql, Firebase: SiFirebase, Git: SiGit, GitHub: SiGithub,
  "REST APIs": Waypoints, Docker: SiDocker, Blockchain: Blocks, Web3: Globe,
  Solidity: SiSolidity, Ethereum: SiEthereum, "Smart Contracts": FileCode2,
};

const projects = [
  {
    index: "01",
    hash: "0x1A7F...B24C",
    name: "InternHub",
    type: "WEB PLATFORM",
    description: "A platform connecting students, companies and professors throughout the internship process — from offers and applications to profiles and company management.",
    tech: ["React", "Firebase", "JavaScript", "Cloudinary"],
    image: internHubAsset.url,
    alt: "InternHub internship management dashboard on a laptop",
  },
  {
    index: "02",
    hash: "0x8D3E...90AF",
    name: "WTFood",
    type: "MOBILE APPLICATION",
    description: "A food and recipe app for discovering what to cook with the ingredients you already have, exploring AI-assisted recognition and personalized recommendations.",
    tech: ["Flutter", "Dart", "Firebase", "AI"],
    image: wtfoodAsset.url,
    alt: "WTFood ingredient scanner and recipe recommendation mobile screens",
  },
];

function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 32);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };

  const moveHero = (event: PointerEvent<HTMLElement>) => {
    if (!window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
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

  return (
    <main className="bg-background text-foreground">
      <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${scrolled || menuOpen ? "border-border bg-background/90 backdrop-blur-xl" : "border-transparent bg-transparent"}`}>
        <nav aria-label="Main navigation" className="mx-auto flex h-16 max-w-[1480px] items-center justify-between px-5 md:px-10">
          <a href="#top" className="font-mono text-xs font-semibold text-foreground"><span className="text-signal">{`{ `}</span>BS.DEV<span className="text-signal">{` }`}</span></a>
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item, index) => <a key={item} href={`#${item.toLowerCase()}`} className="nav-link"><span>0{index + 1}</span>{item}</a>)}
            <Button asChild variant="signal" size="sm"><a href="/benjamin-sanchez-cv.pdf" download><Download />CV</a></Button>
          </div>
          <Button type="button" variant="ghost" size="icon" className="md:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}</Button>
        </nav>
        {menuOpen && <div className="border-t border-border bg-background px-5 py-6 md:hidden">{navItems.map((item, index) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="flex border-b border-border py-4 font-display text-2xl"><span className="mr-5 font-mono text-xs text-signal">0{index + 1}</span>{item}</a>)}<Button asChild variant="signal" className="mt-6 w-full"><a href="/benjamin-sanchez-cv.pdf" download><Download />Download my CV</a></Button></div>}
      </header>

      <section id="top" onPointerMove={moveHero} onPointerLeave={resetHero} className="cyber-grid hero-depth relative flex min-h-[100svh] items-center overflow-hidden border-b border-border px-5 py-28 md:px-10">
        <div className="node-field absolute inset-0" aria-hidden="true"><span className="node node-a"/><span className="node node-b"/><span className="node node-c"/><span className="node node-d"/><i className="chain-line chain-one"/><i className="chain-line chain-two"/></div>
        <div className="hero-depth-copy relative z-10 mx-auto w-full max-w-[1480px]">
          <div className="mb-12 flex items-center gap-3 font-mono text-[10px] uppercase text-muted-foreground"><span className="status-dot"/><span>System online</span><span className="text-border">/</span><span>Madrid, ES</span><span className="text-border">/</span><span>2026</span></div>
          <p className="mb-4 font-mono text-xs uppercase text-signal">Web Developer · Blockchain Enthusiast</p>
          <h1 aria-label="Benjamin Sánchez" className="typing-name max-w-6xl font-display text-[clamp(3.4rem,11vw,10rem)] font-semibold leading-[0.82]"><span className="typing-line typing-line-first" aria-hidden="true">BENJAMIN</span><span className="typing-line typing-line-second outline-type" aria-hidden="true">SÁNCHEZ</span></h1>
          <div className="mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <p className="max-w-xl text-lg leading-8 text-muted-foreground md:text-xl">Building useful digital products across web and mobile, while developing toward the decentralized future.</p>
            <Button asChild variant="signal" size="lg"><a href="/benjamin-sanchez-cv.pdf" download><Download />Download my CV</a></Button>
          </div>
        </div>
        <a href="#about" className="absolute bottom-7 left-5 z-10 flex items-center gap-3 font-mono text-[10px] uppercase text-muted-foreground md:left-10"><ArrowDown className="size-4 text-signal"/>Scroll to inspect</a>
      </section>

      <Section id="about" number="01" label="About / identity">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div><p className="eyebrow">A human behind the interface</p><h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.05] md:text-7xl">I turn ideas into things people can actually use.</h2><div className="mt-10 max-w-2xl space-y-5 text-base leading-8 text-muted-foreground md:text-lg"><p>I'm Benjamin, a junior developer trained in both <strong className="text-foreground">DAW</strong> and <strong className="text-foreground">DAM</strong>. I'm most at home exploring web development, backend technologies and the systems that hold useful products together.</p><p>I enjoy learning by building: trying a new technology, understanding how it works, then putting it into a practical project. Right now, I'm developing the foundations I need to move toward <strong className="text-foreground">Blockchain and Web3 development</strong> — with curiosity, patience and plenty left to learn.</p></div></div>
          <CodePanel />
        </div>
      </Section>

      <section id="skills" className="border-y border-border bg-surface py-24 md:py-36"><div className="mx-auto max-w-[1480px] px-5 md:px-10"><SectionHeading number="02" label="Skills / stack"/><div className="mt-16 border-t border-border">{skillGroups.map(({ title, icon: GroupIcon, skills }, index) => <div key={title} className="skill-row group grid gap-6 border-b border-border py-8 md:grid-cols-[64px_1fr_2fr] md:items-center"><span className="font-mono text-xs text-muted-foreground">0{index + 1}</span><div className="flex items-center gap-3"><GroupIcon className="size-5 text-signal"/><h3 className="font-display text-lg font-medium">{title}</h3></div><div className="flex flex-wrap gap-3 md:justify-end">{skills.map((skill) => { const Icon = skillIcons[skill]; return <span key={skill} className="tech-token">{Icon && <Icon className="size-5"/>}<span>{skill}</span></span>; })}</div></div>)}</div></div></section>

      <section id="projects" className="py-24 md:py-36"><div className="mx-auto max-w-[1480px] px-5 md:px-10"><SectionHeading number="03" label="Projects / verified builds"/><div className="mt-16 space-y-20 md:space-y-32">{projects.map((project, index) => <article key={project.name} className="project-block grid gap-8 lg:grid-cols-12 lg:items-center"><div className={`relative overflow-hidden border border-border bg-surface lg:col-span-7 ${index % 2 ? "lg:order-2" : ""}`}><img src={project.image} alt={project.alt} width={1408} height={912} loading="lazy" className="aspect-[16/10] w-full object-cover grayscale transition duration-700 group-hover:scale-[1.025]"/><div className="scanline"/><div className="absolute left-4 top-4 border border-border bg-background/85 px-3 py-2 font-mono text-[10px] text-signal backdrop-blur">BLOCK_{project.index}</div></div><div className="lg:col-span-5 lg:px-8"><div className="flex items-center justify-between border-b border-border pb-4 font-mono text-[10px] text-muted-foreground"><span>{project.type}</span><span>{project.hash}</span></div><h3 className="mt-7 font-display text-5xl font-semibold md:text-7xl">{project.name}</h3><p className="mt-6 text-base leading-8 text-muted-foreground md:text-lg">{project.description}</p><div className="mt-7 flex flex-wrap gap-2">{project.tech.map((tech) => <span key={tech} className="border border-border px-3 py-2 font-mono text-[10px] uppercase">{tech}</span>)}</div><Button asChild variant="signal" className="mt-9"><a href="https://github.com/" target="_blank" rel="noreferrer"><Github/>View on GitHub<ArrowUpRight/></a></Button></div></article>)}</div><div className="mt-24 flex items-center gap-4 border-t border-border pt-6 font-mono text-xs uppercase text-muted-foreground"><span className="status-dot"/>More projects coming soon...</div></div></section>

      <section className="career-band relative overflow-hidden border-y border-border bg-surface py-24 md:py-36"><div className="orbit-lines absolute inset-0" aria-hidden="true"/><div className="relative mx-auto grid max-w-[1480px] gap-12 px-5 md:px-10 lg:grid-cols-[0.75fr_1.25fr]"><div><p className="eyebrow">Current direction / not expertise</p><h2 className="mt-5 font-display text-5xl font-semibold md:text-7xl">Blockchain<br/><span className="text-signal">& Web3</span></h2></div><div className="lg:pt-12"><p className="max-w-3xl text-2xl leading-relaxed md:text-4xl">Learning how decentralized systems work — and developing toward a future where I can build useful, thoughtful products on them.</p><div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2">{["Smart Contracts", "Solidity", "Ethereum", "Decentralized Applications", "Web3 Development"].map((item, index) => <div key={item} className="flex items-center gap-4 bg-surface px-5 py-5 font-mono text-xs"><span className="text-signal">0{index + 1}</span>{item}</div>)}</div></div></div></section>

      <Section id="contact" number="04" label="Contact / open channel">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="eyebrow">Connection request</p><h2 className="mt-5 font-display text-5xl font-semibold leading-none md:text-7xl">Let's build something worth sharing.</h2><p className="mt-7 max-w-md leading-7 text-muted-foreground">Have an idea, an opportunity, or simply want to connect? Send me a message.</p><Socials className="mt-10"/></div><form onSubmit={submit} className="border border-border bg-surface p-6 md:p-10" aria-label="Contact form"><div className="mb-9 flex items-center justify-between border-b border-border pb-4 font-mono text-[10px] text-muted-foreground"><span>POST /MESSAGE</span><span className="text-signal">ENCRYPTED CHANNEL</span></div><div className="space-y-7"><Field label="Name" name="name" type="text" autoComplete="name"/><Field label="Email" name="email" type="email" autoComplete="email"/><label className="block"><span className="field-label">message:</span><textarea name="message" required rows={5} className="field-control resize-none"/></label><div className="flex flex-wrap items-center gap-5"><Button type="submit" variant="signal" size="lg"><Send/>Send message</Button>{sent && <p role="status" className="text-sm text-muted-foreground">Thanks — your message is ready to be connected to email delivery.</p>}</div></div></form></div>
      </Section>

      <footer className="border-t border-border bg-surface py-8"><div className="mx-auto flex max-w-[1480px] flex-col gap-6 px-5 md:flex-row md:items-center md:justify-between md:px-10"><p className="font-mono text-xs text-muted-foreground">© 2026 Benjamin Sánchez <span className="text-signal">//</span> ALL SYSTEMS OPERATIONAL</p><Socials/></div></footer>
    </main>
  );
}

function CodePanel() {
  return <div className="code-panel"><div className="code-panel-head"><span className="flex items-center gap-2"><Braces className="size-4 text-signal"/>profile.json</span><span>UTF-8</span></div><pre aria-label="Profile data in JSON format"><code><span className="code-punc">{`{`}</span>{`\n  `}<span className="code-key">"name"</span>: <span className="code-value">"Benjamin Sánchez"</span>,{`\n  `}<span className="code-key">"education"</span>: [<span className="code-value">"DAW"</span>, <span className="code-value">"DAM"</span>],{`\n  `}<span className="code-key">"builds"</span>: [`\n    `<span className="code-value">"web"</span>,{`\n    `}<span className="code-value">"backend"</span>,{`\n    `}<span className="code-value">"mobile"</span>{`\n  `}],{`\n  `}<span className="code-key">"next_block"</span>: <span className="code-value">"web3"</span>,{`\n  `}<span className="code-key">"status"</span>: <span className="code-bool">"learning"</span>{`\n`}<span className="code-punc">{`}`}</span></code></pre><div className="code-panel-foot"><span>Ln 01, Col 01</span><span className="flex items-center gap-2"><span className="status-dot"/>VALID OBJECT</span></div></div>;
}

function Section({ id, number, label, children }: { id: string; number: string; label: string; children: ReactNode }) {
  return <section id={id} className="scroll-mt-16 py-24 md:py-36"><div className="mx-auto max-w-[1480px] px-5 md:px-10"><SectionHeading number={number} label={label}/><div className="mt-16">{children}</div></div></section>;
}

function SectionHeading({ number, label }: { number: string; label: string }) {
  return <div className="flex items-center justify-between border-b border-border pb-4"><div className="flex items-center gap-4"><span className="font-mono text-[10px] text-signal">[{number}]</span><p className="font-mono text-xs uppercase text-muted-foreground">{label}</p></div><span className="hidden items-center gap-2 font-mono text-[10px] text-muted-foreground sm:flex">BLOCK CONFIRMED <ArrowRight className="size-3 text-signal"/></span></div>;
}

function Field({ label, name, type, autoComplete }: { label: string; name: string; type: string; autoComplete: string }) {
  return <label className="block"><span className="field-label">{label.toLowerCase()}:</span><input name={name} type={type} autoComplete={autoComplete} required className="field-control"/></label>;
}

function Socials({ className = "" }: { className?: string }) {
  const links = [{ label: "GitHub", icon: Github, href: "https://github.com/" }, { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/" }, { label: "Instagram", icon: Instagram, href: "https://instagram.com/" }];
  return <div className={`flex gap-3 ${className}`}>{links.map(({ label, icon: Icon, href }) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label} className="social-link"><Icon className="size-4"/></a>)}</div>;
}