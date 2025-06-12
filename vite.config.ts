import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    configureServer: (server: { middlewares: { use: (arg0: (req: any, res: any, next: any) => void) => void; }; }) => {
      server.middlewares.use((req, res, next) => {
        res.setHeader(
          "Content-Security-Policy",
          "default-src 'self'; connect-src 'self' https://clerk-telemetry.com;"
        );
        next();
      });
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
