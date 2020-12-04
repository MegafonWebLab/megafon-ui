import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate, Carousel} from '@megafon/ui-core';

const NavTheme = {
    LIGHT: 'light',
    GREEN: 'green',
} as const;

declare type NavThemeType = typeof NavTheme[keyof typeof NavTheme];

export interface ICarouselBox {
    /** Сss класс для внешнего контейнера */
    className?: string;
    /** Сss класс для задания внутренних оступов */
    innerIndentsClass?: string;
    /** Смена слайдов с зацикливанием */
    loop?: boolean;
    /** Автомтическая прокрутка */
    autoPlay?: boolean;
    /** Задержка для авто прокрутки */
    autoPlayDelay?: number;
    /** Тема навигации */
    navTheme?: NavThemeType;
    /** Обработчик клика по стрелке вперед (должен быть обернут в useCallback) */
    onNextClick?: (index: number) => void;
    /** Обработчик клика по стрелке назад (должен быть обернут в useCallback) */
    onPrevClick?: (index: number) => void;
    /** Обработчик смены слайда (должен быть обернут в useCallback) */
    onChange?: (index: number) => void;
}

const cn = cnCreate('mfui-beta-carousel-block');
const CarouselBox: React.FC<ICarouselBox> = ({ children, ...props }) => (
    <div className={cn()}>
        <Carousel {...props}>
            {children}
        </Carousel>
    </div>
);

CarouselBox.propTypes = {
    className: PropTypes.string,
    innerIndentsClass: PropTypes.string,
    loop: PropTypes.bool,
    autoPlay: PropTypes.bool,
    autoPlayDelay: PropTypes.number,
    navTheme: PropTypes.oneOf(Object.values(NavTheme)),
    onNextClick: PropTypes.func,
    onPrevClick: PropTypes.func,
    onChange: PropTypes.func,
};

export default CarouselBox;
