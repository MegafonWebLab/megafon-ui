import * as React from 'react';
import { cnCreate, filterDataAttrs, IFilterDataAttrs, checkEventIsClickOrEnterPress } from '@megafon/ui-helpers';
import type { AccessibilityEventType } from '@megafon/ui-helpers';
import ArrowDown from '@megafon/ui-icons/system-24-arrow_down_24.svg';
import ArrowUp from '@megafon/ui-icons/system-24-arrow_up_24.svg';
import * as PropTypes from 'prop-types';
import Collapse from 'components/Collapse/Collapse';
import Header from 'components/Header/Header';
import './Accordion.less';

export interface IAccordionProps extends IFilterDataAttrs {
    /** Ссылка на корневой элемент */
    rootRef?: React.Ref<HTMLDivElement>;
    /** Заголовок */
    title: string | React.ReactNode | React.ReactNode[];
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
        titleWrap?: string;
    };
    /** Обработчик клика */
    onClickAccordion?: (isOpened: boolean, title: string | React.ReactNode | React.ReactNode[]) => void;
}

const cn = cnCreate('mfui-accordion');
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
        titleWrap: titleWrapPropsClasses,
    } = {},
    dataAttrs,
    onClickAccordion,
    children,
}) => {
    const [isOpenedState, setIsOpenedState] = React.useState<boolean>(isOpened);

    React.useEffect(() => {
        setIsOpenedState(isOpened);
    }, [isOpened]);

    const handleClickTitle = (e: AccessibilityEventType): void => {
        if (checkEventIsClickOrEnterPress(e)) {
            onClickAccordion?.(!isOpenedState, title);

            setIsOpenedState(!isOpenedState);
        }
    };

    const openedClassName = isOpenedState ? openedClass : undefined;

    return (
        <div
            {...filterDataAttrs(dataAttrs)}
            ref={rootRef}
            className={cn({ open: isOpenedState }, [className, rootPropsClasses, openedClassName])}
        >
            <div
                className={cn('title-wrap', [titleWrapPropsClasses])}
                onClick={handleClickTitle}
                onKeyDown={handleClickTitle}
            >
                <Header as="h5">{title}</Header>
                <div tabIndex={0} role="button" className={cn('icon-box', { open: isOpenedState })}>
                    {isOpenedState ? <ArrowUp /> : <ArrowDown />}
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
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any]),
    ]),
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
    isOpened: PropTypes.bool,
    hasVerticalPaddings: PropTypes.bool,
    className: PropTypes.string,
    classes: PropTypes.shape({
        openedClass: PropTypes.string,
        root: PropTypes.string,
        collapse: PropTypes.string,
        titleWrap: PropTypes.string,
    }),
    dataAttrs: PropTypes.objectOf(PropTypes.string.isRequired),
    onClickAccordion: PropTypes.func,
};

export default Accordion;
