import * as React from 'react';
import * as PropTypes from 'prop-types';
import './Accordion.less';
import cnCreate from 'utils/cnCreate';
import Header from 'components/Header/Header';
import Collapse from 'components/Collapse/Collapse';
import ArrowUp from 'icons/System/24/Arrow_up_24.svg';
import ArrowDown from 'icons/System/24/Arrow_down_24.svg';

export interface IAccordionProps {
    /** Заголовок */
    title: string;
    /** Состояние открытости */
    isOpened?: boolean;
    /** Вертикальные отступы */
    hasVerticalPaddings?: boolean;
    /** Дополнительный класс для корневого элемента */
    className?: string;
    /** Дополнительные классы для корневого и внутренних элементов */
    classes?: {
        root?: string;
        collapse?: string;
    };
    /** Обработчик клика */
    onClickAccordion?: (isOpened: boolean, title: string) => void;
}

const cn = cnCreate('mfui-beta-accordion');
const Accordion: React.FC<IAccordionProps> = ({
    title,
    isOpened = false,
    hasVerticalPaddings = false,
    className,
    classes: {
        root: rootPropsClasses,
        collapse: collapsePropsClasses,
    } = {},
    onClickAccordion,
    children,
}) => {
    const [isOpenedState, setIsOpenedState] = React.useState<boolean>(isOpened);

    React.useEffect(() => {
        setIsOpenedState(isOpened);
    }, [isOpened]);

    const handleClickTitle = (): void => {
        onClickAccordion && onClickAccordion(!isOpenedState, title);

        setIsOpenedState(!isOpenedState);
    };

    return (
        <div className={cn({ open: isOpenedState }, [className, rootPropsClasses])}>
            <div className={cn('title-wrap')} onClick={handleClickTitle}>
                <Header as="h5">{title}</Header>
                <div className={cn('icon-box', { open: isOpenedState })}>
                    {isOpenedState
                        ? (<ArrowUp />)
                        : (<ArrowDown />)
                    }
                </div>
            </div>
            <Collapse
                className={cn('content', collapsePropsClasses)}
                classNameContainer={cn('content-inner', { 'v-padding': hasVerticalPaddings })}
                isOpened={isOpenedState}
            >
                {children}
            </Collapse>
        </div>
    );
};

Accordion.propTypes = {
    title: PropTypes.string.isRequired,
    isOpened: PropTypes.bool,
    hasVerticalPaddings: PropTypes.bool,
    className: PropTypes.string,
    classes: PropTypes.shape({
        root: PropTypes.string,
        collapse: PropTypes.string,
    }),
    onClickAccordion: PropTypes.func,
};

export default Accordion;
