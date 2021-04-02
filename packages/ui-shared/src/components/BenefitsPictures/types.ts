export interface IBenefit {
    /** Заголовок бенефита */
    title: string;
    /** Основной текст в бенефите */
    text: string;
    /** Изображение */
    img: string;
}

type TGridSizeValues = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

export type GridConfig = {
    wide?: TGridSizeValues;
    desktop?: TGridSizeValues;
    tablet?: TGridSizeValues;
    leftOffsetWide?: TGridSizeValues;
    leftOffsetDesktop?: TGridSizeValues;
    leftOffsetTablet?: TGridSizeValues;
    rightOffsetDesktop?: TGridSizeValues;
    rightOffsetTablet?: TGridSizeValues;
    rightOffsetWide?: TGridSizeValues;
};

export type GridGutterSize = 'large' | 'medium';
