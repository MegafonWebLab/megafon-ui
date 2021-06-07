type TGridSizeValues = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

export interface IBenefit {
    /** Заголовок бенефита */
    title?: string;
    /** Основной текст в бенефите */
    text?: string | React.ReactNode | React.ReactNode[];
    /** Иконка */
    icon: React.ReactNode;
}

export const IconPositionEnum = {
    LEFT_TOP: 'left-top',
    CENTER_TOP: 'center-top',
    LEFT_SIDE: 'left-side',
} as const;
export type IconPosition = typeof IconPositionEnum[keyof typeof IconPositionEnum];

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
