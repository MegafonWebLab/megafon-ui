import * as React from 'react';
import * as PropTypes from 'prop-types';
import './SelectItem.less';
import { cnCreate } from '../../utils/cn';

interface ISelectItemProps {
    /** Icon right */
    rightIcon?: JSX.Element;
    /** Icon left */
    leftIcon?: JSX.Element;
    /** Content  */
    title?: JSX.Element[] | Element[] | JSX.Element | Element | string;
    /** Ordinal number of the item  */
    index: number;
    /** Active item */
    active?: boolean;
    /** Current item */
    current?: boolean;
    /** Item padding */
    padding?: 'small';
    /** Select item handler */
    onSelect(e: React.SyntheticEvent<EventTarget>, index: number): void;
    /** Hover item handler */
    onHover(e: React.SyntheticEvent<EventTarget>, index: number): void;
}

const cn = cnCreate('mfui-select-item');
class SelectItem extends React.Component<ISelectItemProps, {}> {
    static propTypes = {
        rightIcon: PropTypes.element,
        leftIcon: PropTypes.element,
        title: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.element,
            PropTypes.string,
            PropTypes.node,
        ]),
        index: PropTypes.number.isRequired,
        active: PropTypes.bool,
        current: PropTypes.bool,
        onSelect: PropTypes.func.isRequired,
        onHover: PropTypes.func.isRequired,
        padding: PropTypes.oneOf(['small']),
    };

    itemNode: any = null;

    shouldComponentUpdate(nextProps: ISelectItemProps) {
        const active = this.props.active !== nextProps.active;
        const current = this.props.current !== nextProps.current;
        const title = this.props.title !== nextProps.title;

        return active || current || title;
    }

    handleClick = e => {
        this.props.onSelect(e, this.props.index);
    }

    handleMouseEnter = e => {
        this.props.onHover(e, this.props.index);
    }

    renderLeftIcon() {
        return (
            <div className={cn('left-icon-box')}>
                {this.props.leftIcon}
            </div>
        );
    }

    renderRightIcon() {
        return (
            <div className={cn('right-icon-box')}>
                {this.props.rightIcon}
            </div>
        );
    }

    render() {
        const {
            leftIcon,
            rightIcon,
            current,
            active,
            padding,
        } = this.props;

        return (
            <div
                className={cn('', {
                    'left-icon': !!leftIcon,
                    'right-icon': !!rightIcon,
                    current: current,
                    active: active,
                    padding: padding,
                })}
                onClick={this.handleClick}
                onMouseEnter={this.handleMouseEnter}
                ref={node => { this.itemNode = node; }}
            >
                {this.props.leftIcon && this.renderLeftIcon()}
                <div className={cn('title')}>
                    {this.props.title}
                </div>
                {this.props.rightIcon && this.renderRightIcon()}
            </div>
        );
    }
}

export default SelectItem;
