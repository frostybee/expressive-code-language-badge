import { definePlugin, PluginStyleSettings } from '@expressive-code/core';
import { h } from '@expressive-code/core/hast';

/**
 * Default style settings for the language badge plugin
 */
const languageBadgeStyleSettings = new PluginStyleSettings({
  defaultValues: {
    languageBadge: {
      fontSize: '0.8rem',
      fontColor: 'red',
      fontWeight: 'bold',
      background: 'red',
      borderRadius: '0.5rem',
      opacity: '1',
    },
  },
});

interface LanguageBadgePluginOptions {
  /** Whether the plugin is enabled. Default: `true` */
  enabled?: boolean;

  /** Mapping of language identifiers to display labels. Default: `{ cpp: 'C++', sh: 'bash' }` */
  languageMap?: Record<string, string>;

  /** Text transform for language labels. Default: `'uppercase'` */
  textTransform?: 'uppercase' | 'lowercase' | 'none';
}

/**
 * Creates an Expressive Code plugin that adds language badge functionality to code blocks
 */
export function pluginLanguageBadge(options: LanguageBadgePluginOptions = {}) {
  const config = {
    enabled: true,
    textTransform: 'uppercase' as const,
    languageMap: {
      cpp: 'C++',
      sh: 'bash',
      csharp: 'C#',
      ts: 'TypeScript',
      js: 'JavaScript',     
      ...options.languageMap
    },
    ...options,
  };

  function remapLanguageLabel(lang: string, languageMap: Record<string, string> = {}) {
    return languageMap[lang] || lang;
  }

  return definePlugin({
		name: "Language Badge",
		
		baseStyles: ({ cssVar }) => `
      [data-language]::before {
      content: attr(data-language);
        position: absolute;
        z-index: 2;
        right: 0.5rem;
        top: 0.5rem;
        padding: 0.1rem 0.5rem;        
        font-family: "JetBrains Mono Variable", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        font-size: ${cssVar('languageBadge.fontSize')};
        font-weight: ${cssVar('languageBadge.fontWeight')};
        text-transform: ${config.textTransform};
        color: ${cssVar('languageBadge.fontColor')};
        background: ${cssVar('languageBadge.background')};
        opacity: ${cssVar('languageBadge.opacity')};
        border-radius: ${cssVar('languageBadge.borderRadius')};
        pointer-events: none;
        transition: opacity 0.3s;        
      }
      .frame.has-title [data-language]::before,
      .frame.is-terminal [data-language]::before {
        top: 2.5rem;
      }
      .frame {
        @media (hover: none) {
          & [data-language]::before {
            opacity: 1;
            margin-right: 3rem;
          }
          & [data-language]:active::before {
            opacity: 0;
          }
        }
        @media (hover: hover) {
          & [data-language]::before {
            opacity: 1;
          }
          &:hover [data-language]::before {
            opacity: 0;
          }
        }
      }
    `,
    hooks: {
      postprocessRenderedBlock: async (context) => {
        if (!config.enabled) return;

        const preElement = context.renderData.blockAst.children.find(
          (child: any) => child.type === 'element' && child.tagName === 'pre'
        );

        if (!preElement || preElement.type !== 'element') return;

        const language = preElement.properties?.dataLanguage as string | undefined;

        if (!language) return;

        const displayLabel = remapLanguageLabel(language, config.languageMap);

        preElement.properties.dataLanguage = displayLabel;
      },
    }
	});
}

interface LanguageBadgeStyleSettings {
  /** The font size for the language badge. Default: `'0.8rem'` */
  fontSize: string;

  /** The font color for the language badge. Default: `'#636467'` */
  fontColor: string;

  /** The font weight for the language badge. Default: `'400'` */
  fontWeight: string;

  /** The opacity for the language badge. Default: `'1'` */
  opacity: string;

  /** The background color for the language badge. Default: `'red'` */
  background: string;

  /** The border radius for the language badge. Default: `'0.5rem'` */
  borderRadius: string;
}

declare module '@expressive-code/core' {
  export interface StyleSettings {
    /** Style overrides for the language badge plugin. */
    languageBadge: LanguageBadgeStyleSettings;
  }
}
