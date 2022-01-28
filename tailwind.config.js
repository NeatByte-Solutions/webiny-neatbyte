const svgToDataUri = require('mini-svg-data-uri')
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette')

module.exports = {
  experimental: {
    optimizeUniversalDefaults: true,
  },
  content: ['./src/**/*.{js,jsx,mdx,html}', './remark/**/*.js'],
  darkMode: 'class',
  theme: {
    // `demo-*` screens are used for the "mobile-first" responsive demo
    screens: {
      sm: '640px',
      'demo-sm': '720px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    aspectRatio: {
      auto: 'auto',
      square: '1 / 1',
      video: '16 / 9',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
      13: '13',
      14: '14',
      15: '15',
      16: '16',
    },
    extend: {
      colors: {
        'dark-blue': '#334155',
        gray: '#000E1A',
        blue: '#01579B',
        nordic: '#002D39',
        orange: '#FA5A28',
        purple: '#F3F6FF',
        'dark-purple': '#696F8C',
        green: '#DFF1F1',
        yellow: '#FFFAF1',
        peach: '#FCE8E6',
        smoke: '#F8F8F8',
        border: '#E5E5E5',
        white: '#ffffff',
        black: '#000000',
        code: {
          filename: '#D9DAE1',
          bar: '#434468',
          tab: '#7979f7',
          highlight: 'rgb(125 211 252 / 0.1)',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#334155',
            fontSize: '16px',
            hr: {
              borderColor: theme('colors.slate.100'),
              marginTop: '3em',
              marginBottom: '3em',
            },
            'h1, h2, h3, h4': {
              fontWeight: 700,
              marginTop: '1.875rem',
            },
            h1: {
              fontSize: '2.125rem',
              lineHeight: '2.5rem',
            },
            h2: {
              fontSize: '1.75rem',
              lineHeight: '2.0625rem',
            },
            h3: {
              fontSize: '1.5rem',
              lineHeight: '1.75rem',
            },
            h4: {
              fontSize: '1.375rem',
              lineHeight: '1.625rem',
            } /* 
            'h2 small, h3 small, h4 small': {
              fontFamily: theme('fontFamily.mono').join(', '),
              color: theme('colors.slate.500'),
              fontWeight: 500,
            },
            'h2 small': {
              fontSize: theme('fontSize.lg')[0],
              ...theme('fontSize.lg')[1],
            },
            'h3 small': {
              fontSize: theme('fontSize.base')[0],
              ...theme('fontSize.base')[1],
            },
            'h4 small': {
              fontSize: theme('fontSize.sm')[0],
              ...theme('fontSize.sm')[1],
            },
            'h2, h3, h4': {
              'scroll-margin-top': 'var(--scroll-mt)',
            }, */,
            p: {
              fontSize: '0.875rem',
              lineHeight: '1.75rem',
              marginTop: '1.25rem',
            },
            ul: {
              listStyleType: 'none',
              paddingLeft: 0,
            },
            'ul > li': {
              position: 'relative',
              paddingLeft: '1.75em',
              color: '#002D39',
              fontSize: '0.875rem',
              lineHeight: '2.25rem',
            },
            'ul > li::before': {
              content: '""',
              width: '0.75em',
              height: '0.125em',
              position: 'absolute',
              top: 'calc(0.875em - 0.0625em)',
              left: 0,
              borderRadius: '999px',
              backgroundColor: theme('colors.slate.300'),
            },
            a: {
              color: '#FA5A28',
              textDecoration: 'none',
              borderBottom: `1px solid #FA5A28`,
              fontSize: '0.875rem',
              lineHeight: '1.75rem',
            },
            'a:hover': {
              borderBottomWidth: '2px',
            },
            'a code': {
              color: 'inherit',
              fontWeight: 'inherit',
              textDecoration: 'underline',
            },
            strong: {
              color: theme('colors.slate.900'),
              fontWeight: theme('fontWeight.semibold'),
            },
            'a strong': {
              color: 'inherit',
              fontWeight: 'inherit',
            },
            code: {
              fontWeight: theme('fontWeight.medium'),
              fontVariantLigatures: 'none',
              fontFamily: 'Source Code Pro, monospace',
              color: '#FA5A28',
              paddingTop: '0.25rem',
              paddingBottom: '0.25rem',
              paddingLeft: '0.625rem',
              paddingRight: '0.625rem',
              borderRadius: '0.25rem',
              boxShadow: 'inset 0 0 0 1px #E8E8E8',
              backgroundColor: '#F8F8F8',
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            pre: {
              color: theme('colors.slate.50'),
              borderRadius: theme('borderRadius.xl'),
              padding: theme('padding.5'),
              boxShadow: theme('boxShadow.md'),
              display: 'flex',
              marginTop: `${20 / 14}em`,
              marginBottom: `${32 / 14}em`,
            },
            'p + pre': {
              marginTop: `${-4 / 14}em`,
            },
            'pre + pre': {
              marginTop: `${-16 / 14}em`,
            },
            'pre code': {
              flex: 'none',
              minWidth: '100%',
              boxShadow: 'none',
              fontFamily: 'Source Code Pro, monospace',
            },
            table: {
              fontSize: theme('fontSize.sm')[0],
              lineHeight: theme('fontSize.sm')[1].lineHeight,
            },
            thead: {
              color: theme('colors.slate.700'),
              borderBottomColor: theme('colors.slate.200'),
            },
            'thead th': {
              paddingTop: 0,
              fontWeight: theme('fontWeight.semibold'),
            },
            'tbody tr': {
              borderBottomColor: theme('colors.slate.100'),
            },
            'tbody tr:last-child': {
              borderBottomWidth: '1px',
            },
            'tbody code': {
              fontSize: theme('fontSize.xs')[0],
            },
            figure: {
              padding: '0.875rem',
              borderRadius: '0.625rem',
              backgroundColor: '#F8F8F8',
            },
            'figure > img': {
              margin: 0,
            },
            'figure figcaption': {
              fontFamily: 'Roboto, sans-serif',
              fontSize: '0.875rem',
              lineHeight: '1.625rem',
              textAlign: 'center',
              marginTop: '0.625rem',
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.slate.400'),
            'h2, h3, h4, thead th': {
              color: theme('colors.slate.200'),
            },
            'h2 small, h3 small, h4 small': {
              color: theme('colors.slate.400'),
            },
            code: {
              color: theme('colors.slate.200'),
            },
            hr: {
              borderColor: theme('colors.slate.200'),
              opacity: '0.05',
            },
            pre: {
              boxShadow: 'inset 0 0 0 1px rgb(255 255 255 / 0.1)',
            },
            a: {
              color: theme('colors.white'),
              borderBottomColor: theme('colors.sky.400'),
            },
            strong: {
              color: theme('colors.slate.200'),
            },
            thead: {
              color: theme('colors.slate.300'),
              borderBottomColor: 'rgb(148 163 184 / 0.2)',
            },
            'tbody tr': {
              borderBottomColor: 'rgb(148 163 184 / 0.1)',
            },
          },
        },
        md: {
          css: {
            'h1, h2, h3, h4': {
              fontWeight: 700,
              marginTop: '3.75rem',
            },
            h1: {
              fontSize: '3rem',
              lineHeight: '3.5rem',
            },
            h2: {
              fontSize: '2.25rem',
              lineHeight: '2.625rem',
            },
            h3: {
              fontSize: '2rem',
              lineHeight: '2.375rem',
            },
            h4: {
              fontSize: '1.75rem',
              lineHeight: '2.0625rem',
            },
            p: {
              fontSize: '1rem',
              lineHeight: '1.75rem',
              marginTop: '1.25rem',
            },
            ul: {
              paddingTop: '1.3em',
            },
            'ul > li': {
              fontSize: '1rem',
              lineHeight: '2.25rem',
              paddingLeft: '1.5em',
              marginBottom: '0em',
              marginTop: '0em',
            },
            'ul > li::before': {
              content: '""',
              width: '0.63em',
              height: '0.125em',
              position: 'absolute',
              top: '1em',
              left: 0,
              borderRadius: '999px',
              backgroundColor: '#FA5A28',
            },
            a: {
              fontSize: '1rem',
              lineHeight: '1.75rem',
              marginTop: '1.25rem',
            },
            figure: {
              paddingTop: '1.875rem',
              paddingBottom: '1.875rem',
              paddingLeft: '3rem',
              paddingRight: '3rem',
            },
            'figure figcaption': {
              marginTop: '0.75rem',
            },
          },
        },
      }),
      fontFamily: {
        // remove this font from components
        //sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        //mono: ['Fira Code VF', ...defaultTheme.fontFamily.mono],
        //source: ['Source Sans Pro', ...defaultTheme.fontFamily.sans],
        //'ubuntu-mono': ['Ubuntu Mono', ...defaultTheme.fontFamily.mono],
        roboto: ['Roboto', 'sans-serif'],
        'source-sans-pro': ['Source Sans Pro', 'sans-serif'],
      },
      fontSize: {
        'nav-directory': [
          '1.126rem',
          {
            lineHeight: '1.3125rem',
          },
        ],
        'nav-subdirectory': [
          '1rem',
          {
            lineHeight: '1.1875rem',
          },
        ],
        'nav-link': [
          '0.875rem',
          {
            lineHeight: '1rem',
          },
        ],
        'button-text': [
          '0.875rem',
          {
            lineHeight: '1.5rem',
          },
        ],
        'sidebar-right-title': [
          '1.375rem',
          {
            lineHeight: '1.5rem',
          },
        ],
        'burger-menu-link': [
          '0.75rem',
          {
            lineHeight: '1.625rem',
          },
        ],
      },
      spacing: {
        18: '4.5rem',
        full: '100%',
      },
      maxWidth: {
        '8xl': '90rem',
      },
      keyframes: {
        'flash-code': {
          '0%': { backgroundColor: 'rgb(125 211 252 / 0.1)' },
          '100%': { backgroundColor: 'transparent' },
        },
      },
      animation: {
        'flash-code': 'flash-code 1s forwards',
        'flash-code-slow': 'flash-code 2s forwards',
      },
      backgroundImage: (theme) => ({
        squiggle: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 3" enable-background="new 0 0 6 3" width="6" height="3" fill="${theme(
            'colors.yellow.400'
          )}"><polygon points="5.5,0 2.5,3 1.1,3 4.1,0"/><polygon points="4,0 6,2 6,0.6 5.4,0"/><polygon points="0,2 1,3 2.4,3 0,0.6"/></svg>`
        )}")`,
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    function ({ addVariant }) {
      addVariant(
        'supports-backdrop-blur',
        '@supports (backdrop-filter: blur(0)) or (-webkit-backdrop-filter: blur(0))'
      )
      addVariant('supports-scrollbars', '@supports selector(::-webkit-scrollbar)')
      addVariant('children', '& > *')
      addVariant('scrollbar', '&::-webkit-scrollbar')
      addVariant('scrollbar-track', '&::-webkit-scrollbar-track')
      addVariant('scrollbar-thumb', '&::-webkit-scrollbar-thumb')
      addVariant('demo-dark', '.demo-dark &')
    },
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'bg-grid': (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme('backgroundColor')), type: 'color' }
      )

      matchUtilities(
        {
          highlight: (value) => ({ boxShadow: `inset 0 1px 0 0 ${value}` }),
        },
        { values: flattenColorPalette(theme('backgroundColor')), type: 'color' }
      )
    },
    function ({ addUtilities, theme }) {
      let backgroundSize = '7.07px 7.07px'
      let backgroundImage = (color) =>
        `linear-gradient(135deg, ${color} 10%, transparent 10%, transparent 50%, ${color} 50%, ${color} 60%, transparent 60%, transparent 100%)`
      let colors = Object.entries(theme('backgroundColor')).filter(
        ([, value]) => typeof value === 'object' && value[400] && value[500]
      )

      addUtilities(
        Object.fromEntries(
          colors.map(([name, colors]) => {
            let backgroundColor = colors[400] + '1a' // 10% opacity
            let stripeColor = colors[500] + '80' // 50% opacity

            return [
              `.bg-stripes-${name}`,
              {
                backgroundColor,
                backgroundImage: backgroundImage(stripeColor),
                backgroundSize,
              },
            ]
          })
        )
      )

      addUtilities({
        '.bg-stripes-white': {
          backgroundImage: backgroundImage('rgba(255 255 255 / 0.75)'),
          backgroundSize,
        },
      })

      addUtilities({
        '.ligatures-none': {
          fontVariantLigatures: 'none',
        },
      })
    },
  ],
}
