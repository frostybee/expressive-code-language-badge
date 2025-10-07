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
      opacity: '1',
    },
  },
});

interface LanguageBadgePluginOptions {
  /** Whether the plugin is enabled. Default: `true` */
  enabled?: boolean;

  /** Mapping of language identifiers to display labels. Default: `{ cpp: 'C++', sh: 'bash' }` */
  languageMap?: Record<string, string>;
}

/**
 * Creates an Expressive Code plugin that adds language badge functionality to code blocks
 */
export function pluginLanguageBadge(options: LanguageBadgePluginOptions = {}) {
  const config = {
    enabled: true,
    languageMap: {
      cpp: 'C++',
      sh: 'bash',
      ...options.languageMap,
    },
    ...options,
  };

  function remapLanguageLabel(lang: string, languageMap: Record<string, string> = {}) {
    return languageMap[lang] || lang;
  }

  return definePlugin({
    name: "Add language label to code blocks",
    styleSettings: languageBadgeStyleSettings,
    baseStyles: ({ cssVar }) => `
        .ec-language__label {
            display: flex;
            align-items: center;
            justify-content: center;
            direction: ltr;
            font-size: ${cssVar('languageBadge.fontSize')};
            color: ${cssVar('languageBadge.fontColor')};
            font-weight: ${cssVar('languageBadge.fontWeight')};
            opacity: ${cssVar('languageBadge.opacity')};
            z-index: 22222;
            -webkit-user-select: none;
            user-select: none;
            transition: opacity 0.3s;
            position: absolute;
            inset-block-start: calc(var(--ec-brdWd) + var(--button-spacing));
            inset-inline-end: calc(var(--ec-brdWd) + var(--ec-uiPadInl) );
        }
        .expressive-code:hover .ec-language__label {
            opacity: 0;
        }
        `,
    hooks: {
      postprocessRenderedBlock: async (context) => {
        const preElement = context.renderData.blockAst.children.find(
          (child: any) => child.type === 'element' && child.tagName === 'pre'
        );

        if (!preElement || preElement.type !== 'element') return;

        const language = preElement.properties?.dataLanguage as string | undefined;

        if (!language) return;

        const label = h("div.ec-language__label", {}, [
          remapLanguageLabel(language, config.languageMap),
        ]);

        const ast = context.renderData.blockAst;
        ast.children.push(label);

        context.renderData.blockAst = ast;
      },
    },
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
}

declare module '@expressive-code/core' {
  export interface StyleSettings {
    /** Style overrides for the language badge plugin. */
    languageBadge: LanguageBadgeStyleSettings;
  }
}
