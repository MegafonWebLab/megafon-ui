import * as React from 'react';
import * as PropTypes from 'prop-types';
import BubbleHint from '../BubbleHint/BubbleHint';
import './DropdownSocialList.less';
import cnCreate from 'utils/cn';

export interface Icon {
    svgIcon: JSX.Element;
    title: string;
}

export interface IDropdownSocialListProps {
    /** Icons list */
    icons: Array<Partial<Icon>>;
    /** Max icon */
    maxIconNumber: number;
    /** Custom class name */
    className?: string;
}

const cn = cnCreate('mfui-dropdown-social-list');
class DropdownSocialList extends React.Component<IDropdownSocialListProps, {}> {
    static propTypes = {
        icons: PropTypes.arrayOf(
            PropTypes.shape({
                svgIcon: PropTypes.element,
                title: PropTypes.string,
            })
        ),
        maxIconNumber: PropTypes.number,
        className: PropTypes.string,
    };

    static defaultProps: Partial<IDropdownSocialListProps> = {
        maxIconNumber: 6,
    };

    renderDropdown() {
        const { icons, maxIconNumber }: IDropdownSocialListProps = this.props;

        return (
            <div>{/* div for ios bug, don't delete */}
                <BubbleHint
                    className={cn('dropdown')}
                    click
                    placement="bottom"
                    popupPadding="none"
                    trigger={
                        <span className={cn('dropdown-trigger')}>
                            и еще {icons.length - maxIconNumber}
                        </span>}
                >
                    <div className={cn('dropdown-popup')}>
                        <div className={cn('dropdown-list')}>
                            {icons.slice(maxIconNumber).map((icon: Icon, index: number): JSX.Element =>
                                <span className={cn('dropdown-item')} key={icon.title + index}>
                                    {icon.title}
                                </span>
                            )}
                        </div>
                    </div>
                </BubbleHint>
            </div>
        );
    }

    render() {
        const { icons, maxIconNumber, className }: IDropdownSocialListProps = this.props;

        return (
            <div className={cn('', {}, className)}>
                <div className={cn('list')}>
                    {icons.slice(0, maxIconNumber).map((icon: Icon, index): JSX.Element =>
                        <div className={cn('item')} title={icon.title} key={icon.title + index}>
                            {icon.svgIcon}
                        </div>
                    )}
                </div>
                {icons.length > maxIconNumber && this.renderDropdown()}
            </div>
        );
    }
}

export default DropdownSocialList;
