import * as React from 'react';
import { Header, Paragraph, Grid, GridColumn } from '@megafon/ui-core';
import { cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import './TitleDescriptionBox.less';

export interface ITitleDescriptionBoxProps {
    /** Дата атрибуты для корневого элемента */
    dataAttrs?: { [key: string]: string };
    /** Ссылка на корневой элемент */
    rootRef?: React.Ref<HTMLDivElement>;
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Заголовок */
    title?: string | React.ReactNode[] | React.ReactNode;
    /** Описание */
    description?: string | React.ReactNode[] | React.ReactNode;
    /** Цвет текста */
    textColor?: 'white';
    /** Горизонтальное выравнивание */
    hAlign?: 'center';
}

const cn = cnCreate('mfui-title-description-box');
const TitleDescriptionBox: React.FC<ITitleDescriptionBoxProps> = ({
    dataAttrs,
    title,
    description,
    textColor,
    hAlign,
    rootRef,
    className,
}) => {
    const renderDescription = React.useCallback(() => {
        if (typeof description === 'string') {
            return (
                <Paragraph className={cn('item')} hasMargin={false} color="inherit">
                    {description}
                </Paragraph>
            );
        }

        return <div className={cn('description')}>{description}</div>;
    }, [description]);

    return (
        <div
            {...filterDataAttrs(dataAttrs)}
            className={cn({ 'h-align': hAlign, 'text-color': textColor }, className)}
            ref={rootRef}
        >
            <Grid hAlign={hAlign}>
                <GridColumn wide="8" desktop="10">
                    {title && (
                        <Header className={cn('item', { header: true })} as="h2" color="inherit">
                            {title}
                        </Header>
                    )}
                    {description && renderDescription()}
                </GridColumn>
            </Grid>
        </div>
    );
};

TitleDescriptionBox.propTypes = {
    dataAttrs: PropTypes.objectOf(PropTypes.string.isRequired),
    rootRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any]),
    ]),
    className: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.node)]),
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.node)]),
    hAlign: PropTypes.oneOf(['center']),
    textColor: PropTypes.oneOf(['white']),
};

export default TitleDescriptionBox;
