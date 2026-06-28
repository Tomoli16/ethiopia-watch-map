// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { fileURLToPath } from "node:url";

const ssrStub = fileURLToPath(new URL("./src/lib/leaflet-ssr-stub.ts", import.meta.url));

export default defineConfig({
const SSR_STUB_TARGETS = new Set([
  "leaflet",
  "react-leaflet",
  "@react-leaflet/core",
]);

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    plugins: [
      {
        name: "ssr-stub-leaflet",
        enforce: "pre",
        // During the SSR build, redirect leaflet / react-leaflet imports to a
        // tiny no-op stub so their browser-only IIFE never runs in the
        // worker. The map component is loaded via a client-only dynamic
        // import, so SSR never actually renders it.
        async resolveId(source, importer, options) {
          if (!options?.ssr) return null;
          if (!SSR_STUB_TARGETS.has(source) && !source.startsWith("leaflet/")) return null;
          return this.resolve(ssrStub, importer, { ...options, skipSelf: true });
        },
      },
    ],
  },
});
