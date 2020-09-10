# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0-beta.6](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.5...@megafon/ui-core@2.0.0-beta.6) (2020-09-10)


### Bug Fixes

* export interfaces ([275c2e1](https://github.com/MegafonWebLab/megafon-ui/commit/275c2e1f94ea69f7a29e4b3590504dd2def32ac1))





# [2.0.0-beta.5](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.4...@megafon/ui-core@2.0.0-beta.5) (2020-09-09)


### Bug Fixes

* **textfield:** fix Verification type ([2911a94](https://github.com/MegafonWebLab/megafon-ui/commit/2911a9447126a3d24206a995e456884badfac7d6))





# [2.0.0-beta.4](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.3...@megafon/ui-core@2.0.0-beta.4) (2020-09-07)


### Bug Fixes

* **select:** add data attrs prop ([554a173](https://github.com/MegafonWebLab/megafon-ui/commit/554a17388009f52a335273729343b938d952848a))





# [2.0.0-beta.3](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.2...@megafon/ui-core@2.0.0-beta.3) (2020-09-01)


### Bug Fixes

* add data attributes prop ([8f38c20](https://github.com/MegafonWebLab/megafon-ui/commit/8f38c2045f9bf7c4829946edf2071be6fe6a07df))





# [2.0.0-beta.2](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.1...@megafon/ui-core@2.0.0-beta.2) (2020-08-31)


### Bug Fixes

* **textfield:** new prop classes ([d66340f](https://github.com/MegafonWebLab/megafon-ui/commit/d66340fbb4f1242b61e988c566efccc75ac066ca))





# [2.0.0-beta.1](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.0...@megafon/ui-core@2.0.0-beta.1) (2020-08-27)


### Bug Fixes

* **textfield:** fix placeholder in ie ([603bf8f](https://github.com/MegafonWebLab/megafon-ui/commit/603bf8f14e5cee27c6fcca6ac28bb696d5ee54c4))





# [2.0.0-beta.0](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@1.4.0...@megafon/ui-core@2.0.0-beta.0) (2020-08-26)

### BREAKING CHANGES

- **styles:**
    - changed classname prefix for beta
- **Notification**
    - added new component
- **Carousel**
    - removed touchStart and touchMove events
    - removed touch-action for slick-list
    - added pinch-zoom touch action for slick-track
    - fixed bug with first click on
    item after swipe
- **List**
    - added list-style rules
- **Colors**
    - added documentation for guide colors
    - deleted Mandarin color, added border only for white color
- **BubbleHint**
    - synchronized colors according to the guide
- **Button**
    - synchronized colors according to the guide
- **CarouselArrow**
    - synchronized colors according to the guide
- **Checkbox**
    - synchronized colors according to the guide
- **DropdownSocialList**
    - synchronized colors according to the guide
- **Select**
    - added new functional
    - synchronized colors according to the guide
- **SelectItem**
    - added new functional
    - synchronized colors according to the guide
- **TextField**
    - synchronized colors according to the guide
    - add focus in input after click on clear icon
    - add vertical resize to textarea
    - fix password placeholder
    - update documentation
    - fixed placeholder for ie11
- **TextLink**
    - synchronized colors according to the guide
- **Icons**
    - synchronized colors according to the guide
- **ProductCardInfo**
    - synchronized colors according to the guide
- **ProductCardTotal**
    - synchronized colors according to the guide
- **ProductCardWrapper**
    - synchronized colors according to the guide
- **ProductCardSwitcher**
    - synchronized colors according to the guide
- **ProductCardTile**
    - synchronized colors according to the guide
- **ProductCardTileCashback**
    - synchronized colors according to the guide
- **ProductCardTileHint**
    - synchronized colors according to the guide
- **ProductCardTileOptions**
    - synchronized colors according to the guide
- **ProductCardTileRest**
    - synchronized colors according to the guide
- **RadioButton**
    - added new component
- **Counter**
    - added new component
    - synchronized colors according to the guide
- **Preloader**
    - added new component
    - fixed tslint errors
- **Header**
    - correct header css for style guide, delete h6 props
    - updated documentation
    - synchronized colors according to the guide
    - add hAlign prop width default value 'inherit'
    - fix children type
- **cn**
    - add variability to add arguments
    - rename `cn` to `cnCreate`
    - allow use undefined in array of custom classes
    - fix bug with extra space for empty string in array of custom classes
- **Switcher**
    - added new component
    - added examples and description in .mdx
    - added tests
    - synchronized colors according to the guide
- **Carousel**
    - add onSwipe callback
    - fix touch events
    - synchronized colors according to the guide
- **ContentArea**
    - add basic colors for `outerBackgroundColor` and `innerBackgroundColor`
    - changed the parameter name from `lg` in the `innerPadding` property to `default`
    - synchronized colors according to the guide
- **Accordion**
    - add Accordion component
    - fixed title style, text padding, border-bottom in opened accordion
- **Paragraph**
    - update with a new guide
    - update test
    - add inherit color
- **Grid**
    - fix children type
    - add left to hAlight prop
- **GridColumn**
    - fix children type
    - rename offset props to leftOffset
    - add rightOffset props

## Release 1.4.1
- **Carousel**
    - update classes prop
- **Checkbox**
    - checkbox with small label taken out as a separate example

## Release 1.4.0
- **Button**
    - add font-color for hover button type
- **GridColumn**
    - add offset props
- **ContentArea**
    - `mobileInnerPadding` and `className` properties added
- **Paragraph**
    - line-height in mixin for small font fixed according to the guide

## Release 1.3.4
- **Carousel**
    - add classes props for flexible styling of the component

## Release 1.3.3
- **Carousel**
    - remove margin beetween slides in landing theme

## Release 1.3.2
- **Carousel**
    - fix slick slide padding for lk themed carousel

## Release 1.3.1
- **Carousel**
    - added top and bottom padding for overflow slide content

## Release 1.3.0
- **GridColumn**
    - add `order` property for all screens

## Release 1.2.0
- **Carousel**
    - `hasPaddingBetweenSlides` property added (zero padding between slides)
    - fix showcase slider padding

## Release 1.1.0
- **Carousel**
    - new prop `onBeforeChange` added

## Release 1.0.21
- **GridColumn**
    - add box-sizing: border-box in less
    - fix gutters width and height for mobile devices
- **Button**
    - fixed disabled state for tag a (block onClick calls, cancel following link, change color)
    - fixed display target attribute for tag button
    - fixed display type attribute for tag a
    - added tests
    - added usage example for disabled, href, target

## Release 1.0.20
- **Icons**
    - update basic icons

## Release 1.0.19
- **package.json**
    - updated version, publish patch fix

## Release 1.0.18
- **Carousel**
    - fix slick-track height for "lk" theme
    - fix slick-list height for "lk" theme

## Release 1.0.17
- **Carousel**
    - new theme `lk` created

## Release 1.0.16
- **Select**
    - import fix
- **Textarea**
    - import fix
- **TextField**
    - import fix
- **InputLabel**
    - import fix

## Release 1.0.15
- **Carousel**
    - fix slick-track `z-index`
    - `overflow: hidden` added for slick-list

## Release 1.0.14
- **Select**
    - `label` and `onCustomIconClick` props added
- **Textarea**
    - `label` prop added
- **TextField**
    - `label` prop added
- **InputLabel**
    - component added

## Release 1.0.13
- **Checkbox**
    - added new component
    - added examples and description in .mdx
    - added tests
    - replaced property size with fontSize
    - fix hover with touch events detector
- **detectTouch**
    - fixed return undefined
- **Select**
    - fixed hover with touch events detector
- **Textarea**
    - fixed hover with touch events detector
- **TextField**
    - fixed hover with touch events detector
- **package.json**
    - updated deep-equal module

## Release 1.0.12
- **Paragraph**
    - edit styles according to the guide
    - add `default` value for `marginAll` prop
- **Header**
    - edit styles according to the guide

## Release 1.0.11
- **Button**
    - few values of properties `passiveColor` and `disabledColor` was deprecated
    - new values for properties `passiveColor` and `disabledColor` was added

## Release 1.0.10
- **ContentArea**
    - fixed typing in test case file
- **Select**
    - fix hover with touch events detector
    - fixed examples
- **Textarea**
    - fix hover with touch events detector
- **TextField**
    - fix hover with touch events detector
    - fixed and added examples
    - fixed password type component
    - removed clear and reveal icons for Edge

## Release 1.0.9
- **ContentArea**
    - added new component
    - added tests

## Release 1.0.8
- **Carousel**
    - fixed bug with lost position

## Release 1.0.7
- **Grid**
    - add examples and descriprion in .mdx
- **GridColumn**
    - change description for props
- **Select**
    - add disabled mod
- **TextField**
    - add styles and icon for input type="password"
- **BubbleHint**
    - changed styles in accordance with the requirements of the guide

## Release 1.0.6
- **Grid**
    - add examples in .mdx
    - fixed value for prop 'hAlign'
    - added tests
- **GridColumn**
    - fixed types for props
    - added tests

## Release 1.0.5
- **GridColumn**
    - fixed empty array for prop 'wide'

## Release 1.0.4
- **Carousel**
    - fix 'pointer-events' for disabled arrow

## Release 1.0.3
- **Grid**
    - add new component
    - add typescript
- **GridColumn**
    - add new component
    - add typescript

## Release 1.0.2
- **Carousel**
    - fix bottom padding in less
