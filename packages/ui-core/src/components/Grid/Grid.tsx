import * as React from 'react';
import * as PropTypes from 'prop-types';
import './Grid.less';
import cnCreate from 'utils/cnCreate';
import { IGridColumn } from './GridColumn';

export interface IGridProps {
    /** Выравнивание всех колонн по горизонтали */
    hAlign?: 'left' | 'right' | 'center' | 'between' | 'around';
    /** Выравнивание всех колонн по вертикали */
    vAlign?: 'top' | 'bottom' | 'center' | 'baseline';
    /** Отступ слева от колонны */
    guttersLeft?: 'large' | 'medium';
    /** Отступ снизу от колонны */
    guttersBottom?: 'large' | 'medium';
    /** Перенос столбцов в несколько строк */
    multiRow?: boolean;
    children: Array<React.ReactElement<IGridColumn>> | React.ReactElement<IGridColumn>;
}

const cn = cnCreate('mfui-beta-grid');
class Grid extends React.Component<IGridProps> {
    static propTypes = {
        hAlign: PropTypes.oneOf(['left', 'right', 'center', 'between', 'around']),
        vAlign: PropTypes.oneOf(['top', 'bottom', 'center', 'baseline']),
        guttersLeft: PropTypes.oneOf(['large', 'medium']),
        guttersBottom: PropTypes.oneOf(['large', 'medium']),
        multiRow: PropTypes.bool,
        children: PropTypes.node,
    };

    static defaultProps = {
        multiRow: true,
    };

    render() {
        const { children, guttersLeft, guttersBottom, multiRow, hAlign, vAlign } = this.props;

        return (
            <div className={cn('')}>
                <div
                    className={cn('container', {
                        'multi-row': multiRow,
                        'h-align': hAlign,
                        'v-align': vAlign,
                        'gutters-left': guttersLeft,
                        'gutters-bottom': guttersBottom,
                    })}>
                    {React.Children.map(children, (child: React.ReactElement<IGridColumn>) =>
                        React.cloneElement(child, {
                            className: cn(
                                'column',
                                {
                                    'gutter-left': guttersLeft,
                                    'gutter-bottom': guttersBottom,
                                },
                                child.props.className
                            ),
                        })
                    )}
                </div>
            </div>
        );
    }
}

export default Grid;
