module.exports = {
  extends: [
    // 规则继承 https://github.com/AlloyTeam/eslint-config-alloy
    'alloy'
  ],
  globals: {
    // 全局变量 window 不允许被重新赋值
    window: false,
    define: true
  },
  rules: {
    // 强制使用一致的缩进
    indent: [
      'error',
      2,
      {
        // case 子句将相对于 switch 语句缩进 2 个空格
        SwitchCase: 1,
        // 三元表达式内的三元表达式不能有缩进
        flatTernaryExpressions: true
      }
    ],
    // 不强制使用一致的分号
    semi: 0,
    // 限制圈复杂度不超过 30
    complexity: [
      'error',
      {
        max: 30
      }
    ]
  }
};
