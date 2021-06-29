module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: ['eslint:recommended'],
    // 解析器，使用该解析器将代码转换为 ESTree，ESLint 会对 ESTree 进行校验。ESTree 只是一个 AST 的某一种规范，ESTree 本质上还是 AST
    parser: 'babel-eslint',
    // 解析器配置
    parserOptions: {
        ecmaVersion: 2018,  //ECMAscript版本
        sourceType: 'module' //
    },
    rules: {
        indent: [
            2,
            4,
            {
                SwitchCase: 1, // switch  case 缩进
                ignoredNodes: ['ConditionalExpression'], // 忽略三目运算缩进
            },
        ],
        'array-bracket-spacing': [0, 'never'], //是否允许非空数组里面有多余的空格
        'brace-style': [2, '1tbs', {allowSingleLine: true}], //大括号风格  "allowSingleLine": true（默认false）允许一个块打开和关闭括号在同一行上
        'comma-spacing': [2, {before: false, after: true}], // 控制逗号前后的空格
        'computed-property-spacing': [0, 'never'], // 以方括号取对象属性时，[ 后面和 ] 前面是否需要空格, 可选参数 never, always
        'comma-style': [2, 'last'], // 控制逗号在行尾出现还是在行首出现
        'no-spaced-func': 2, //函数调用时 函数名与()之间不能有空格
        'no-undef': 2, //不能有未定义的变量
        'no-invalid-regexp': 0, //禁止无效的正则表达式
        'object-curly-spacing': [0, 'never'],
        'no-console': process.env.NODE_ENV === 'production' ? 1 : 0,
        'no-debugger': process.env.NODE_ENV === 'production' ? 1 : 0, //禁止使用debugger
        'no-unused-vars': ['error', {vars: 'all', args: 'after-used', ignoreRestSiblings: false}], //关闭定义变量未使用提示/报错
        'no-duplicate-case': 2, //switch中的case标签不能重复
        'no-empty': 0, //块语句中的内容不能为空
        'no-useless-escape': 'off',
        strict: 2, //使用严格模式
        semi: [0, 'always'], //语句强制分号结尾
    },
};
