import { useSyncExternalStore } from "react";
import { flushSync } from "react-dom";

type Theme = "dark" | "light";
type PageTransition = {
  ready: Promise<void>;
  finished: Promise<void>;
  skipTransition: () => void;
};

const storageKey = "portfolio-theme";
const changeEvent = "portfolio-theme-change";

// Runs before styles/body paint. Only this attribute is intentionally different
// from the server document; React content still hydrates with the dark snapshot.
export const themeBootstrap = `(()=>{let t="dark";try{if(localStorage.getItem("${storageKey}")==="light")t="light"}catch{}document.documentElement.dataset.theme=t})()`;

let active: PageTransition | undefined;
let revision = 0;
let requested: Theme | undefined;

function getTheme(): Theme {
  return document.documentElement.dataset["theme"] === "light" ? "light" : "dark";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset["theme"] = theme;
  window.dispatchEvent(new Event(changeEvent));
}

function subscribe(listener: () => void) {
  const syncStorage = (event: StorageEvent) => {
    if (event.key !== storageKey && event.key !== null) return;
    revision++;
    requested = undefined;
    active?.skipTransition();
    applyTheme(event.newValue === "light" ? "light" : "dark");
  };
  window.addEventListener(changeEvent, listener);
  window.addEventListener("storage", syncStorage);
  return () => {
    window.removeEventListener(changeEvent, listener);
    window.removeEventListener("storage", syncStorage);
  };
}

export function useTheme() {
  return useSyncExternalStore(subscribe, getTheme, (): Theme => "dark");
}

export function toggleTheme() {
  const next = (requested ?? getTheme()) === "dark" ? "light" : "dark";
  requested = next;
  const currentRevision = ++revision;
  active?.skipTransition();
  // Storage can be unavailable in private or restricted browsing.
  try {
    localStorage.setItem(storageKey, next);
  } catch {
    /* The in-memory choice still works. */
  }

  let committed = false;
  const commit = () => {
    if (committed || currentRevision !== revision) return;
    flushSync(() => applyTheme(next));
    // Capture the final palette, not an intermediate hover/header color fade.
    // Leave transforms and independent CSS animations (hero, skills, etc.) alone.
    if (typeof CSSTransition !== "undefined") {
      for (const animation of document.getAnimations()) {
        if (
          animation instanceof CSSTransition &&
          /^(color|background-color|border-.*-color|outline-color|text-decoration-color|fill|stroke|box-shadow)$/.test(
            animation.transitionProperty,
          )
        ) {
          animation.finish();
        }
      }
    }
    committed = true;
    requested = undefined;
  };
  const doc = document as Document & {
    startViewTransition?: (update: () => void) => PageTransition;
  };
  if (!doc.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    commit();
    return;
  }

  try {
    const transition = doc.startViewTransition(commit);
    active = transition;
    // A snapshot must never float over content that has scrolled or resized.
    const skip = () => transition.skipTransition();
    // Document snapshots suppress native hit-testing, even with pointer-events
    // disabled on their pseudos. Finish on a new click, then deliver that click
    // to the live control at the same position (never to the visual snapshot).
    const resumeClick = (event: MouseEvent) => {
      if (event.target !== document.documentElement && event.target !== document.body) return;
      skip();
      void transition.finished
        .catch(() => undefined)
        .then(() => {
          if (currentRevision !== revision) return;
          const control = document
            .elementFromPoint(event.clientX, event.clientY)
            ?.closest<HTMLElement>("button, a, input, textarea");
          if (!control) return;
          control.focus({ preventScroll: true });
          if (control.matches("button, a")) control.click();
        });
    };
    window.addEventListener("click", resumeClick, { capture: true });
    window.addEventListener("keydown", skip, { capture: true });
    window.addEventListener("scroll", skip, { passive: true });
    window.addEventListener("resize", skip, { passive: true });
    window.addEventListener("pagehide", skip);
    void transition.ready.catch(() => {
      /* Skipped/unsupported snapshots are safe. */
    });
    void transition.finished.catch(commit).finally(() => {
      window.removeEventListener("scroll", skip);
      window.removeEventListener("resize", skip);
      window.removeEventListener("pagehide", skip);
      window.removeEventListener("click", resumeClick, { capture: true });
      window.removeEventListener("keydown", skip, { capture: true });
      if (active === transition) active = undefined;
    });
  } catch {
    commit();
  }
}
