import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import vm from "node:vm";
import ts from "typescript";

const source = ts.transpileModule(
  readFileSync(new URL("../src/lib/theme.ts", import.meta.url), "utf8"),
  {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  },
).outputText;

function setup({ stored = null, blocked = false, transition = false, reducedMotion = false } = {}) {
  const document = { documentElement: { dataset: { theme: "dark" } } };
  const window = new EventTarget();
  window.matchMedia = () => ({ matches: reducedMotion });
  const storage = {
    value: stored,
    getItem() {
      if (blocked) throw Error("blocked");
      return this.value;
    },
    setItem(_key, value) {
      if (blocked) throw Error("blocked");
      this.value = value;
    },
  };
  const pending = [];
  if (transition)
    document.startViewTransition = (commit) => {
      let finish;
      const item = {
        commit,
        skipped: false,
        ready: Promise.resolve(),
        finished: new Promise((resolve) => {
          finish = resolve;
        }),
        skipTransition() {
          this.skipped = true;
        },
        finish: () => finish(),
      };
      pending.push(item);
      return item;
    };
  const context = vm.createContext({
    document,
    window,
    localStorage: storage,
    Event,
    exports: {},
    require: (name) =>
      name === "react-dom"
        ? { flushSync: (callback) => callback() }
        : { useSyncExternalStore: (_subscribe, snapshot) => snapshot() },
  });
  vm.runInContext(source, context);
  vm.runInContext(context.exports.themeBootstrap, context);
  return { document, window, storage, pending, api: context.exports };
}

test("first paint defaults to dark; only an explicit light preference changes it", () => {
  for (const stored of [null, "dark", "invalid", "light"]) {
    const env = setup({ stored });
    assert.equal(env.api.useTheme(), stored === "light" ? "light" : "dark");
  }
});

test("blocked storage does not prevent initialization or toggling", () => {
  const env = setup({ blocked: true });
  assert.equal(env.api.useTheme(), "dark");
  env.api.toggleTheme();
  assert.equal(env.api.useTheme(), "light");
});

test("unsupported browsers switch immediately and persist both directions", () => {
  const env = setup();
  for (const expected of ["light", "dark", "light"]) {
    env.api.toggleTheme();
    assert.equal(env.api.useTheme(), expected);
    assert.equal(env.storage.value, expected);
  }
});

test("rapid clicks before snapshot callbacks settle cannot commit a stale theme", () => {
  const env = setup({ transition: true });
  env.api.toggleTheme();
  env.api.toggleTheme();
  env.api.toggleTheme();
  for (const item of [...env.pending].reverse()) item.commit();
  assert.equal(env.api.useTheme(), "light");
  assert.equal(env.storage.value, "light");
  assert.equal(env.pending[0].skipped, true);
  assert.equal(env.pending[1].skipped, true);
  env.pending.forEach((item) => item.finish());
});

test("scroll and resize skip stale snapshots without reverting the theme", () => {
  const env = setup({ transition: true });
  env.api.toggleTheme();
  env.pending[0].commit();
  env.window.dispatchEvent(new Event("scroll"));
  env.window.dispatchEvent(new Event("resize"));
  assert.equal(env.pending[0].skipped, true);
  assert.equal(env.api.useTheme(), "light");
  env.pending[0].finish();
});

test("a synchronously failing transition still applies the requested theme", () => {
  const env = setup();
  env.document.startViewTransition = () => {
    throw Error("not supported");
  };
  env.api.toggleTheme();
  assert.equal(env.api.useTheme(), "light");
});

test("a click intercepted by the snapshot reaches the live control after interruption", async () => {
  const env = setup({ transition: true });
  let clicks = 0;
  env.document.elementFromPoint = () => ({
    closest: () => ({ focus() {}, matches: () => true, click: () => clicks++ }),
  });
  env.api.toggleTheme();
  env.pending[0].commit();
  const click = new Event("click");
  Object.defineProperty(click, "target", { value: env.document.documentElement });
  env.window.dispatchEvent(click);
  assert.equal(env.pending[0].skipped, true);
  env.pending[0].finish();
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(clicks, 1);
  // Finished transitions remove the interception listener.
  env.window.dispatchEvent(click);
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(clicks, 1);
});
