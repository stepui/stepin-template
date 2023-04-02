import { src, dest, series } from 'gulp';
import { Transform } from 'stream';

import ts from 'typescript';
import prettier from 'prettier';
import tsConfig from '../tsconfig.json';

tsConfig.compilerOptions.sourceMap = false;
tsConfig.compilerOptions.importsNotUsedAsValues = 'preserve';
tsConfig.compilerOptions.preserveValueImports = true;

/** 代码格式化工具 */
const formatter = (code) =>
  prettier.format(code, {
    trailingComma: 'es5',
    parser: 'vue',
    vueIndentScriptAndStyle: true,
  });

const tsFormatter = (code) => prettier.format(code, { trailingComma: 'es5', parser: 'typescript' });

/** ts编译器 */
const tsToJs = (tsStrCode) => {
  const result = ts.transpileModule(tsStrCode, tsConfig);
  const jsStrCode = result.outputText;
  return jsStrCode;
};

/** template内js代码处理器 */
const handleTmpContent = (tmpContent) => {
  if (!tmpContent) {
    return tmpContent;
  }
  return tmpContent
    .replace(/(?<=((@|:|v-)[\w\-]*="))([^"]*)(?=")/g, function (match) {
      return `${tsToJs(match).replace(/;\s*/g, '')}`;
    })
    .replace(/(?<=({{))([^{}]*)(?=}})/g, function (match) {
      return `${tsToJs(match).replace(/;\s*$/, '')}`;
    });
};

function transformVue(options) {
  const transform = new Transform({
    objectMode: true,
    async transform(file, enc, callback) {
      if (file.isNull()) {
        return callback(null, file);
      }
      if (file.isBuffer()) {
        const content = new String(file.contents);
        file.contents = Buffer.from(
          formatter(
            content
              .replace(/(?<=(\<template>))([\s\S]*)(?=(\<\/template>))/, function (match) {
                return handleTmpContent(match);
              })
              .replace(/(?<=(\<script lang="ts" setup>))([\s\S]*)(?=(\<\/script>))/, (match) => tsToJs(match))
              .replace(/lang="ts"/, '')
          )
        );
      }
      if (file.isStream()) {
        console.log('stream file', file.path);
      }
      callback(null, file);
    },
  });
  return transform;
}

function transformTs() {
  const transform = new Transform({
    objectMode: true,
    async transform(file, enc, callback) {
      if (file.isNull()) {
        return callback(null, file);
      }
      if (file.isBuffer()) {
        const content = new String(file.contents);
        file.contents = Buffer.from(tsFormatter(tsToJs(content)));
      }
      if (file.isStream()) {
        console.log('stream file', file.path);
      }
      callback(null, file);
    },
  });
  return transform;
}

function tsc() {
  return src(['./src/**/*.vue']).pipe(transformVue()).pipe(dest('./target'));
}

function tsTsc() {
  return src(['./src/**/*.ts']).pipe(transformTs()).pipe(dest('./target'));
}

export default series(tsc, tsTsc);
