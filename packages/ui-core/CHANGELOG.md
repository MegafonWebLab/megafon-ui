# Changelog

## Unreleased

## 1.7.1
- **Button**
    - add 'transparent-white' value to 'hoverColor' prop
    - add 'transparent-white' value to 'downColor' prop

## 1.7.0
- **RadioButton**
    - added new component
- **Select**
    - fix items type
- **Grid**
    - fix children type

## 1.6.0
- **Preloader**
    - added new component
- **Carousel**
    - fix touch events

## Release 1.5.2
- **build**
    - change typescript config for interoperability between CommonJS and ES modules
    - fix deep-equal import
    - fix enzyme adapter import
- **package.json**
    - replace babel config with tsconfig file in jest compile options

## Release 1.5.1
- **Carousel**
    - add onSwipe callback

## Release 1.5.0
- **cn**
    - add variability to add arguments
    - add alias `cnCreate` to root

## Release 1.4.1
- **Carousel**
    - update classes prop

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
    - edit styles according to guide
    - add `default` value for `marginAll` prop
- **Header**
    - edit styles according to guide

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
