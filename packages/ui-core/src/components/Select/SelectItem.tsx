import * as React from 'react';
import * as PropTypes from 'prop-types';
import './SelectItem.less';
import cnCreate from 'utils/cnCreate';

interface ISelectItemProps {
    /** Content */
    content?: JSX.Element[] | Element[] | JSX.Element | Element | string;
    /** Ordinal number of the item  */
    value: number;
    /** Current item */
    isCurrent?: boolean;
    /** Active item in dropdown list */
    isActive?: boolean;
    /** Item index */
    index?: number;
    /** Select item handler */
    onSelect?(e: React.SyntheticEvent<EventTarget>, value: number): void;
    /** Hover item handler */
    onHover?(e: React.SyntheticEvent<EventTarget>, value: number): void;
}

const cn = cnCreate('mfui-select-item');
class SelectItem extends React.Component<ISelectItemProps, {}> {
    static propTypes = {
        value: PropTypes.number.isRequired,
        content: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.element,
        ]),
        isCurrent: PropTypes.bool,
        isActive: PropTypes.bool,
        index: PropTypes.number,
        onSelect: PropTypes.func.isRequired,
        onHover: PropTypes.func.isRequired,
    };

    itemNode: any = null;

    shouldComponentUpdate(nextProps: ISelectItemProps) {
        const { isActive, isCurrent, content } = this.props;
        const active = isActive !== nextProps.isActive;
        const current = isCurrent !== nextProps.isCurrent;
        const contentItem = content !== nextProps.content;

        return active || current || contentItem ;
    }

    handleClick = e => {
        const { onSelect, value } = this.props;

        onSelect && onSelect(e, value);
    }

    handleMouseEnter = e => {
        const { onHover, index } = this.props;

        index !== undefined && onHover && onHover(e, index);
    }

    render() {
        const { isCurrent, isActive, content } = this.props;

        return (
            <div
                className={cn('', {
                    current: isCurrent,
                    active: isActive,
                })}
                onClick={this.handleClick}
                onMouseEnter={this.handleMouseEnter}
                ref={node => { this.itemNode = node; }}
            >
                <div className={cn('title')}>
                    {content}
                </div>
            </div>
        );
    }
}

export default SelectItem;
