import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate, Grid, GridColumn, Accordion } from '@megafon/ui-core';

interface IAccordionClasses {
    root?: string;
    collapse?: string;
}

export interface IAccordionBox {
    /** Заголовок аккордеона */
    title: string;
    /** Состояние аккордеона заданное извне */
    isOpened?: boolean;
    /** Внешние классы для аккордеона и внутренних компонентов */
    classes?: IAccordionClasses;
    /** Обработчик клика */
    onClickAccordion?: (isOpened: boolean, title: string) => void;
    /** Центрирование по горизонтали для расширения 1280+ */
    hCenterAlignWide?: boolean;
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
    classes: PropTypes.shape({
        root: PropTypes.string,
        collapse: PropTypes.string,
    }),
    onClickAccordion: PropTypes.func,
    hCenterAlignWide: PropTypes.bool,
};

export default AccordionBox;
