import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate, Grid, GridColumn, Accordion } from '@megafon/ui-core';
import './AccordionBox.less';

export interface IAccordionBox {
    /** Заголовок аккордеона */
    title: string;
    /** Состояние аккордеона, заданное извне */
    isOpened?: boolean;
    /** Центрирование по горизонтали для расширения 1280+ */
    hCenterAlignWide?: boolean;
    /** Вертикальные отступы */
    hasVerticalPaddings?: boolean;
    /** Дополнительный класс для корнеовго элемента */
    className?: string;
    /** Дополнительные классы для корневого и внутренних элементов */
    classes?: {
        root?: string;
        collapse?: string;
    };
    /** Обработчик клика */
    onClickAccordion?: (isOpened: boolean, title: string) => void;
}

const cn = cnCreate('mfui-beta-accordion-box');
const AccordionBox: React.FC<IAccordionBox> = ({hCenterAlignWide = false, ...props }) => (
    <div className={cn()}>
        <Grid hAlign={hCenterAlignWide ? 'center' : 'left'}>
            <GridColumn wide="8">
                <Accordion {...props} />
            </GridColumn>
        </Grid>
    </div>
);

AccordionBox.propTypes = {
    title: PropTypes.string.isRequired,
    isOpened: PropTypes.bool,
    hCenterAlignWide: PropTypes.bool,
    hasVerticalPaddings: PropTypes.bool,
    className: PropTypes.string,
    classes: PropTypes.shape({
        root: PropTypes.string,
        collapse: PropTypes.string,
    }),
    onClickAccordion: PropTypes.func,
};

export default AccordionBox;
