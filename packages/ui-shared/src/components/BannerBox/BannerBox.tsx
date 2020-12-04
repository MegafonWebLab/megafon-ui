import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate, Banner } from '@megafon/ui-core';

export const NavTheme = {
    LIGHT: 'light',
    GREEN: 'green',
    DARK: 'dark',
} as const;

type NavThemeType = typeof NavTheme[keyof typeof NavTheme];

export interface IBannerBox {
    /** Прокрутка с зацикливанием */
    loop?: boolean;
    /** Автоматическая прокрутка */
    autoPlay?: boolean;
    /** Задержка автоматической прокрутки */
    autoPlayDelay?: number;
    /** Цветовая тема навигации */
    navTheme?: NavThemeType;
    /** Обработчик клика по стрелке "вперед" (должен быть обернут в useCallback) */
    onNextClick?: (index: number) => void;
    /** Обработчик клика по стрелке "назад" (должен быть обернут в useCallback) */
    onPrevClick?: (index: number) => void;
    /** Обработчик клика по точке навигации (должен быть обернут в useCallback) */
    onDotClick?: (index: number) => void;
    /** Обработчик смены слайда (должен быть обернут в useCallback) */
    onChange?: (index: number) => void;
}

const cn = cnCreate('mfui-beta-banner-box');
const BannerBox: React.FC<IBannerBox> = ({children, ...props }) => (
    <div className={cn()}>
        <Banner {...props}>{children}</Banner>
    </div>
);

BannerBox.propTypes = {
    loop: PropTypes.bool,
    autoPlay: PropTypes.bool,
    autoPlayDelay: PropTypes.number,
    navTheme: PropTypes.oneOf(Object.values(NavTheme)),
    onNextClick: PropTypes.func,
    onPrevClick: PropTypes.func,
    onDotClick: PropTypes.func,
    onChange: PropTypes.func,
};

export default BannerBox;
