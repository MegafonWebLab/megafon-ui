declare namespace JSX {
    export type ComponentDefaultPropNames = "defaultProps";
}

declare module 'classnames';

declare module 'utils/cnCreate';

declare module '*.svg' {
    const content: any;
    export default content;
}

declare interface Window {
    DocumentTouch: any;
}
