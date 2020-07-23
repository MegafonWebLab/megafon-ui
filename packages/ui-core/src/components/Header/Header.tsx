import * as React from 'react';
import * as PropTypes from 'prop-types';
import './Header.less';
import cnCreate from 'utils/cn';
import filterDataAttrs, { IDataAttrs } from 'utils/dataAttrs';

interface IHeaderProps extends IDataAttrs {
    /** Tag */
    as?: 'h1' | 'h2' | 'h3' | 'h5' | 'h6';
    /** Color */
    color?: 'black' | 'white' | 'green' | 'purple' | 'blue' | 'inherit';
    /** Turn on margin */
    margin?: boolean;
    /** Additional element */
    addition?: JSX.Element;
    /** Custom class name */
    className?: string | string[];
    /** Horizontal align */
    hAlign?: 'left' | 'center' | 'right';
    /** Children */
    children?: JSX.Element[] | Element[] | JSX.Element | string | Element;
    /** Click handler */
    onClick?(e: React.SyntheticEvent<EventTarget>): void;
}

const cn = cnCreate('mfui-header');
class Header extends React.Component<IHeaderProps, {}> {
    static propTypes = {
        as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h5', 'h6']),
        color: PropTypes.oneOf([
            'black',
            'white',
            'green',
            'purple',
            'blue',
            'inherit',
        ]),
        margin: PropTypes.bool,
        addition: PropTypes.element,
        dataAttrs: PropTypes.objectOf(PropTypes.string),
        onClick: PropTypes.func,
        children: PropTypes.node,
        hAlign: PropTypes.oneOf(['left', 'center', 'right']),
    };

    static defaultProps: Partial<IHeaderProps> = {
        as: 'h1',
        color: 'black',
    };

    renderAddition() {
        return <div className={cn('addition')}>{this.props.addition}</div>;
    }

    render() {
        const ElementType = this.props.as as string;
        const { color, margin, as: level, hAlign, onClick, dataAttrs } = this.props;

        return (
            <ElementType
                {...filterDataAttrs(dataAttrs)}
                className={cn(
                    { color, margin, level, 'h-align': hAlign },
                    this.props.className
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
