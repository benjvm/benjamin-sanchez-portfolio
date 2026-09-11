import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Blocks,
  Code2,
  Database,
  Github,
  Instagram,
  Linkedin,
  Menu,
  Network,
  Send,
  Terminal,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/benjamin-hero.jpg";
import internHubImage from "@/assets/internhub-project.jpg";
import wtfoodImage from "@/assets/wtfood-project.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Benjamin Sánchez — Junior Web Developer" },
      { name: "description", content: "Explore Benjamin Sánchez's web development portfolio, projects, skills, and journey toward Blockchain and Web3." },
      { property: "og:title", content: "Benjamin Sánchez — Junior Web Developer" },
      { property: "og:description", content: "Practical web products, thoughtful code, and a growing focus on Blockchain and Web3." },
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

const projects = [
  {
    index: "01",
    name: "InternHub",
    description: "A platform connecting students, companies and professors throughout the internship process — from offers and applications to profiles and company management.",
    tech: ["React", "Firebase", "JavaScript", "Cloudinary"],
    image: internHubImage,
    alt: "InternHub internship management dashboard on a laptop",
  },
  {
    index: "02",
    name: "WTFood",
    description: "A food and recipe app for discovering what to cook with the ingredients you already have, exploring AI-assisted recognition and personalized recommendations.",
    tech: ["Flutter", "Dart", "Firebase", "AI"],
    image: wtfoodImage,
    alt: "WTFood ingredient scanner and recipe recommendation mobile screens",
  },
];

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <main>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || menuOpen ? "border-b border-primary-foreground/15 bg-ink/90 backdrop-blur-xl" : "bg-transparent"}`}>
        <nav aria-label="Main navigation" className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-10 lg:px-16">
          <a href="#top" className="font-display text-sm font-bold text-primary-foreground" aria-label="Benjamin Sánchez, back to top">BS<span className="text-steel">/26</span></a>
          <div className="hidden items-center gap-9 md:flex">
            {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-semibold uppercase text-primary-foreground/70 transition-colors hover:text-primary-foreground">{item}</a>)}
            <Button asChild variant="portfolioOutline" className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-ink"><a href="/benjamin-sanchez-cv.pdf" download>Download my CV</a></Button>
          </div>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground md:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</Button>
        </nav>
        {menuOpen && <div className="border-t border-primary-foreground/15 bg-ink px-5 py-6 md:hidden">{navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="block border-b border-primary-foreground/10 py-4 font-display text-xl text-primary-foreground">{item}</a>)}<Button asChild variant="portfolioOutline" className="mt-6 w-full border-primary-foreground/40 text-primary-foreground"><a href="/benjamin-sanchez-cv.pdf" download>Download my CV</a></Button></div>}
      </header>

      <section id="top" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink px-5 text-center">
        <img src={heroImage} alt="Monochrome futuristic landscape beneath a star-filled sky" width={1920} height={900} fetchPriority="high" className="hero-image absolute inset-0 h-full w-full object-cover" />
        <div className="hero-shade absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-7xl pt-16 reveal">
          <p className="mb-6 font-mono text-[10px] uppercase text-primary-foreground/60 md:text-xs">Portfolio / 2026 — Madrid, ES</p>
          <h1 className="title-glow font-display text-4xl font-bold uppercase leading-[1.05] text-primary-foreground sm:text-6xl md:text-8xl lg:text-9xl">Benjamin<br className="sm:hidden" /> Sánchez</h1>
          <div className="mx-auto mt-7 h-px w-24 bg-primary-foreground/50" />
          <p className="mt-6 text-sm font-medium text-primary-foreground/75 md:text-lg">Web Developer <span className="mx-2 text-primary-foreground/35">·</span> Blockchain Enthusiast</p>
        </div>
        <a href="#about" className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[9px] uppercase text-primary-foreground/55 transition-colors hover:text-primary-foreground" aria-label="Scroll to About"><span>Explore</span><ArrowDown size={16} className="animate-bounce" /></a>
      </section>

      <Section id="about" number="01" label="About">
        <div className="grid gap-16 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
          <div><h2 className="max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">I like turning ideas into things people can actually use.</h2><div className="mt-10 max-w-3xl space-y-5 text-base leading-8 text-muted-foreground md:text-lg"><p>I'm Benjamin, a junior developer trained in both <strong className="font-semibold text-foreground">DAW</strong> and <strong className="font-semibold text-foreground">DAM</strong>. I'm most at home exploring web development, backend technologies and the systems that hold useful products together.</p><p>I enjoy learning by building: trying a new technology, understanding how it works, then putting it into a practical project. Right now, I'm developing the foundations I need to move toward <strong className="font-semibold text-foreground">Blockchain and Web3 development</strong> — with curiosity, patience and plenty left to learn.</p></div></div>
          <div className="grid-texture relative aspect-square max-w-md border border-border bg-secondary p-8 lg:ml-auto"><div className="absolute left-8 top-8 font-mono text-[10px] uppercase text-muted-foreground">Current coordinates</div><div className="flex h-full items-center justify-center"><div className="relative flex size-40 items-center justify-center rounded-full border border-foreground/20"><div className="absolute size-28 rounded-full border border-foreground/25"/><div className="absolute size-3 rounded-full bg-foreground"/><div className="absolute h-px w-56 rotate-45 bg-foreground/20"/><Code2 size={42} strokeWidth={1} /></div></div><div className="absolute bottom-8 left-8 right-8 flex justify-between font-mono text-[10px] uppercase text-muted-foreground"><span>Web</span><span>Backend</span><span>Web3</span></div></div>
        </div>
      </Section>

      <section id="skills" className="bg-ink py-24 text-primary-foreground md:py-36"><div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16"><SectionHeading number="02" label="Skills" dark /><div className="mt-16 divide-y divide-primary-foreground/15 border-y border-primary-foreground/15">{skillGroups.map(({ title, icon: Icon, skills }, index) => <div key={title} className="group grid gap-5 py-7 md:grid-cols-[80px_1fr_2fr] md:items-center"><span className="font-mono text-xs text-primary-foreground/35">0{index + 1}</span><div className="flex items-center gap-3"><Icon size={18} strokeWidth={1.5}/><h3 className="font-display text-sm uppercase">{title}</h3></div><div className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end">{skills.map((skill) => <span key={skill} className="text-sm text-primary-foreground/60 transition-colors group-hover:text-primary-foreground md:text-base">{skill}</span>)}</div></div>)}</div></div></section>

      <Section id="projects" number="03" label="Selected projects">
        <div className="space-y-24 md:space-y-36">{projects.map((project, i) => <article key={project.name} className={`group grid gap-8 lg:grid-cols-2 lg:items-center ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}><div className="overflow-hidden bg-secondary"><img src={project.image} alt={project.alt} width={1408} height={912} loading="lazy" className="aspect-[16/10] w-full object-cover grayscale transition-transform duration-700 group-hover:scale-[1.025]" /></div><div className="lg:px-10"><span className="font-mono text-xs text-muted-foreground">PROJECT / {project.index}</span><h3 className="mt-4 font-display text-4xl font-semibold md:text-6xl">{project.name}</h3><p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">{project.description}</p><div className="mt-7 flex flex-wrap gap-2">{project.tech.map((tech) => <span key={tech} className="border border-border px-3 py-1.5 font-mono text-[10px] uppercase">{tech}</span>)}</div><Button asChild variant="portfolio" className="mt-9"><a href="https://github.com/" target="_blank" rel="noreferrer"><Github/>View on GitHub<ArrowUpRight/></a></Button></div></article>)}</div>
        <div className="mt-28 flex items-center gap-4 border-t border-border pt-7 font-mono text-xs uppercase text-muted-foreground"><span className="size-2 animate-pulse rounded-full bg-foreground"/>More projects coming soon...</div>
      </Section>

      <section className="grid-texture border-y border-border bg-secondary py-24 md:py-32"><div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:px-16"><div><p className="font-mono text-xs uppercase text-muted-foreground">Current direction / Not expertise</p><h2 className="mt-5 font-display text-4xl font-semibold md:text-5xl">Blockchain<br />& Web3</h2></div><div><p className="max-w-2xl text-xl leading-relaxed md:text-3xl">Learning how decentralized systems work — and developing toward a future where I can build useful, thoughtful products on them.</p><div className="mt-10 flex flex-wrap gap-3">{["Smart Contracts", "Solidity", "Ethereum", "Decentralized Applications", "Web3 Development"].map((item) => <span key={item} className="border border-foreground/25 bg-background px-4 py-2 text-xs font-medium">{item}</span>)}</div></div></div></section>

      <Section id="contact" number="04" label="Contact">
        <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr]"><div><h2 className="text-4xl font-semibold leading-tight md:text-6xl">Let's build something worth sharing.</h2><p className="mt-6 max-w-md leading-7 text-muted-foreground">Have an idea, an opportunity, or simply want to connect? Send me a message.</p><Socials className="mt-10" /></div><form onSubmit={submit} className="space-y-7" aria-label="Contact form"><Field label="Name" name="name" type="text" autoComplete="name" /><Field label="Email" name="email" type="email" autoComplete="email" /><label className="block"><span className="mb-2 block text-xs font-semibold uppercase">Message</span><textarea name="message" required rows={5} className="w-full resize-none border-0 border-b border-input bg-transparent px-0 py-3 text-base outline-none transition-colors focus:border-foreground" /></label><div className="flex items-center gap-5"><Button type="submit" variant="portfolio" size="lg"><Send/>Send message</Button>{sent && <p role="status" className="text-sm text-muted-foreground">Thanks — your message is ready to be connected to email delivery.</p>}</div></form></div>
      </Section>

      <footer className="border-t border-primary-foreground/15 bg-ink py-8 text-primary-foreground"><div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-5 md:flex-row md:items-center md:justify-between md:px-10 lg:px-16"><p className="text-xs text-primary-foreground/55">© 2026 Benjamin Sánchez</p><Socials dark /></div></footer>
    </main>
  );
}

