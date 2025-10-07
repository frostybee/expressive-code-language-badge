import { defineEcConfig } from '@astrojs/starlight/expressive-code';
import { pluginLanguageBadge } from 'expressive-code-language-badge';

export default defineEcConfig({
	plugins: [pluginLanguageBadge()],	
	styleOverrides: {
		languageBadge: {
		  fontSize: '0.85rem',
		  fontColor: '#636467',
		  fontWeight: '600',
		  opacity: '0.95',
		}
	  }
});