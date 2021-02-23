module.exports = {
  extends: [
    // https://github.com/AlloyTeam/eslint-config-alloy
    'alloy'
  ],
  globals: {
    window: false,
    define: true,
    bbo: false,
    jest: false
  },
  rules: {
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: true
      }
    ],
    semi: 0,
    complexity: [
      'error',
      {
        max: 30
      }
    ]
  },
  overrides: [
    {
      files: ['test/**/*.js'],
      env: { jest: true }
    }
  ]
};
