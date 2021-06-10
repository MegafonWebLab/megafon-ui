const Color = {
    FRESH_ASPHALT: 'freshAsphalt',
    CLEAR_WHITE: 'clearWhite',
} as const;

export type ColorType = typeof Color[keyof typeof Color];

export default Color;
