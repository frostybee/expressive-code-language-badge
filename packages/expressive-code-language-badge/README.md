<div align="center">
  <h1>Expressive Code Language Badge</h1>
  <p>A plugin for Expressive Code that adds language badges to code blocks with customizable styling.</p>

  [![npm version](https://badge.fury.io/js/expressive-code-language-badge.svg)](https://badge.fury.io/js/expressive-code-language-badge)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
</div>

## Features

- **Automatic language detection**: Shows programming language for each code block
- **Custom language labels**: Remap identifiers (e.g., `cpp` → `C++`)
- **Exclude languages**: Hide badges for specific languages
- **Text transform**: Choose uppercase or lowercase display
- **Hover interaction**: Badges fade out on hover
- **Fully customizable**: Extensive styling options for colors, fonts, and borders

## Installation

```bash
npm install expressive-code-language-badge
```

## Quick Start

```js
import { pluginLanguageBadge } from 'expressive-code-language-badge';

// Add to your Expressive Code configuration
plugins: [
  pluginLanguageBadge({
    textTransform: 'lowercase',
    excludeLanguages: ['json', 'css'],
    languageMap: {
      cpp: 'C++',
      csharp: 'C#',
    },
  })
]
```

## Documentation

For comprehensive documentation, installation guides, configuration options, and examples, visit the [plugin documentation](https://frostybee.github.io/expressive-code-language-badge/).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

Licensed under the MIT License, Copyright © frostybee.

See [LICENSE](/LICENSE) for more information.

## Links

- [GitHub Repository](https://github.com/frostybee/expressive-code-language-badge)
- [npm Package](https://www.npmjs.com/package/expressive-code-language-badge)
- [Documentation](https://frostybee.github.io/expressive-code-language-badge/)
- [Issues](https://github.com/frostybee/expressive-code-language-badge/issues)