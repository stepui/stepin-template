import { series, src, dest } from 'gulp';
import clean from 'gulp-clean';
import replace from 'gulp-replace';
import vueTsc from './vueTemplateTsc';

export { default as tsc } from './vueTemplateTsc';

function cleanAll() {
  return src(['./target/*', '!./target/node_modules'], { allowEmpty: true }).pipe(clean({ force: true }));
}

function copyIndex() {
  return src(['./index.html']).pipe(replace('.ts', '.js')).pipe(replace(' + TS', '')).pipe(dest('./target'));
}

function copyPublic() {
  return src(['./public/**/*']).pipe(dest('./target/public'));
}

function copyStyleAndJs() {
  return src(['./src/**/*.{less,css,js}']).pipe(dest('./target/src'));
}

function copyAssets() {
  return src(['./src/assets/**/*']).pipe(dest('./target/src/assets'));
}

function copyConfig() {
  return src([
    './.env*',
    './.gitignore',
    '.babelrc',
    './*.{json,cjs}',
    './LICENSE',
    '!./tsconfig.*',
    '!./package*.json',
  ]).pipe(dest('./target'));
}

function copyReadme() {
  return src(['./*.md']).pipe(replace('stepin-template.git', 'stepin-template-js.git')).pipe(dest('./target'));
}

function copyPackageJson() {
  return src(['./package.json'])
    .pipe(replace(/,?[\r\n]+.*"(gulp[\-\w]*|vue-tsc|typescript)"[^,\r\n]*/g, ''))
    .pipe(replace(/vue-tsc --noEmit && /g, ''))
    .pipe(dest('./target'));
}
function cleanJsRepository() {
  return src([
    '../stepin-template-js/*',
    '!../stepin-template-js/node_modules',
    '!../stepin-template-js/.git',
    '!../stepin-template-js/.history',
    '!../stepin-template-js/.vscode',
  ]).pipe(clean({ force: true }));
}
export function copyToJsRepository() {
  return src([
    './target/**/*',
    './.env*',
    './.gitignore',
    '.babelrc',
    '!./target/node_modules/**/*',
    '!./target/node_modules',
  ]).pipe(dest('../stepin-template-js'));
}

export function copyDocs() {
  return src(['./docs/**/*', '!./docs/.vitepress/**/*', '!./docs/.vitepress']).pipe(dest('../stepin-template-js/docs'));
}

export const makeJs = series(cleanJsRepository, copyToJsRepository, copyDocs);

export default series(
  cleanAll,
  vueTsc,
  copyIndex,
  copyPublic,
  copyStyleAndJs,
  copyConfig,
  copyReadme,
  copyAssets,
  copyPackageJson
);
