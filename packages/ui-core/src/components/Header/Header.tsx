import * as React from 'react';
import * as PropTypes from 'prop-types';
import './Header.less';
import cnCreate from 'utils/cnCreate';
import filterDataAttrs, { IDataAttributes } from './../../utils/dataAttrs';

interface IHeaderProps extends IDataAttributes {
    /** Tag */
    as?: 'h1' | 'h2' | 'h3' | 'h5';
    /** Color */
    color?: 'black' | 'white' | 'green' | 'purple' | 'blue' | 'inherit';
    /** Turn on margin */
    margin?: boolean;
    /** Additional element */
    addition?: JSX.Element;
    /** Custom class name */
    className?: string | string[];
    /** Horizontal align */
    hAlign?: 'inherit' | 'left' | 'center' | 'right';
    /** Children */
    children?: React.ReactNode;
    /** Click handler */
    onClick?: (e: React.SyntheticEvent<EventTarget>) => void;
}

const cn = cnCreate('mfui-beta-header');
class Header extends React.Component<IHeaderProps, {}> {
    static propTypes = {
        as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h5']),
        color: PropTypes.oneOf(['black', 'white', 'green', 'purple', 'blue', 'inherit']),
        margin: PropTypes.bool,
        addition: PropTypes.element,
        hAlign: PropTypes.oneOf(['inherit', 'left', 'center', 'right']),
        dataAttrs: PropTypes.objectOf(PropTypes.string),
        onClick: PropTypes.func,
        children: PropTypes.node,
    };

    static defaultProps: Partial<IHeaderProps> = {
        as: 'h1',
        color: 'black',
        hAlign: 'inherit',
    };

    renderAddition() {
        return <div className={cn('addition')}>{this.props.addition}</div>;
    }

    render() {
        const { color, margin, as: level, hAlign, onClick, dataAttrs, className } = this.props;
        const ElementType = level as React.ElementType;

        return (
            <ElementType
                {...filterDataAttrs(dataAttrs)}
                className={cn(
                    { color, margin, level, 'h-align': hAlign },
                    className
                )}
                onClick={onClick}
            >
                {this.props.children}
                {this.props.addition && this.renderAddition()}
            </ElementType>
        );
    }
}

export default Header;
