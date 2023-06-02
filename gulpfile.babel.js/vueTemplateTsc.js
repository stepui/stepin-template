import { src, dest, series } from 'gulp';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import { BufferTransform } from './transform';

import ts from 'typescript';
import prettier from 'prettier';
import tsConfig from '../tsconfig.json';

tsConfig.compilerOptions.sourceMap = false;
tsConfig.compilerOptions.importsNotUsedAsValues = 'preserve';

/**
 * vue 文件代码格式化
 * @param {*} code
 * @returns
 */
const vueFormatter = () =>
  new BufferTransform((code) =>
    prettier.format(code, {
      trailingComma: 'es5',
      parser: 'vue',
      vueIndentScriptAndStyle: true,
      singleQuote: true,
    })
  );
/**
 * ts 文件代码格式化
 * @param {*} code
 * @returns
 */
const tsFormatter = () =>
  new BufferTransform((code) =>
    prettier.format(code, {
      trailingComma: 'es5',
      parser: 'typescript',
      singleQuote: true,
    })
  );

/** ts编译器 */
const tsToJs = (tsStrCode) => {
  const code = tsStrCode
    .replace(/defineEmits<[\s\S]*>\(\);/g, (match) =>
      match.replace(/'?([\w:]*)'?:\s*\[.*\];/g, "'$1',").replace(/\(e:\s*(\'[^',]*\')[^;]*;/g, '$1,')
    )
    .replace(/<{([^\{\}<>]*)}>\(\)/g, '([$1])');
  const result = ts.transpileModule(code, tsConfig);
  const jsStrCode = result.outputText;
  return jsStrCode;
};

/**
 * SFC 文件 ts 代码编译
 * @param {*} tmpContent
 * @returns
 */
const handleTmpContent = (tmpContent) => {
  if (!tmpContent) {
    return tmpContent;
  }
  return tmpContent
    .replace(/(?<=((@|:|v-)[\w\-]*="))([^"]*)(?=")/g, function (match) {
      if (/\s*{[\s\S]*}\s*/.test(match)) {
        return tsToJs(`const patch = ${match}`).replace(/;\s*/g, '').replace('const patch = ', '');
      }
      return `${tsToJs(match).replace(/;\s*/g, '')}`;
    })
    .replace(/(?<=({{))([^{}]*)(?=}})/g, function (match) {
      if (/\s*{[\s\S]*}\s*/.test(match)) {
        return tsToJs(`const patch = ${match}`).replace(/;\s*/g, '').replace('const patch = ', '');
      }
      return `${tsToJs(match).replace(/;\s*$/, '')}`;
    });
};

function transformVue(options) {
  return new BufferTransform((content) =>
    content
      .replace(/(?<=(\<template>))([\s\S]*)(?=(\<\/template>))/, function (match) {
        return handleTmpContent(match);
      })
      .replace(/(?<=(\<script lang="ts".*>))([\s\S]*)(?=(\<\/script>))/, (match) => tsToJs(match))
      .replace(/lang="ts"/, '')
  );
}

function cleanTypeImport() {
  const types = [
    'MenuProps',
    'GuiderOption',
    'IconSelectGroup',
    'IconSelectOption',
    'PropType',
    'EChartsType',
    'Color',
    'FormInstance',
    'PaginationProps',
    'Dayjs',
    'Ref',
    'TreeSelectProps',
    'ComponentPublicInstance',
  ];
  const typeImportRegexp = new RegExp(
    '(?<=(import\\s+[\\w,\\s]*{[^{]*[,\\s]+))(' + types.join('|') + '),?(?=([^}]*\\s*}\\s*from))',
    'g'
  );
  return new BufferTransform((content) =>
    content
      .replace(/import\s+{\s*Response\s*}\s+from\s+\'.*\';?/g, '')
      .replace(typeImportRegexp, '')
      .replace(/import\s+.*from\s+\'.*\/interface(.d.ts)?\';?/g, '')
      .replace(/import\s+{\s*}\s*from\s+\'.*\'/g, '')
  );
}

function transformTs() {
  return new BufferTransform((content) => tsToJs(content));
}

function tsc() {
  tsConfig.compilerOptions.importsNotUsedAsValues = 'preserve';
  tsConfig.compilerOptions.preserveValueImports = true;
  return src(['./src/**/*.vue'])
    .pipe(transformVue())
    .pipe(cleanTypeImport())
    .pipe(vueFormatter())
    .pipe(dest('./target/src'));
}

function tsTsc() {
  tsConfig.compilerOptions.importsNotUsedAsValues = 'remove';
  tsConfig.compilerOptions.preserveValueImports = false;
  return src(['./src/**/*.ts', '!./src/**/*.d.ts'])
    .pipe(transformTs())
    .pipe(replace('{ts,vue,tsx}', '{js,vue}'))
    .pipe(replace('(js|ts|tsx|vue)', '(js|jsx|vue)'))
    .pipe(cleanTypeImport())
    .pipe(tsFormatter())
    .pipe(rename((path) => (path.extname = '.js')))
    .pipe(dest('./target/src'));
}

function compileViteConfig() {
  return src(['./vite.config.ts'])
    .pipe(transformTs())
    .pipe(tsFormatter())
    .pipe(rename((path) => (path.extname = '.js')))
    .pipe(dest('./target'));
}

export default series(tsc, tsTsc, compileViteConfig);
