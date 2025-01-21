import fsdImport from 'eslint-plugin-fsd-import';
import importPlugin from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import js from '@eslint/js';

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'public'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tseslint.plugin,
      import: importPlugin,
      'fsd-import': fsdImport,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // fsd 레이어 규칙(상위 레이어에서 하위 레이어로만 import 가능
      'fsd-import/layer-imports': [
        'error',
        {
          alias: '@',
          ignoreImportPatterns: [], // 규칙을 무시할 파일 패턴
        },
      ],
      // 각 모듈은 반드시 public API를 통해서만 import 해야 함
      // 내부 구현 파일로의 직접 import를 방지하여 캡슐화를 강화
      // 'fsd-import/public-api-imports': [
      //   'error',
      //   {
      //     alias: '@',
      //   },
      // ],
      'fsd-import/fsd-relative-path': [
        'error',
        {
          alias: '@',
        },
      ],

      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
        },
      ],
      'import/newline-after-import': [
        'error',
        {
          count: 1,
        },
      ],
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: 'const',
          next: 'return',
        },
      ],
    },
  },
);
