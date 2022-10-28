import * as React from 'react';
import { Grid, GridColumn, Accordion } from '@megafon/ui-core';
import { cnCreate } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import './AccordionBox.less';
import { getColumnConfig } from '../../helpers/getColumnConfig';

export interface IAccordionBox {
    /** Дополнительные data атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
        header?: {
            root: Record<string, string>;
        };
        collapse?: {
            root?: Record<string, string>;
            inner?: Record<string, string>;
        };
        titleWrap?: Record<string, string>;
        arrowUp?: Record<string, string>;
        arrowDown?: Record<string, string>;
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
const AccordionBox: React.FC<IAccordionBox> = ({ hCenterAlignWide = false, isFullWidth = false, ...restProps }) => (
    <div className={cn()}>
        <Grid hAlign={hCenterAlignWide ? 'center' : 'left'}>
            <GridColumn {...getColumnConfig(isFullWidth)}>
                <Accordion {...restProps} />
            </GridColumn>
        </Grid>
    </div>
);

AccordionBox.propTypes = {
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
        header: PropTypes.shape({
            root: PropTypes.objectOf(PropTypes.string.isRequired),
        }),
        collapse: PropTypes.shape({
            root: PropTypes.objectOf(PropTypes.string.isRequired),
            inner: PropTypes.objectOf(PropTypes.string.isRequired),
        }),
        titleWrap: PropTypes.objectOf(PropTypes.string.isRequired),
        arrowUp: PropTypes.objectOf(PropTypes.string.isRequired),
        arrowDown: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    rootRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any]),
    ]),
    title: PropTypes.string.isRequired,
    isFullWidth: PropTypes.bool,
    isOpened: PropTypes.bool,
    hCenterAlignWide: PropTypes.bool,
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
