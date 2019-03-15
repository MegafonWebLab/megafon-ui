# Changelog

## Release 1.3.0-beta.20
### Changed
- **ProductTileRest**
    - added validation for buyable prop and button color depending on it

## Release 1.3.0-beta.19
### Changed
- **ProductTile**
    - add hashtag to description link
- **ProductTileStatic**
    - add title value to key attribute

## Release 1.3.0-beta.18
### Changed
- **ProductTile**
    - add default switcher position
    - add title to packs
- **ProductTileStatic**
    - add title to packs
- **ProductTileRest**
    - add title to packs
- **ProductTileDynamic**
    - add default switcher position

## Release 1.3.0-beta.17
### Changed
- **ProductTile**
    - fix service pack unit
    - state refactor

## Release 1.3.0-beta.16
### Changed
- **ProductTile**
    - add target blank for links
- **ProductTileBuy**
    - add target blank for links
- **ProductTileRest**
    - add target blank for links

## Release 1.3.0-beta.15
### Changed
- **ProductTile**
    - rework moreLink, buyButton and connectButton
- **ProductTileBuy**
    - rework buyButton and connectButton
- **ProductTileRest**
    - rework moreLink, buyButton and connectButton

## Release 1.3.0-beta.14
### Changed
- **Carousel**
    - changed slide flex basis to auto
    - removed outline on focus of all div containers in slide
- **ProductTileRest**
    - added fixed width to image in messengers list
- **ProductTile**
    - added flex parameters to tile

## Release 1.3.0-beta.13
### Changed
- **ProductTileHint**
    - changed top position of hint on tablet resolution
- **ProductTileBuy**
    - added no margin mod for buy button
- **ProductTile**
    - added minimal height of title on different resolutions

## Release 1.3.0-beta.12
### Changed
- **Carousel**
    - changed slide wrapper flex grow to 0
    - replaced right slide padding into margin
    - increased arrows z-index
- **ProductTileRest**
    - changed default width to 100%

## Release 1.3.0-beta.11
### Changed
- **ProductTileValue**
    - fix animation delay
- **ProductTileRest**
    - add showConnectButton props
    - add discount

## Release 1.3.0-beta.10
### Changed
- **ProductTile**
    - add showConnectButton props
- **ProductTilePrice**
    - change output discount

## Release 1.3.0-beta.9
### Fixed
- **ProductTile**
    - edit styles for gray area
- **Carousel**
    - edit top padding in carousel

## Release 1.3.0-beta.8
### Changed
- **ProductTileRest**
    - replaced icons output into DropdownSocialList component

## Release 1.3.0-beta.7
### Added
- **ProductTileValue**
    - component to animate values
### Changedq
- **ProductTile**
    - add propTypes for handlers
- **ProductTileDynamic**
    - use ProductTileValue component for traffic and calls values
- **ProductTilePrice**
    - use ProductTileValue component for price value
- **ProductTileBuy**
    - hide button when href is missing
- **ProductTileRest**
    - fix packs variable names

## Release 1.3.0-beta.6
### Changed
- **Carousel**
    - edit styles for pagination
- **ProductTileHint**
    - add border for hint
- **ProductTile**
    - add shadow for hover
    - fix servicePacks buyLink
    - change secondParams value type
    - add link to title
- **ProductTileRest**
    - change secondParams value type
- **ProductTileOptions**
    - change options value type
- **TextLink**
    - add underline style
### Fixed
- **ProductTileBuy**
    - remove text overflow in IE10
- **ProductTileOptions**
    - remove text overflow in IE10

## Release 1.3.0-beta.5
### Changed
- **Carousel**
    - remove responsive props

## Release 1.3.0-beta.4
### Changed
- **Carousel**
    - fix items width on mobile
    - add responsive props
- **ProductTile**
    - fix align gray area
    - fix cashback display
    - add secondParamsHead props
- **ProductTileRest**
    - fix width
- **ProductTilePrice**
    - fix align gray area

## Release 1.3.0-beta.3
### Changed
- **Carousel**
    - change file resolution from jsx to tsx
- **CarouselArrow**
    - change file resolution from jsx to tsx
- **ProductTileRest**
    - change file resolution from jsx to tsx
- **ProductSwitcher**
    - fix range style

## Release 1.3.0-beta.2
### Fixed
- **ProductTile**
    - fix ts errors "is declared but its value is never read"

## Release 1.3.0-beta.1
### Fixed
- **docz**
    - fix build ignoring import order warnings

## Release 1.3.0-beta.0
### Added
- **components**
    - add new components: ProductTile, ProductTileRest, ProductSwitcher, Carousel

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
