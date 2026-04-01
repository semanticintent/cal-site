import { defineConfig } from 'vitepress'

export default defineConfig({
  appearance: 'dark',
  title: 'CAL - Cascade Analysis Language',
  description: 'Cascade Analysis Language - The closed-loop intelligence language for finding what companies miss',
  titleTemplate: ':title | CAL Documentation',

  ignoreDeadLinks: [
    // Allow localhost URLs in developer documentation
    /^https?:\/\/localhost/,
    // Ignore /cal (parsed from @stratiqx/cal-runtime references in code blocks)
    '/cal',
  ],

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'title', content: 'CAL - Cascade Analysis Language' }],
    ['meta', { name: 'description', content: 'The only language where cascade analysis is syntax, not a library. Find what companies miss with closed-loop intelligence.' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://cal.cormorantforaging.dev/' }],
    ['meta', { property: 'og:title', content: 'CAL - Cascade Analysis Language' }],
    ['meta', { property: 'og:description', content: 'The only language where cascade analysis is syntax, not a library. Find what companies miss with closed-loop intelligence.' }],
    ['meta', { property: 'og:image', content: 'https://cal.cormorantforaging.dev/logo.svg' }],
    ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { property: 'twitter:url', content: 'https://cal.cormorantforaging.dev/' }],
    ['meta', { property: 'twitter:title', content: 'CAL - Cascade Analysis Language' }],
    ['meta', { property: 'twitter:description', content: 'The only language where cascade analysis is syntax, not a library. Find what companies miss with closed-loop intelligence.' }],
    ['meta', { property: 'twitter:image', content: 'https://cal.cormorantforaging.dev/logo.svg' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'CAL',

    nav: [
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'Language', link: '/language/syntax' },
      { text: 'Runtime', link: '/runtime/' },
      { text: 'Frameworks', link: '/frameworks/drift' },
      { text: 'Tools', link: '/tools/cli' },
      { text: 'Playground', link: '/playground' },
      { text: 'API', link: '/api/parser' },
      { text: 'EMBER', link: '/ember/' },
      {
        text: 'Links',
        items: [
          { text: 'CAL GitHub', link: 'https://github.com/semanticintent/cal-runtime' },
          { text: 'Phoenix GitHub', link: 'https://github.com/semanticintent/phoenix-runtime' },
          { text: '6D Methodology', link: 'https://6d.cormorantforaging.dev/' },
          { text: 'Cormorant Foraging', link: 'https://cormorantforaging.dev/' },
          { text: 'StratIQX', link: 'https://stratiqx.com/' }
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/introduction' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Quick Start', link: '/guide/quick-start' },
            { text: 'Core Concepts', link: '/guide/concepts' }
          ]
        }
      ],
      '/language/': [
        {
          text: 'Language Reference',
          items: [
            { text: 'Syntax', link: '/language/syntax' },
            { text: 'Keywords', link: '/language/keywords' },
            { text: 'Operators', link: '/language/operators' },
            { text: 'Dimensions', link: '/language/dimensions' },
            { text: 'Examples', link: '/language/examples' }
          ]
        }
      ],
      '/frameworks/': [
        {
          text: 'Integrated Frameworks',
          items: [
            { text: 'When to Use 6D', link: '/frameworks/when-to-use-6d' },
            { text: 'DRIFT Measurement', link: '/frameworks/drift' },
            { text: 'Fetch Decisions', link: '/frameworks/fetch' },
            { text: '6D Methodology', link: '/frameworks/6d' }
          ]
        }
      ],
      '/tools/': [
        {
          text: 'Tools',
          items: [
            { text: 'Command Line', link: '/tools/cli' },
            { text: 'REPL', link: '/tools/repl' },
            { text: 'AI Agent', link: '/tools/agent' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Parser (cal.js)', link: '/api/parser' },
            { text: 'Executor', link: '/api/executor' },
            { text: 'Adapters', link: '/api/adapters' }
          ]
        }
      ],
      '/runtime/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Overview', link: '/runtime/' },
            { text: 'Installation', link: '/runtime/installation' },
            { text: 'Getting Started', link: '/runtime/getting-started' }
          ]
        },
        {
          text: 'Configuration',
          items: [
            { text: 'Configuration', link: '/runtime/configuration' },
            { text: 'Validation', link: '/runtime/validation' }
          ]
        },
        {
          text: 'Adapters',
          items: [
            { text: 'Data Adapters', link: '/runtime/data-adapters' },
            { text: 'Alert Adapters', link: '/runtime/alert-adapters' }
          ]
        },
        {
          text: 'Reference',
          items: [
            { text: 'CLI Reference', link: '/runtime/cli-reference' },
            { text: 'Examples', link: '/runtime/examples' },
            { text: 'API Reference', link: '/runtime/api-reference' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/semanticintent' }
    ],

    footer: {
      message: 'Part of <a href="https://cormorantforaging.dev" target="_blank">Cormorant Foraging</a> | <a href="https://millpond.ai" target="_blank">MillPond 🐦</a> | <a href="https://stratiqx.com" target="_blank">StratIQX</a> | The closed-loop intelligence language.',
      copyright: 'Built on research from <a href="https://semanticintent.dev/papers/semantic-intent-ssot" target="_blank">semanticintent.dev</a> | <a href="/privacy-policy">Privacy</a> • <a href="/terms-of-service">Terms</a> • <a href="/cookie-policy">Cookies</a> • <a href="/disclaimer">Disclaimer</a>'
    },

    search: {
      provider: 'local'
    },

    // Edit link disabled until repository is public
    // editLink: {
    //   pattern: 'https://github.com/semanticintent/cal-docs/edit/main/:path',
    //   text: 'Edit this page on GitHub'
    // }
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'one-dark-pro'
    },
    lineNumbers: true
  }
})
