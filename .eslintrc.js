// Note: All paths are relative to the directory in which eslint is being run, rather than the directory where this file
// lives

// ESLint config docs: https://eslint.org/docs/user-guide/configuring/
module.exports = {
  env: {
    node: true,
  },
  extends: [
    'prettier',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],

  ignorePatterns: ['**/dist/**'],

  plugins: ['simple-import-sort'],

  overrides: [
    {
      // Configuration for JavaScript files
      files: ['*.js'],
      rules: {
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      },
    },
    {
      // Configuration for typescript files
      files: ['*.ts', '*.tsx', '*.d.ts'],
      extends: ['plugin:@typescript-eslint/recommended', 'plugin:import/typescript'],
      plugins: ['@typescript-eslint', 'jsdoc'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      rules: {
        // Unused variables should be removed unless they are marked with and underscore (ex. _varName).
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

        // Do not use ts-ignore, use ts-expect-error instead.
        // Also make sure that all ts-expect-error comments are given a description.
        '@typescript-eslint/ban-ts-comment': 'error',

        // Types usage should be explicit as possible, so we prevent usage of inferrable types.
        // This is especially important because we have a public API, so usage needs to be as
        // easy to understand as possible.
        '@typescript-eslint/no-inferrable-types': 'off',

        // Enforce type annotations to maintain consistency. This is especially important as
        // we have a public API, so we want changes to be very explicit.
        '@typescript-eslint/typedef': ['error', { arrowParameter: false }],

        // Although for most codebases inferencing the return type is fine, we explicitly ask to annotate
        // all functions with a return type. This is so that intent is as clear as possible. We are guarding against
        // cases where you accidently refactor a function's return type to be the wrong type.
        '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],

        // Consistent ordering of fields, methods and constructors for classes should be enforced
        '@typescript-eslint/member-ordering': 'error',

        // Enforce that unbound methods are called within an expected scope. As we frequently pass data between classes
        // in SDKs, we should make sure that we are correctly preserving class scope.
        '@typescript-eslint/unbound-method': 'error',

        '@typescript-eslint/consistent-type-imports': 'error',

        // Private and protected members of a class should be prefixed with a leading underscore.
        // typeLike declarations (class, interface, typeAlias, enum, typeParameter) should be
        // PascalCase.
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'memberLike',
            modifiers: ['private'],
            format: ['camelCase'],
            leadingUnderscore: 'require',
          },
          {
            selector: 'memberLike',
            modifiers: ['protected'],
            format: ['camelCase'],
            leadingUnderscore: 'require',
          },
          {
            selector: 'typeLike',
            format: ['PascalCase'],
          },
        ],

        // Prefer for-of loop over for loop if index is only used to access array
        '@typescript-eslint/prefer-for-of': 'error',

        // Make sure all expressions are used. Turned off in tests
        // Must disable base rule to prevent false positives
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true }],

        // Make sure Promises are handled appropriately
        '@typescript-eslint/no-floating-promises': 'error',

        // sort imports
        'simple-import-sort/imports': 'error',
        'sort-imports': 'off',
        'import/order': 'off',

        // Disallow delete operator. We should make this operation opt in (by disabling this rule).
        '@typescript-eslint/no-dynamic-delete': 'error',

        // We should prevent against overloads unless necessary.
        '@typescript-eslint/unified-signatures': 'error',

        // Disallow unsafe any usage. We should enforce that types be used as possible, or unknown be used
        // instead of any. This is especially important for methods that expose a public API, as users
        // should know exactly what they have to provide to use those methods. Turned off in tests.
        '@typescript-eslint/no-unsafe-member-access': 'error',

        // Be explicit about class member accessibility (public, private, protected). Turned off
        // on tests for ease of use.
        '@typescript-eslint/explicit-member-accessibility': ['error'],
      },
    },
    {
      // Configuration for files under src
      files: ['src/**/*'],
      rules: {
        'jsdoc/require-jsdoc': [
          'error',
          {
            require: { ClassDeclaration: true, MethodDefinition: true },
            checkConstructors: false,
            publicOnly: true,
          },
        ],

        // All imports should be accounted for
        'import/no-extraneous-dependencies': 'error',
      },
    },
    {
      // Configuration for config files like rollup
      files: ['*.config.js', '*.config.mjs'],
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2018,
      },
      rules: {
        'import/no-named-as-default-member': 'off',
        'import/no-named-as-default': 'off',
        'import/default': 'off',
      },
    },
    {
      // Configuration for Test files
      files: ['**/*.test.ts'],
      rules: {
        '@typescript-eslint/unbound-method': 'off',
      },
    },
  ],

  rules: {
    // Disallow usage of console and alert
    'no-console': 'error',
    'no-alert': 'error',

    // Prevent reassignment of function parameters, but still allow object properties to be
    // reassigned. We want to enforce immutability when possible, but we shouldn't sacrifice
    // too much efficiency
    'no-param-reassign': ['error', { props: false }],

    // Prefer use of template expression over string literal concatenation
    'prefer-template': 'error',

    // Limit maximum file size to reduce complexity. Turned off in tests.
    'max-lines': ['error', { max: 300, skipComments: true, skipBlankLines: true }],

    // We should require a whitespace beginning a comment
    'spaced-comment': [
      'error',
      'always',
      {
        line: {
          // this lets us use triple-slash directives
          markers: ['/'],
        },
        block: {
          // comments of the form /* ..... */ should always have whitespace before the closing `*/` marker...
          balanced: true,
          // ... unless they're jsdoc-style block comments, which end with `**/`
          exceptions: ['*'],
        },
      },
    ],

    // Disallow usage of bitwise operators - this makes it an opt in operation
    'no-bitwise': 'error',

    // Limit cyclomatic complexity
    complexity: 'error',

    // Make sure all expressions are used. Turn off on tests.
    'no-unused-expressions': 'error',

    // We shouldn't make assumptions about imports/exports being dereferenced.
    'import/namespace': 'off',

    // imports should be ordered.
    'import/order': ['error', { 'newlines-between': 'always' }],

    // Make sure for in loops check for properties
    'guard-for-in': 'error',

    // Make sure that we are returning in the callbacks passed into `.map`,
    // `.filter` and `.reduce`. If we are not, we should be using
    // `.forEach()` or an explicit for loop.
    'array-callback-return': ['error', { allowImplicit: true }],

    quotes: ['error', 'single', { avoidEscape: true }],

    // Remove uncessary usages of async await to prevent extra micro-tasks
    'no-return-await': 'error',
  },
};
