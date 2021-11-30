import * as React from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import { IGridColumn } from './GridColumn';
import './Grid.less';

export interface IGridProps {
    /** Выравнивание всех колонок по горизонтали */
    hAlign?: 'left' | 'right' | 'center' | 'between' | 'around';
    /** Выравнивание всех колонок по вертикали */
    vAlign?: 'top' | 'bottom' | 'center' | 'baseline';
    /** Отступ слева от колонки */
    guttersLeft?: 'large' | 'medium';
    /** Отступ снизу от колонки */
    guttersBottom?: 'large' | 'medium';
    /** Перенос столбцов в несколько строк */
    multiRow?: boolean;
    /** Дополнительный класс корневого элемента */
    className?: string;
    children: Array<React.ReactElement<IGridColumn>> | React.ReactElement<IGridColumn>;
}

const cn = cnCreate('mfui-grid');
const Grid: React.FC<IGridProps> = ({
    children,
    guttersLeft,
    guttersBottom,
    multiRow = true,
    hAlign,
    vAlign,
    className,
}) => (
    <div className={cn([className])}>
        <div
            className={cn('container', {
                'multi-row': multiRow,
                'h-align': hAlign,
                'v-align': vAlign,
                'gutters-left': guttersLeft,
                'gutters-bottom': guttersBottom,
            })}
        >
            {React.Children.map(children, (child: React.ReactElement<IGridColumn>) =>
                React.cloneElement(child, {
                    className: cn(
                        'column',
                        {
                            'gutter-left': guttersLeft,
                            'gutter-bottom': guttersBottom,
                        },
                        child.props.className,
                    ),
                }),
            )}
        </div>
    </div>
);

Grid.propTypes = {
    hAlign: PropTypes.oneOf(['left', 'right', 'center', 'between', 'around']),
    vAlign: PropTypes.oneOf(['top', 'bottom', 'center', 'baseline']),
    guttersLeft: PropTypes.oneOf(['large', 'medium']),
    guttersBottom: PropTypes.oneOf(['large', 'medium']),
    multiRow: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element.isRequired), PropTypes.element.isRequired])
        .isRequired,
};

export default Grid;
