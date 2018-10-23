# Changelog

## [Unreleased]
### Changed
- **TextField:**
    - `noticeText` render html string
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
