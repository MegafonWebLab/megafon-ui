type TGridSizeValues = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

export interface IBenefit {
    title?: string;
    text?: string;
    icon: React.ReactNode;
}

export enum IconPositionEnum {
    LEFT_TOP = 'left-top',
    CENTER_TOP = 'center-top',
    LEFT_SIDE = 'left-side',
}

export type GridConfig = {
    wide?: TGridSizeValues;
    desktop?: TGridSizeValues;
    tablet?: TGridSizeValues;
    leftOffsetWide?: TGridSizeValues;
    leftOffsetDesktop?: TGridSizeValues;
    leftOffsetTablet?: TGridSizeValues;
    rightOffsetDesktop?: TGridSizeValues;
    rightOffsetTablet?: TGridSizeValues;
};
