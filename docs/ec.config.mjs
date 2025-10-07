import { defineEcConfig } from "@astrojs/starlight/expressive-code";
import { pluginLanguageBadge } from "expressive-code-language-badge";

export default defineEcConfig({
  plugins: [
    pluginLanguageBadge({
      textTransform: "uppercase",
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
      background: "lightgray",
      borderRadius: "0.15rem",
      borderWidth: "1px",
      borderColor: "darkgray",
    },
  },
});