function Section({ id, number, label, children }: { id: string; number: string; label: string; children: React.ReactNode }) {
  return <section id={id} className="scroll-mt-20 py-24 md:py-36"><div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16"><SectionHeading number={number} label={label} /><div className="mt-16">{children}</div></div></section>;
}

function SectionHeading({ number, label, dark = false }: { number: string; label: string; dark?: boolean }) {
  return <div className={`flex items-center gap-4 border-b pb-4 ${dark ? "border-primary-foreground/20" : "border-border"}`}><span className={`font-mono text-[10px] ${dark ? "text-primary-foreground/40" : "text-muted-foreground"}`}>{number}</span><p className="font-display text-xs font-semibold uppercase">{label}</p></div>;
}

function Field({ label, name, type, autoComplete }: { label: string; name: string; type: string; autoComplete: string }) {
  return <label className="block"><span className="mb-2 block text-xs font-semibold uppercase">{label}</span><input name={name} type={type} autoComplete={autoComplete} required className="w-full border-0 border-b border-input bg-transparent px-0 py-3 text-base outline-none transition-colors focus:border-foreground" /></label>;
}

function Socials({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  const links = [{ label: "GitHub", icon: Github, href: "https://github.com/" }, { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/" }, { label: "Instagram", icon: Instagram, href: "https://instagram.com/" }];
  return <div className={`flex gap-3 ${className}`}>{links.map(({ label, icon: Icon, href }) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label} className={`flex size-10 items-center justify-center border transition-all hover:-translate-y-1 ${dark ? "border-primary-foreground/25 text-primary-foreground/65 hover:border-primary-foreground hover:text-primary-foreground" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"}`}><Icon size={17}/></a>)}</div>;
}