import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '@megafon/ui-helpers';
import { Grid, GridColumn } from '@megafon/ui-core';
import './TextBox.less';

export interface ITextBoxProps {
    /** Центрирование текста по горизонтали */
    textCenter?: boolean;
    /** Центрирование компонента по горизонтали при ограниченной ширине */
    centeringWithLimitedWidth?: boolean;
    /** Растягивание компонента на всю доступную ширину */
    isFullWidth?: boolean;
    /** Ссылка на корневой элемент */
    rootRef?: React.Ref<HTMLDivElement>;
    /** Дополнительный класс для корневого элемента */
    className?: string;
}

const cn = cnCreate('mfui-beta-text-box');
const TextBox: React.FC<ITextBoxProps> = ({
    textCenter = false,
    centeringWithLimitedWidth = false,
    isFullWidth = true,
    rootRef,
    className,
    children,
}) => {
    const renderTextBoxWithGrid = () => (
        <Grid hAlign={centeringWithLimitedWidth ? 'center' : 'left'}>
            <GridColumn wide="8" desktop="10" tablet="12" mobile="12">
                {children}
            </GridColumn>
        </Grid>
    );

    return (
        <div className={cn({ 'text-center': textCenter }, [className])} ref={rootRef}>
            {isFullWidth ? children : renderTextBoxWithGrid()}
        </div>
    );
};

TextBox.propTypes = {
    textCenter: PropTypes.bool,
    centeringWithLimitedWidth: PropTypes.bool,
    isFullWidth: PropTypes.bool,
    rootRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any]),
    ]),
    className: PropTypes.string,
};

export default TextBox;
