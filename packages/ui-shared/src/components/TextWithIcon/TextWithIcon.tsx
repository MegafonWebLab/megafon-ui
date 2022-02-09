import * as React from 'react';
import { Header, Grid, GridColumn } from '@megafon/ui-core';
import { cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import { ITextWithIconItem } from './TextWithIconItem';
import './TextWithIcon.less';

export interface ITextWithIconProps {
    /** Заголовок */
    title?: string;
    /** Ссылка на корневой элемент */
    rootRef?: React.Ref<HTMLDivElement>;
    /** Дополнительные data атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
    };
    /** Дополнительный класс для корневого элемента */
    className?: string;
    /** Допустимый дочерний компонент */
    children: React.ReactElement<ITextWithIconItem>[] | React.ReactElement<ITextWithIconItem>;
}

const cn = cnCreate('mfui-text-with-icon');
const TextWithIcon: React.FC<ITextWithIconProps> = ({ title, rootRef, dataAttrs, className, children }) => (
    <div className={cn([className])} ref={rootRef} {...filterDataAttrs(dataAttrs?.root)}>
        <Grid>
            <GridColumn {...{ mobile: '12', tablet: '7', desktop: '6', wide: '6' }}>
                {title && (
                    <Header className={cn('header')} as="h5">
                        {title}
                    </Header>
                )}
                {children}
            </GridColumn>
        </Grid>
    </div>
);

TextWithIcon.propTypes = {
    title: PropTypes.string,
    rootRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any]),
    ]),
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element.isRequired), PropTypes.element.isRequired])
        .isRequired,
    className: PropTypes.string,
};

export default TextWithIcon;
