# @megafon/ui-helpers

Helpers library

## Installation

with npm
```bash
npm install --save @megafon/ui-helpers
```

or yarn
```bash
yarn add @megafon/ui-helpers
```

## Usage

---
### cnCreate
BEM generator

```js
import { cnCreate } from '@megafon/ui-helpers';

const cn = cnCreate('block');

cn();
// block

cn('element');
// block__element

cn({ mod: true });
// block block_mod

cn({ mod: 'value' });
// block block_mod_value

cn(['custom-class', 'custom-class-2']);
// block custom-class custom-class-2

cn('element', ['custom-class', 'custom-class-2']);
// block__element custom-class custom-class-2

cn('element', { mod: true }, ['custom-class', 'custom-class-2']);
// block__element block__element_mod custom-class custom-class-2
```

---
### convert
htmr library extension for replacing html tags with your own components, recognizing
components props and html attributes

requires React as dependency

```tsx
import React from 'react';
import { convert, ConvertTransformConfig } from '@megafon/ui-helpers';

const Link = ({ href, target, className, children }) => (
    <a className={className} href={href} target={target}>{children}</a>
);

const config: ConvertTransformConfig = {
    a: {
        component: Link,
        props: ['href', 'target'],
        customProps: { className: 'class-name' },
    },
};

convert('<a href="/test" target="_blank">link</a>', config);
// <Link className="class-name" href="/test" target="_blank">link</Link>'
```
---

### filterDataAttrs
Filters properties using regular expression /^data-/

```ts
import { filterDataAttrs, IFilterDataAttrs } from '@megafon/ui-helpers';

filterDataAttrs({
    'data-attr': 'value',
    'data-custom-attr': 'value',
    'DataAttr': 'value',
    'attr-data': 'value'
});
// { 'data-attr': 'value', 'data-custom-attr': 'value' }
```
---

### detectTouch
Detects touch devices

```js
import { detectTouch } from '@megafon/ui-helpers';

detectTouch()
// returns `true` or `false` depending on device

```
---
