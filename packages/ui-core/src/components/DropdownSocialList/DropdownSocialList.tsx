import * as React from 'react';
import * as PropTypes from 'prop-types';
import Tooltip from 'components/Tooltip/Tooltip';
import './DropdownSocialList.less';
import cnCreate from 'utils/cnCreate';

export interface IIcon {
    svgIcon: JSX.Element;
    title: string;
}

export interface IDropdownSocialListProps {
    /** Массив иконок */
    icons: Array<Partial<IIcon>>;
    /** Максимальное число отображаемых иконок */
    maxIconNumber?: number;
    /** Дополнительный класс корневого элемента */
    className?: string;
}

const cn = cnCreate('mfui-beta-dropdown-social-list');
const DropdownSocialList: React.FC<IDropdownSocialListProps> = ({ icons, maxIconNumber = 6, className }) => {
    const triggerElement = React.useRef<HTMLDivElement | null>(null);

    const renderDropdown = (): React.ReactNode => (
        <div className={cn('dropdown')}>
            <div ref={triggerElement} className={cn('dropdown-trigger')}>
                и еще {icons.length - maxIconNumber}
            </div>
            <Tooltip
                placement="bottom"
                triggerEvent="click"
                triggerElement={triggerElement}
            >
                <div className={cn('dropdown-list')}>
                    {icons.slice(maxIconNumber).map((icon: IIcon, index: number): JSX.Element =>
                        <span className={cn('dropdown-item')} key={icon.title + index}>
                            {icon.title}
                        </span>
                    )}
                </div>
            </Tooltip>
        </div>
    );

    return (
        <div className={cn([className])}>
            <div className={cn('list')}>
                {icons.slice(0, maxIconNumber).map((icon: IIcon, index): JSX.Element =>
                    <div className={cn('item')} title={icon.title} key={icon.title + index}>
                        {icon.svgIcon}
                    </div>
                )}
            </div>
            {icons.length > maxIconNumber && renderDropdown()}
        </div>
    );
};

DropdownSocialList.propTypes = {
    icons: PropTypes.arrayOf(
        PropTypes.shape({
            svgIcon: PropTypes.element.isRequired,
            title: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
    maxIconNumber: PropTypes.number,
    className: PropTypes.string,
};

export default DropdownSocialList;
