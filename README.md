# megafon-ui

MegaFon React UI components library.

[![Github Actions](https://github.com/MegafonWebLab/megafon-ui/workflows/megafon-ui%20CI/badge.svg)](https://github.com/MegafonWebLab/megafon-ui/actions)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Documentation can be found [here](https://ui.megafon.ru/intro).

## How to use

MegaFon components library consists of the following npm packages:

- ui-core
[![npm (scoped with tag)](https://img.shields.io/npm/v/@megafon/ui-core/latest?label=%40megafon%2Fui-core)](https://www.npmjs.com/package/@megafon/ui-core/v/latest)


- ui-shared
[![npm (scoped with tag)](https://img.shields.io/npm/v/@megafon/ui-shared/latest?label=%40megafon%2Fui-shared)](https://www.npmjs.com/package/@megafon/ui-shared/v/latest)


- ui-icons
[![npm (scoped with tag)](https://img.shields.io/npm/v/@megafon/ui-icons/latest?label=%40megafon%2Fui-icons)](https://www.npmjs.com/package/@megafon/ui-icons/v/latest)


- ui-helpers
[![npm (scoped with tag)](https://img.shields.io/npm/v/@megafon/ui-helpers/latest?label=%40megafon%2Fui-helpers)](https://www.npmjs.com/package/@megafon/ui-helpers/v/latest)

Install using commands:

```bash
npm install @megafon/ui-core
```
```bash
npm install @megafon/ui-shared
```
```bash
npm install @megafon/ui-icons
```
```bash
npm install @megafon/ui-helpers
```

UI components from `@megafon/ui-core` and `@megafon/ui-shared` packages require CSS custom properties available in
global scope.

Add import of those properties in your project:

```ts
import "@megafon/ui-core/styles/colors.css";
```

## Contributing

Follow [CONTRIBUTING.md](https://github.com/MegafonWebLab/megafon-ui/blob/master/CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](https://github.com/MegafonWebLab/megafon-ui/blob/master/CODE_OF_CONDUCT.md).
