import * as React from 'react';
import * as PropTypes from 'prop-types';
import './Accordion.less';
import cnCreate from 'utils/cnCreate';
import Header from 'components/Header/Header';
import Collapse from 'components/Collapse/Collapse';
import ArrowUp from 'icons/System/24/Arrow_up_24.svg';
import ArrowDown from 'icons/System/24/Arrow_down_24.svg';
import filterDataAttrs, { IDataAttributes } from './../../utils/dataAttrs';

export interface IAccordionProps extends IDataAttributes {
    /** Ссылка на корневой элемент */
    rootRef?: React.Ref<HTMLDivElement>;
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
        openedClass?: string;
        root?: string;
        collapse?: string;
    };
    /** Обработчик клика */
    onClickAccordion?: (isOpened: boolean, title: string) => void;
}

const cn = cnCreate('mfui-beta-accordion');
const Accordion: React.FC<IAccordionProps> = ({
    rootRef,
    title,
    isOpened = false,
    hasVerticalPaddings = false,
    className,
    classes: {
        openedClass,
        root: rootPropsClasses,
        collapse: collapsePropsClasses,
    } = {},
    dataAttrs,
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
        <div
            {...filterDataAttrs(dataAttrs)}
            ref={rootRef}
            className={cn({ open: isOpenedState }, [className, rootPropsClasses, isOpenedState && openedClass])}
        >
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
    rootRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any ]),
    ]),
    title: PropTypes.string.isRequired,
    isOpened: PropTypes.bool,
    hasVerticalPaddings: PropTypes.bool,
    className: PropTypes.string,
    classes: PropTypes.shape({
        openedClass: PropTypes.string,
        root: PropTypes.string,
        collapse: PropTypes.string,
    }),
    dataAttrs: PropTypes.objectOf(PropTypes.string.isRequired),
    onClickAccordion: PropTypes.func,
};

export default Accordion;
