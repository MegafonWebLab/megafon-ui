import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '@megafon/ui-core/src/utils/cn';
import './ProductCardWrapper.less';

interface IProductCardWrapperProps {
    /** This option add specific className on container
     * and child components change styles: background, paddings, font-size...
     */
    theme?: 'default';
    /** Hint from left */
    hint?: {
        title: string;
        color: 'green' | 'orange' | 'black';
    };
    /** Show border
     * each property:'sky' or true(bool)
     * true - get default color #D8D8D8
     * sky - #EDEDED
     */
    border?: Partial<{
        top: boolean | 'sky';
        right: boolean | 'sky';
        bottom: boolean | 'sky';
        left: boolean | 'sky';
    }>;
    children: JSX.Element[] | Element[] | JSX.Element | Element;
    className?: string;
    classNameInner?: string;
    classNameContainer?: string;
}

const cn = cnCreate('mfui-product-card-wrapper');
class ProductCardWrapper extends React.Component<IProductCardWrapperProps, {}> {
    static propTypes = {
        theme: PropTypes.oneOf(['default']),
        hint: PropTypes.shape({
            title: PropTypes.string.isRequired,
            color: PropTypes.oneOf(['green', 'orange', 'black']).isRequired,
        }),
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.element,
            PropTypes.node,
        ]),
        border: PropTypes.shape({
            top: PropTypes.oneOf([false, true, 'sky']),
            right: PropTypes.oneOf([false, true, 'sky']),
            bottom: PropTypes.oneOf([false, true, 'sky']),
            left: PropTypes.oneOf([false, true, 'sky']),
        }),
        className: PropTypes.string,
        classNameInner: PropTypes.string,
        classNameContainer: PropTypes.string,
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
        const { hint, border, theme, className, classNameInner, classNameContainer } = this.props;
        const getHintColor = () => !!hint && (hint! as {}).constructor.name === 'Object' ? hint.color : null;
        const color = getHintColor();

        return (
            <div
                className={cn('', {
                    hint: !!hint,
                    [`hint_${color}`]: !!color,
                    bl: border!.left,
                    br: border!.right,
                    bt: border!.top,
                    bb: border!.bottom,
                    theme,
                }, className)}
                onClick={this.handleClick}
            >
                <div className={cn('inner', {}, classNameInner)}>
                    {hint && this.renderHintLabel()}
                    <div className={cn('container', {}, classNameContainer)}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductCardWrapper;
