import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Grid, GridColumn, Accordion } from '@megafon/ui-core';
import { cnCreate } from '@megafon/ui-helpers';
import './AccordionBox.less';

type AccordionPropsType = React.ComponentProps<typeof Accordion>;

export interface IAccordionBox extends AccordionPropsType {
    /** Отключить ограничение ширины */
    isFullWidth?: boolean;
    /** Центрирование по горизонтали для расширения 1280+ */
    hCenterAlignWide?: boolean;
    /** Дополнительный класс для контейнера компонента */
    containerClassName?: string;
}

const cn = cnCreate('mfui-beta-accordion-box');
const AccordionBox: React.FC<IAccordionBox> = ({
    hCenterAlignWide = false,
    isFullWidth = false,
    containerClassName,
    ...restProps
}) => (
    <div className={cn([containerClassName])}>
        <Grid hAlign={hCenterAlignWide ? 'center' : 'left'}>
            <GridColumn wide={isFullWidth ? '12' : '8'} all="12">
                <Accordion {...restProps} />
            </GridColumn>
        </Grid>
    </div>
);

AccordionBox.propTypes = {
    dataAttrs: PropTypes.objectOf(PropTypes.string.isRequired),
    rootRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any]),
    ]),
    title: PropTypes.node.isRequired,
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
