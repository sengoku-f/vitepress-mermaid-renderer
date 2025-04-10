import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";

export default defineConfig({
  plugins: [
    vue(),
    libInjectCss(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "VitepressMermaidRenderer",
      fileName: (format) => {
        if (format === "es") return "vitepress-mermaid-renderer.js";
        if (format === "umd") return "vitepress-mermaid-renderer.umd.cjs";
        return `vitepress-mermaid-renderer.${format}`;
      },
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: ["vue", "mermaid"],
      output: {
        globals: {
          vue: "Vue",
          mermaid: "mermaid",
        },
        assetFileNames: ({ name }) => {
          if (/\.(css)$/.test(name ?? "")) {
            return "vitepress-mermaid-renderer.css";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
    sourcemap: true,
    // Ensure the code only runs in the client
    target: "esnext",
    minify: "esbuild",
    cssMinify: true,
    cssCodeSplit: false,
    outDir: "dist",
    emptyOutDir: true,
  },
});
