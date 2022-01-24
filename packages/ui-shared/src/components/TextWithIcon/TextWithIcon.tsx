import * as React from 'react';
import { Header, Grid, GridColumn } from '@megafon/ui-core';
import { cnCreate, filterDataAttrs, IFilterDataAttrs } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import './TextWithIcon.less';

export interface IItem {
    /** Текст */
    text: string;
    /** Иконка */
    icon: React.ReactNode;
}

export interface ITextWithIconProps extends IFilterDataAttrs {
    /** Список строк с иконками */
    items: IItem[];
    /** Заголовок */
    title?: string;
    /** Ссылка на корневой элемент */
    rootRef?: React.Ref<HTMLDivElement>;
    /** Дополнительный класс для корневого элемента */
    className?: string;
}

const cn = cnCreate('mfui-text-with-icon');
const TextWithIcon: React.FC<ITextWithIconProps> = ({ items, title, rootRef, dataAttrs, className }) => (
    <div className={cn([className])} ref={rootRef} {...filterDataAttrs(dataAttrs)}>
        <Grid>
            <GridColumn {...{ mobile: '12', tablet: '7', desktop: '6', wide: '6' }}>
                {title && (
                    <Header className={cn('header')} as="h5">
                        {title}
                    </Header>
                )}
                {items.map(({ text, icon }, i) => (
                    <div className={cn('item')} key={i}>
                        <div className={cn('svg-icon')}>{icon}</div>
                        <div className={cn('text')}>{text}</div>
                    </div>
                ))}
            </GridColumn>
        </Grid>
    </div>
);

TextWithIcon.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            icon: PropTypes.node.isRequired,
        }).isRequired,
    ).isRequired,
    title: PropTypes.string,
    rootRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any]),
    ]),
    dataAttrs: PropTypes.objectOf(PropTypes.string.isRequired),
    className: PropTypes.string,
};

export default TextWithIcon;
