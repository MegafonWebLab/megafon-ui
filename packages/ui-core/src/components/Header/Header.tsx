import * as React from 'react';
import * as PropTypes from 'prop-types';
import './Header.less';
import cnCreate from 'utils/cnCreate';

interface IHeaderProps {
    /** Tag */
    as?: 'h1' | 'h2' | 'h3' | 'h5';
    /** Color */
    color?: 'black' | 'white' | 'green' | 'purple' | 'blue' | 'inherit';
    /** Turn on margin */
    margin?: boolean;
    /** Additional element */
    addition?: JSX.Element;
    /** Custom class name */
    className?: string;
    /** Horizontal align */
    hAlign?: 'inherit' | 'left' | 'center' | 'right';
    /** Children */
    children?: React.ReactNode;
    /** Click handler */
    onClick?: (e: React.SyntheticEvent<EventTarget>) => void;
}

const cn = cnCreate('mfui-header');
class Header extends React.Component<IHeaderProps, {}> {
    static propTypes = {
        as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h5']),
        color: PropTypes.oneOf(['black', 'white', 'green', 'purple', 'blue', 'inherit']),
        margin: PropTypes.bool,
        addition: PropTypes.element,
        hAlign: PropTypes.oneOf(['inherit', 'left', 'center', 'right']),
        onClick: PropTypes.func,
        children: PropTypes.node,
    };

    static defaultProps: Partial<IHeaderProps> = {
        as: 'h1',
        color: 'black',
        hAlign: 'inherit',
    };

    renderAddition() {
        return (
            <div className={cn('addition')}>
                {this.props.addition}
            </div>
        );
    }

    render() {
        const ElementType = this.props.as as React.ElementType;
        const { color, margin, as: level, hAlign, className, onClick } = this.props;

        return (
            <ElementType
                    className={cn({ color, margin, level, 'h-align': hAlign }, className)}
                    onClick={onClick}>
                {this.props.children}
                {this.props.addition && this.renderAddition()}
            </ElementType>
        );
    }
}

export default Header;
