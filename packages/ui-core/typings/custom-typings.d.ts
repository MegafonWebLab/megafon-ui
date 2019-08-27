declare namespace JSX {
    export type ComponentDefaultPropNames = "defaultProps";
}

declare module 'classnames';

declare module 'prop-types';

declare module 'utils/cn';

declare module '*.svg' {
    const content: any;
    export default content;
}
