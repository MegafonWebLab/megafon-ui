type TGridSizeValues = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

export type ColumnConfig = {
    wide?: TGridSizeValues;
    desktop?: TGridSizeValues;
    tablet?: TGridSizeValues;
    mobile?: TGridSizeValues;
    all?: TGridSizeValues;
};
