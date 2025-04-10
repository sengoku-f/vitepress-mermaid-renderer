import { MermaidRenderer } from "./MermaidRenderer";
import type { MermaidConfig } from "mermaid";
import "./style.css";

// Check if we're in a browser environment
const isBrowser =
  typeof window !== "undefined" && typeof document !== "undefined";

// Create a safe export that won't run on the server
const createMermaidRenderer = (config?: MermaidConfig) => {
  if (!isBrowser) {
    return {
      initialize: () => {},
      renderMermaidDiagrams: () => false,
      getInstance: () => ({
        initialize: () => {},
        renderMermaidDiagrams: () => false,
      }),
    };
  }

  return MermaidRenderer.getInstance(config);
};

export { MermaidRenderer, createMermaidRenderer };
export default createMermaidRenderer;
