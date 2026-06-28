// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          // Isolate leaflet / react-leaflet into their own chunk so their
          // window-touching IIFE never gets pulled into a shared SSR chunk
          // (otherwise routes import it just to grab React and SSR 500s).
          manualChunks(id: string) {
            if (id.includes("node_modules/leaflet/") || id.includes("node_modules/react-leaflet/") || id.includes("node_modules/@react-leaflet/")) {
              return "leaflet";
            }
          },
        },
      },
    },
  },
});
