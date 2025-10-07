import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'

const siteURI = 'https://frostybee.github.io';
export default defineConfig({
  site: siteURI,
  base: "/expressive-code-language-badge",
  integrations: [
    starlight({
      title: 'Expressive Code Language Badge Plugin',
      favicon: '/images/language-badge.svg',            
      sidebar: [
        {
          label: 'Start Here',
          collapsed: false,
          items: [
            { slug: 'getting-started' },
            { slug: 'configuration' },
          ],
        },
        {
          label: 'Features & Examples',
          collapsed: false,
          items: [
            { slug: 'features' },
            { slug: 'examples' },
          ],
        }
      ],
      social: [
        { href: 'https://github.com/frostybee/expressive-code-language-badge', icon: 'github', label: 'GitHub' },
      ],
    }),
  ],
})
