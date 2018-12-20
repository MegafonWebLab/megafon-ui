# Changelog

## Unrelease 1.1.3
### Changed
- **ProductCardFeatures**
    - devide showcaseParams prop into firstParam and secondParam
- **package.json**
    - add script jest updateSnapshot
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
