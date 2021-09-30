function exec(begin, step, end, action) {
  for (let i = begin; i <= end; i += step) {
    action(i);
  }
}

function pxAction(begin, step, end) {
  const res = {};
  exec(begin, step, end, function (i) {
    res[i] = i + 'px';
  });
  return res;
}

function numberAction(begin, step, end) {
  const res = {};
  exec(begin, step, end, function (i) {
    res[i] = i.toString();
  });
  return res;
}

function boxShadow(begin, step, end) {
  const res = {};
  exec(begin, step, end, function (i) {
    res[i] =
      '0 ' +
      (i + 1) +
      'px 1px 0px rgba(0, 0, 0, 0.2), 0 ' +
      i +
      'px 0px 0 rgba(0, 0, 0, 0.14), 0 1px ' +
      (1 + i * 2) +
      'px 0 rgba(0, 0, 0, 0.12) !important';
  });
  return res;
}

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV !== 'development' ? true : false,
    content: [
      './src/**/*.html',
      './src/**/*.vue',
      './src/**/*.jsx',
      './src/**/*.tsx',
      './src/**/*.ts'
    ]
  },

  darkMode: false, // or 'media' or 'class'
  corePlugins: {
    color: false,
    screens: false
  },
  theme: {
    screens: {},
    spacing: pxAction(0, 2, 100),
    colors: {
      black: '#000',
      white: '#fff',

      primary: { DEFAULT: '#0076ff', light: '#3D6BFF' },
      success: { DEFAULT: '#08a656', light: '#e0ffea' },
      warning: { DEFAULT: '#e72832', light: '#fff6eb' },
      danger: { DEFAULT: '#ff8a21', light: '#ffdbe2' }
    },
    borderColor: { DEFAULT: '#E2E5E9' },
    borderRadius: Object.assign(pxAction(0, 2, 8), {
      DEFAULT: '4px',
      full: '9999px'
    }),
    borderWidth: { DEFAULT: '1px' },
    boxShadow: Object.assign(boxShadow(0, 1, 24), {
      none: 'none'
    }),
    fontSize: Object.assign(pxAction(10, 2, 50), {
      0: '0px'
    }),
    fontWeight: Object.assign(numberAction(100, 100, 700), {
      bold: 'bold',
      normal: 'normal'
    }),
    height: Object.assign(pxAction(0, 100, 700), pxAction(12, 2, 98), {
      auto: 'auto',
      full: '100%',
      screen: '100vh'
    }),
    lineHeight: pxAction(12, 2, 100),
    textColor: (theme) =>
      Object.assign(theme('colors'), {
        DEFAULT: '#5E5E5E',
        main: '#101217',
        title: '#333333',
        secondary: '#515151',
        muted: '#999999',
        note: '#C6C6C6'
      }),
    width: Object.assign(pxAction(0, 100, 700), {
      auto: 'auto',
      full: '100%',
      screen: '100vw',

      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      '1/12': '8.333333%',
      '2/12': '16.666667%',
      '3/12': '25%',
      '4/12': '33.333333%',
      '5/12': '41.666667%',
      '6/12': '50%',
      '7/12': '58.333333%',
      '8/12': '66.666667%',
      '9/12': '75%',
      '10/12': '83.333333%',
      '11/12': '91.666667%'
    })
  },
  variants: ['important', 'hover'],
  plugins: [addImportantVariant]
};

// important 变体
function addImportantVariant({ addVariant }) {
  addVariant('important', ({ container }) => {
    container.walkRules((rule) => {
      rule.selector = `.${rule.selector.slice(1)}\\!`;
      rule.walkDecls((decl) => {
        decl.important = true;
      });
    });
  });
}
