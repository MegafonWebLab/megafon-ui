import * as React from 'react';
import { cnCreate, filterDataAttrs, checkEventIsClickOrEnterPress } from '@megafon/ui-helpers';
import type { AccessibilityEventType } from '@megafon/ui-helpers';
import ArrowDown from '@megafon/ui-icons/system-24-arrow_down_24.svg';
import ArrowUp from '@megafon/ui-icons/system-24-arrow_up_24.svg';
import * as PropTypes from 'prop-types';
import Collapse from 'components/Collapse/Collapse';
import Header from 'components/Header/Header';
import './Accordion.less';

export interface IAccordionProps {
    /** Ссылка на корневой элемент */
    rootRef?: React.Ref<HTMLDivElement>;
    /** Заголовок */
    title: string | React.ReactNode | React.ReactNode[];
    /** Состояние открытости */
    isOpened?: boolean;
    /** Дополнительный класс для корневого элемента */
    className?: string;
    /** Дополнительные классы для корневого и внутренних элементов */
    classes?: {
        root?: string;
        openedClass?: string;
        collapse?: string;
        titleWrap?: string;
    };
    /** Дополнительные data атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
        header?: Record<string, string>;
        collapse?: Record<string, string>;
        titleWrap?: Record<string, string>;
        arrowUp?: Record<string, string>;
        arrowDown?: Record<string, string>;
    };
    /** Обработчик клика */
    onClickAccordion?: (isOpened: boolean) => void;
}

const cn = cnCreate('mfui-accordion');
const Accordion: React.FC<IAccordionProps> = ({
    rootRef,
    title,
    isOpened = false,
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
            onClickAccordion && onClickAccordion(!isOpenedState);

            setIsOpenedState(!isOpenedState);
        }
    };

    const openedClassName = isOpenedState ? openedClass : undefined;

    return (
        <div
            {...filterDataAttrs(dataAttrs?.root)}
            ref={rootRef}
            className={cn({ open: isOpenedState }, [className, rootPropsClasses, openedClassName])}
        >
            <div
                {...filterDataAttrs(dataAttrs?.titleWrap)}
                className={cn('title-wrap', [titleWrapPropsClasses])}
                onClick={handleClickTitle}
                onKeyDown={handleClickTitle}
            >
                <Header as="h5" {...filterDataAttrs(dataAttrs?.header)}>
                    {title}
                </Header>
                <div tabIndex={0} role="button" className={cn('icon-box', { open: isOpenedState })}>
                    {isOpenedState ? (
                        <ArrowUp {...filterDataAttrs(dataAttrs?.arrowUp)} />
                    ) : (
                        <ArrowDown {...filterDataAttrs(dataAttrs?.arrowDown)} />
                    )}
                </div>
            </div>
            <Collapse
                {...filterDataAttrs(dataAttrs?.collapse)}
                className={cn('content', collapsePropsClasses)}
                classNameContainer={cn('content-inner')}
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
    className: PropTypes.string,
    classes: PropTypes.shape({
        openedClass: PropTypes.string,
        root: PropTypes.string,
        collapse: PropTypes.string,
        titleWrap: PropTypes.string,
    }),
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
        header: PropTypes.objectOf(PropTypes.string.isRequired),
        collapse: PropTypes.objectOf(PropTypes.string.isRequired),
        titleWrap: PropTypes.objectOf(PropTypes.string.isRequired),
        arrowUp: PropTypes.objectOf(PropTypes.string.isRequired),
        arrowDown: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    onClickAccordion: PropTypes.func,
};

export default Accordion;
