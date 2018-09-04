import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '../../utils/cn';
import './ProductCardWrapper.less';

interface IProductCardWrapperProps {
    /** Hint from left */
    hint?: {
        title: string;
        color: 'green' | 'orange' | 'black';
    };
    /** Show right border */
    border?: Partial<{
        top: boolean;
        right: boolean;
        bottom: boolean;
        left: boolean;
    }>;
    children: JSX.Element[] | Element[] | JSX.Element | Element;
}

const cn = cnCreate('product-card-wrapper');
class ProductCardWrapper extends React.Component<IProductCardWrapperProps, {}> {
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

    static defaultProps: Partial<IProductCardWrapperProps> = {
        border: {
            right: true,
            left: true,
        },
    };

    handleClick = (e: React.SyntheticEvent<EventTarget>): boolean => (e.target as HTMLElement).tagName !== 'A';

    renderHintLabel() {
        return (
            <div className={cn('hint-box')}>
                <div className={cn('hint-text')}>{this.props.hint!.title}</div>
            </div>
        );
    }

    render() {
        const { hint, border } = this.props;

        return (
            <div
                className={cn('', {
                    hint: !!hint ? hint.color : false,
                    'bl-yes': border!.left,
                    'br-yes': border!.right,
                    'bt-yes': border!.top,
                    'bb-yes': border!.bottom,
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

export default ProductCardWrapper;
