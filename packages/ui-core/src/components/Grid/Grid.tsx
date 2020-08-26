import * as React from 'react';
import * as PropTypes from 'prop-types';
import './Grid.less';
import cnCreate from 'utils/cnCreate';
import { IGridColumn } from './GridColumn';

interface IGridProps {
    /** Alignment of all columns by horizontal axis */
    hAlign?: 'left' | 'right' | 'center' | 'between' | 'around';
    /** Alignment of all columns by vertical axis */
    vAlign?: 'top' | 'bottom' | 'center' | 'baseline';
    /** Margin area on the left side of column */
    guttersLeft?: 'large' | 'medium';
    /** Margin area on the bottom side of column */
    guttersBottom?: 'large' | 'medium';
    /** Transfering of columns onto multiple lines */
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
