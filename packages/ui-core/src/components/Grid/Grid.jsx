import * as React from 'react';
import * as PropTypes from 'prop-types';
import './Grid.less';
import cnCreate from 'utils/cn';

const cn = cnCreate('mfui-grid');
class Grid extends React.Component {
    static propTypes = {
        as: PropTypes.oneOf(['ul', 'ol']),
        hAlign: PropTypes.oneOf(['left', 'center', 'between', 'around']),
        vAlign: PropTypes.oneOf(['top', 'bottom', 'center', 'baseline']),
        guttersLeft: PropTypes.oneOf(['large', 'medium']),
        guttersBottom: PropTypes.oneOf(['large', 'medium']),
        className: PropTypes.string,
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.element,
        ]).isRequired,
    };

    static defaultProps = {
        multiRow: true,
    };

    render() {
        const { guttersLeft, guttersBottom, multiRow, hAlign, vAlign } = this.props;

        return (
            <div className={cn()}>
                <div
                    className={cn('container', {
                        'multi-row': multiRow,
                        'h-align': hAlign,
                        'v-align': vAlign,
                        'gutters-left': guttersLeft,
                        'gutters-bottom': guttersBottom,
                    })}>
                        {React.Children.map(children, child =>
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
