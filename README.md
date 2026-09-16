# Remix of Benjamin Sánchez Portfolio

Create a modern, minimalist and visually interesting personal portfolio website for a junior web developer named Benjamin Sánchez.

The website should feel professional but also personal and slightly futuristic. The main visual identity should be based on grayscale: white, different shades of gray, charcoal and black. Avoid colorful gradients and excessive decorative elements. Use strong contrast, clean spacing, subtle borders, and elegant typography.

IMPORTANT DESIGN DIRECTION:

- Minimalist but NOT boring.

- Modern developer portfolio with a subtle futuristic / cinematic feeling.

- Use grayscale as the main color palette.

- White backgrounds combined with light gray sections and dark charcoal elements.

- Use subtle animations and hover effects.

- Use large typography and generous whitespace.

- Avoid excessive cards, shadows, rounded corners, or generic SaaS-style layouts.

- The design should look like a real professional developer portfolio rather than a template.

- Take inspiration from modern editorial websites, futuristic interfaces and premium developer portfolios.

- Make the website fully responsive for desktop, tablet and mobile.

HERO / INTRODUCTION:

Create a full-screen hero section at the beginning of the website.

The hero should have a cinematic image background related to technology, space, digital networks, or futuristic landscapes. Keep the image mostly dark/monochrome so the text remains readable.

In the center of the hero, display:

"BENJAMIN SÁNCHEZ"

Use a large cinematic sci-fi / space-inspired typography similar in feeling to classic Star Wars title typography, but do NOT copy the Star Wars logo directly.

Under the name, display a short subtitle such as:

"Web Developer · Blockchain Enthusiast"

Add a subtle scroll indicator at the bottom of the hero.

The hero should feel cinematic and memorable without becoming visually complicated.

NAVIGATION:

Create a simple fixed or sticky navigation bar.

Navigation items:

- About

- Skills

- Projects

- Contact

On the right side, include a prominent but minimal:

"Download my CV"

button.

On mobile, transform the navigation into a clean hamburger menu.

ABOUT SECTION:

Create an "About" section introducing Benjamin Sánchez.

Content should communicate that:

- Benjamin studied DAW (Desarrollo de Aplicaciones Web) and DAM (Desarrollo de Aplicaciones Multiplataforma).

- He has a strong interest in web development, backend technologies and especially Blockchain / Web3 development.

- He enjoys learning new technologies and building practical projects.

- He is currently developing his skills with the goal of becoming a Blockchain / Web3 developer.

Do not make the text overly formal. It should sound natural and authentic, like a young developer presenting himself.

Include a small visual element or minimalist graphic next to the text to make the section more interesting.

SKILLS SECTION:

Create a clean "Skills" section showing the technologies Benjamin works with.

Organize them into logical groups:

Frontend:

- HTML

- CSS

- JavaScript

- React

Backend:

- Java

- PHP

- Python

- Node.js

Databases:

- MySQL

- Firebase

Tools & Technologies:

- Git

- GitHub

- REST APIs

- Docker

Interests / Currently Learning:

- Blockchain

- Web3

- Solidity

- Ethereum

- Smart Contracts

Do not represent skills using unrealistic percentage bars such as "JavaScript 95%". Instead, use clean typography, tags, icons or an interactive grid.

PROJECTS SECTION:

Create a visually strong "Projects" section showcasing Benjamin's projects.

Include these projects:

1. InternHub

Description:

A web platform designed to connect students, companies and professors during the internship process. It includes internship offers, applications, student profiles, company management and other tools.

Technologies:

React, Firebase, JavaScript, Cloudinary

2. WTFood

Description:

A food and recipe application focused on discovering recipes based on available ingredients. The project explores AI-assisted food recognition and personalized recipe recommendations.

Technologies:

Flutter, Dart, Firebase, AI

Design the projects as large visual project cards or horizontal sections rather than a generic 3-column card grid.

Each project should contain:

- Project name

- Short description

- Technologies

- GitHub button

- Optional "Live Demo" button

- Project image/preview

Make the project section visually dynamic with subtle hover animations.

Add a small "More projects coming soon..." element to communicate that the portfolio is actively evolving.

INTERESTS / CURRENT DIRECTION:

Add a small section or visual block highlighting Benjamin's current professional interests.

Main focus:

"Blockchain & Web3"

Mention:

- Smart Contracts

- Solidity

- Ethereum

- Decentralized Applications

- Web3 Development

This section should feel like a personal career direction rather than a claim of expertise. Make it clear that Blockchain/Web3 is an area Benjamin is actively learning and developing towards.

CONTACT SECTION:

Create a clean "Contact" section with a simple contact form.

Fields:

- Name

- Email

- Message

Button:

"Send message"

Keep the form minimal and elegant.

Also include social media icons/links for:

- GitHub

- LinkedIn

- Instagram

Use recognizable monochrome icons and subtle hover animations.

FOOTER:

Create a minimal footer containing:

"© 2026 Benjamin Sánchez"

and the social media icons.

VISUAL DETAILS:

Use a grayscale palette similar to:

- #FFFFFF

- #F5F5F5

- #D9D9D9

- #A6A6A6

- #666666

- #222222

- #000000

Typography should be modern and clean. Use a combination of a strong display font for headings and a highly readable sans-serif font for body text.

Use subtle animations:

- Smooth scrolling

- Fade/slide-in sections

- Project hover effects

- Navigation transitions

- Subtle image zoom/parallax in the hero

- Button hover animations

Do not over-animate the page.

TECHNICAL REQUIREMENTS:

- Fully responsive

- Accessible semantic HTML

- Fast loading

- SEO-friendly structure

- Smooth scrolling between sections

- Mobile-first responsive behavior

- Clean component structure

- Easy to modify later

- Use Lucide or another clean icon library for interface icons

- Do not use emojis as interface icons

The final result should look like a portfolio belonging to a young developer interested in moving from traditional web development into Blockchain/Web3.

The overall impression should be:

"Minimal. Technical. Cinematic. Professional. Personal."

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b0b22c6e-a4ed-4917-a4cd-d4059b2d5800).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Contact form email delivery

The contact form sends messages through Resend from the TanStack Start server. The Resend API key is never exposed to the browser.

1. Verify `bnjasanchez.com` in the Resend dashboard and create an API key.
2. Copy `.env.example` to `.env.local`.
3. Set these server-only variables in `.env.local` and in your production hosting settings:

```sh
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CONTACT_TO_EMAIL=benjasanchez730@gmail.com
RESEND_FROM_EMAIL=contacto@bnjasanchez.com
```

The sender is `Benjamin Sánchez Contact <RESEND_FROM_EMAIL>` and must belong to the verified `bnjasanchez.com` domain. Keep `.env.local` private and never commit the API key. To test locally, start the app with `npm run dev`, submit the form, and confirm the message arrives at `CONTACT_TO_EMAIL`. Check the Resend email logs if delivery fails. The form also rejects invalid input, ignores honeypot submissions, disables duplicate submits, and shows accessible success or error feedback.
