import * as React from 'react';
import * as PropTypes from 'prop-types';
import './Grid.less';
import cnCreate from 'utils/cn';
import { IGridColumn } from './GridColumn';

interface IProps {
    /** Horizontal alignment */
    hAlign?: 'right' | 'center' | 'between' | 'around';
    /** Vertical alignment */
    vAlign?: 'top' | 'bottom' | 'center' | 'baseline';
    /** Gutters left */
    guttersLeft?: 'large' | 'medium';
    /** Gutters bottom */
    guttersBottom?: 'large' | 'medium';
    /** Multi row */
    multiRow?: boolean;
    /** Custom class name */
    className?: string;
    children: Array<React.ReactElement<IGridColumn>>;
}

const cn = cnCreate('mfui-grid');
class Grid extends React.Component<IProps, {}> {
    static propTypes = {
        hAlign: PropTypes.oneOf(['right', 'center', 'between', 'around']),
        vAlign: PropTypes.oneOf(['top', 'bottom', 'center', 'baseline']),
        guttersLeft: PropTypes.oneOf(['large', 'medium']),
        guttersBottom: PropTypes.oneOf(['large', 'medium']),
        multiRow: PropTypes.bool,
        className: PropTypes.string,
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
