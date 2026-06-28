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
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    environments: {
      ssr: {
        resolve: {
          // Map browser-only leaflet packages to a no-op stub during SSR so
          // their top-level `window` access never runs in the worker. The map
          // component is loaded via a useEffect-based dynamic import, so SSR
          // never actually renders it.
          alias: [
            { find: /^leaflet$/, replacement: ssrStub },
            { find: /^leaflet\/.*/, replacement: ssrStub },
            { find: /^react-leaflet$/, replacement: ssrStub },
            { find: /^@react-leaflet\/core$/, replacement: ssrStub },
          ],
        },
      },
    },
  },
});
