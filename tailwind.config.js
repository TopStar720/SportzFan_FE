function range(start, end, increment = 1) {
  const count = Math.floor((end - start + increment) / increment)
  return Array(count)
    .fill(0)
    .map((_, idx) => start + idx * increment)
}

const minFontSize = 2
const maxFontSize = 140

const minFlexSize = 1
const maxFlexSize = 12

const minSpacingPixel = 0
const maxSpacingPixel = 1200
const spacingPixelIncrement = 2

const vhs = ['10vh', '20vh', '30vh', '40vh', '50vh', '60vh', '70vh', '80vh', '90vh', '100vh']

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/views/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        sf: {
          blue: {
            1000: '#14264b',
          },
          gray: {
            300: '#ced2d6',
            600: '#3b464e',
          },
          green: {
            400: '#5df891',
            500: '#33be51',
            600: '#169936',
            800: '#188049',
          },
          neutral: {
            300: '#c8c8c8',
            400: '#acacac',
            500: '#787878',
            900: '#121212',
          },
          pink: {
            400: '#ee7fce',
          },
          red: {
            500: '#eb4646',
            600: '#d42222',
          },
          rose: {
            300: '#f998ab',
            700: '#ba0c2f',
          },
          sky: {
            300: '#9eddff',
          },
          slate: {
            300: '#c6cfd9',
          },
          teal: {
            800: '#1e5550',
          },
          yellow: {
            200: '#ffed93',
            300: '#fec600',
            500: '#e3b800',
            600: '#b28900',
            700: '#a3833f',
          },
          zinc: {
            400: '#9c9ca4',
            600: '#464b4f',
            700: '#303439',
            900: '#1a1e23',
            1000: '#0f1112',
          },
        },
      },
      width: {},
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '6rem',
        },
      },
      screens: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      keyframes: {
        spinning: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
      },
      animation: {
        spinning: 'spinning 3s linear infinite',
      },
      flex: {
        ...range(minFlexSize, maxFlexSize).reduce((merged, f) => ({ ...merged, [f]: `${f} ${f} 0%` }), {}),
        none: 'none',
      },
      fontFamily: {
        primary: ['Goldman'],
        archivo: ['Archivo'],
        poppins: ['Poppins'],
      },
      fontSize: {
        ...range(minFontSize, maxFontSize).reduce((merged, f) => ({ ...merged, [f]: `${f}px` }), {}),
      },
      spacing: {
        ...range(minSpacingPixel, maxSpacingPixel, spacingPixelIncrement).reduce(
          (merged, f) => ({ ...merged, [f]: `${f}px` }),
          {},
        ),
      },
      lineHeight: {
        ...range(minSpacingPixel, maxSpacingPixel, spacingPixelIncrement).reduce(
          (merged, f) => ({ ...merged, [f]: `${f}px` }),
          {},
        ),
      },
      maxWidth: {
        ...range(minSpacingPixel, maxSpacingPixel, spacingPixelIncrement).reduce(
          (merged, f) => ({ ...merged, [f]: `${f}px` }),
          {},
        ),
      },
      minWidth: {
        ...range(minSpacingPixel, maxSpacingPixel, spacingPixelIncrement).reduce(
          (merged, f) => ({ ...merged, [f]: `${f}px` }),
          {},
        ),
      },
      maxHeight: {
        ...range(minSpacingPixel, maxSpacingPixel, spacingPixelIncrement).reduce(
          (merged, f) => ({ ...merged, [f]: `${f}px` }),
          {},
        ),
        ...vhs.reduce((merged, vh) => ({ ...merged, [vh]: vh }), {}),
      },
      minHeight: {
        ...range(minSpacingPixel, maxSpacingPixel, spacingPixelIncrement).reduce(
          (merged, f) => ({ ...merged, [f]: `${f}px` }),
          {},
        ),
        ...vhs.reduce((merged, vh) => ({ ...merged, [vh]: vh }), {}),
      },
    },
  },
  plugins: [],
}
