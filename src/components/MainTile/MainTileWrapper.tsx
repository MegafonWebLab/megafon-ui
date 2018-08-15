import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '../../utils/cn';
import './MainTileWrapper.less';

interface IMainTileWrapperProps {
    /** Hint from left */
    hint?: {
        title: string;
        color: 'green' | 'orange' | 'black';
    };
    /** Show right border */
    IsBorderRight?: boolean;
    children: JSX.Element[] | Element[] | JSX.Element | Element;
}

const cn = cnCreate('main-tile-wrapper');
class MainTileWrapper extends React.Component<IMainTileWrapperProps, {}> {
    static propTypes = {
        hint: PropTypes.shape({
            title: PropTypes.string.isRequired,
            color: PropTypes.oneOf(['green', 'orange', 'black']).isRequired,
        }),
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.element,
            PropTypes.node,
        ]),
    };

    static defaultProps: Partial<IMainTileWrapperProps> = {
        IsBorderRight: true,
    };

    handleClick = e => e.target.tagName !== 'A';

    renderHintLabel() {
        return (
            <div className={cn('hint-box')}>
                <div className={cn('hint-text')}>{this.props.hint!.title}</div>
            </div>
        );
    }

    render() {
        const { hint, IsBorderRight } = this.props;

        return (
            <div
                className={cn('', {
                    hint: !!hint ? hint.color : false,
                    'br-no': !IsBorderRight,
                })}
                onClick={this.handleClick}
            >
                <div className={cn('inner')}>
                    {hint && this.renderHintLabel()}
                    <div className={cn('container')}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default MainTileWrapper;
