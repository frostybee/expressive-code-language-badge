import { defineEcConfig } from "@astrojs/starlight/expressive-code";
import { pluginLanguageBadge } from "expressive-code-language-badge";

export default defineEcConfig({
  plugins: [
    pluginLanguageBadge({
      textTransform: "uppercase",
      excludeLanguages: ["json", "css"],      
      languageMap: {
        csharp: "C#",
        cpp: "C++",
      },
    }),
  ],
  styleOverrides: {
    languageBadge: {
      fontSize: "0.85rem",
      fontColor: "darkblue",
      fontWeight: "600",
      opacity: "0.95",
      background: "lightblue",
      borderRadius: "0.15rem",      
    },
  },
});
