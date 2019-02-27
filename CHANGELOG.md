# Changelog

## Release 1.2.2
### Changed
- **components**
    - add prefix 'mfui' to class name of all components
- **Select.mdx**
    - fix variable name
- **icons**
    - update several icons

## Release 1.2.1
### Fixed
- **ProductCardTotal**
    - remove text overflow in IE10
- **ProductCardInfo**
    - remove text overflow in IE10
### Changed
- **ProductCardFeatures**
    - fix tests
- **ProductCardFeaturesTop**
    - fix tests
- **ProductCardFeaturesBottom**
    - fix tests
- **ProductCardTotal**
    - fix tests
- **package.json**
    - add jest run to pre-commit

## Release 1.2.0
### Changed
- **icons**
    - major update
- **ProductCardFeatures**
    - remove socialIcons prop
    - add icons output from firstParam.children prop
    - replace prop firstParam.value with firstParam.title
    - remove value from secondParam prop
- **.travis.yml**
    - remove yarn from cache settings
- **README.md**
    - remove yarn from instructions
- **package.json**
    - replace yarn scripts with npm
- **index.mdx**
    - remove yarn from instructions
- **package-lock.json**
    - synchronize with package.json
- **.gitignore**
    - remove -yarn-error.log
### Removed
- **yarn.lock**

## Release 1.1.5
### Changed
- **gulpfile**
    - rewrite paths in css to dist icon
- **ProductCardInfo**
    - change svg icon path

## Release 1.1.4
### Changed
- **ProductCardFeatures**
    - divide showcaseParams prop into firstParam and secondParam
- **package.json**
    - add script jest updateSnapshot
### Fixed
- **ProductCardFeatures**
    - remove text overflow in IE10

## Release 1.1.2
### Changed
- **icons/Basic/24/Hide_24.svg**
    - remove clipPath tags
- **Icons:**
    - move not guide icons to folder docIcons
- **gulpfile:**
    - remove masks in svg icons
- **README:**
    - add info about svg's modified
## Release 1.1.1
### Changed
- **Icons:**
    - import string
- **gulpfile:**
    - JSX icons support custom id
## Release 1.1.0
### Changed
- **gulpfile:**
    - refactor
### Added
- **Icons:**
    - icons to project
    - view all icons in docz

## Release 1.0.15
### Changed
- **Select:**
    - added prop to hide/show select arrow
    - added class property for controls block
- **Button:**
    - added class property for button text

## Release 1.0.14
### Changed
- **gulpfile:**
    - use babel-env for es files

## Release 1.0.13
### Changed
- **Link:**
    - remove default props

## Release 1.0.12
### Changed
- **Select:**
    - optimize ref callback

### Added
- **DropdownSocialList:**
    - `className` support for custom class
- **ListItem:**
    - `className` support for custom class
- **List:**
    - `className` support for custom class
- **Logo:**
    - `className` support for custom class
- **Textarea:**
    - `className` support for custom class
- **TextField:**
    - `className` support for custom class
    - `noticeText` render html string
- **Select:**
    - `className` support for custom class

## Release 1.0.11
### Changed
- **Select:**
    - click on search field - fixed bug in ios
- **ProductCardInfo:**
    - add styles to svg icon
    - `description` - can be `string` or `JSX.Element`
- **ProductCardTotal:**
    - `payment` is not required
    - `payment.value` - can be `string` or `number`
    - `handleSubmit` renamed to `onSubmit`
- **ProductCardWrapper:**
    - each child in `border` prop can be `boolean` or `'sky'`

### Added
- **ProductCardInfo:**
    - support for custom classes
    - `onClickMoreInfo` prop callback to click on 'description-more' link
    - `additionalParams` default prop
- **ProductCardFeatures:**
    - support for custom classes
- **ProductCardTotal:**
    - support for custom classes
    - When "Submit" button is not rendered and onClickMore or moreLink is received, "More" button is rendered instead.
    - "Connect" button is rendered when `onClickConnect` received
    - props for buttons: `submitLink`, `moreText`, `moreLink`, `connectText`, `onClickMore`, `onClickConnect`
- **ProductCardWrapper:**
    - support for custom classes
    - prop `theme` that adds default styles to children components
