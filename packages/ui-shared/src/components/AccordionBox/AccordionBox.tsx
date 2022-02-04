import * as React from 'react';
import { Grid, GridColumn, Accordion } from '@megafon/ui-core';
import { cnCreate } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import './AccordionBox.less';

export interface IAccordionBox {
    /** Дополнительные data атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
    };
    /** Ссылка на корневой элемент */
    rootRef?: React.Ref<HTMLDivElement>;
    /** Заголовок аккордеона */
    title: string;
    /** Состояние аккордеона, заданное извне */
    isOpened?: boolean;
    /** Отключить ограничение ширины */
    isFullWidth?: boolean;
    /** Центрирование по горизонтали для расширения 1280+ */
    hCenterAlignWide?: boolean;
    /** Вертикальные отступы */
    hasVerticalPaddings?: boolean;
    /** Дополнительный класс для корнеовго элемента */
    className?: string;
    /** Дополнительные классы для корневого и внутренних элементов */
    classes?: {
        openedClass?: string;
        root?: string;
        collapse?: string;
        titleWrap?: string;
    };
    /** Обработчик клика */
    onClickAccordion?: (isOpened: boolean) => void;
}

const cn = cnCreate('mfui-accordion-box');
const AccordionBox: React.FC<IAccordionBox> = ({ hCenterAlignWide = false, isFullWidth = false, ...restProps }) => {
    const renderAccordionWithGrid = React.useCallback(
        () => (
            <div className={cn()}>
                <Grid hAlign={hCenterAlignWide ? 'center' : 'left'}>
                    <GridColumn wide="8">
                        <Accordion {...restProps} />
                    </GridColumn>
                </Grid>
            </div>
        ),
        [restProps, hCenterAlignWide],
    );

    return isFullWidth ? <Accordion {...restProps} /> : renderAccordionWithGrid();
};

AccordionBox.propTypes = {
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    rootRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any]),
    ]),
    title: PropTypes.string.isRequired,
    isFullWidth: PropTypes.bool,
    isOpened: PropTypes.bool,
    hCenterAlignWide: PropTypes.bool,
    hasVerticalPaddings: PropTypes.bool,
    className: PropTypes.string,
    classes: PropTypes.shape({
        openedClass: PropTypes.string,
        root: PropTypes.string,
        collapse: PropTypes.string,
        titleWrap: PropTypes.string,
    }),
    onClickAccordion: PropTypes.func,
};

export default AccordionBox;
