import React from 'react';
import { cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import PropTypes from 'prop-types';
import BreadcrumbsItem, { TextColor } from './components/BreadcrumbsItem';
import './Breadcrumbs.less';

type ItemObjectType = {
    title?: string;
    href?: string;
};

type ItemType = JSX.Element | ItemObjectType;

export type TextColorType = typeof TextColor[keyof typeof TextColor];

export type Props = {
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Список элементов */
    items: ItemType[];
    /** Цвет */
    color?: TextColorType;
    /** Включить микроразметку */
    hasMicrodata?: boolean;
    /** Дополнительные классы для корневого и внутренних элементов */
    classes?: { item?: string; itemTitle?: string; lastItemTitle?: string; link?: string };
    /** Дополнительные data атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
        item?: Record<string, string>;
        itemInner?: Record<string, string>;
        itemTitle?: Record<string, string>;
        itemMeta?: Record<string, string>;
        link?: Record<string, string>;
    };
};

const isObjectElement = (item: ItemType): item is ItemObjectType => !React.isValidElement(item);

const cn = cnCreate('mfui-breadcrumbs');
const Breadcrumbs: React.FC<Props> = ({
    items,
    color = 'default',
    className,
    classes = {},
    dataAttrs,
    hasMicrodata = false,
}) => (
    <div
        className={cn({ color }, className)}
        {...filterDataAttrs(dataAttrs?.root)}
        {...(hasMicrodata && { itemScope: true, itemType: 'https://schema.org/BreadcrumbList' })}
    >
        {items.map((item: ItemType, i: number): JSX.Element | null => (
            <div className={cn('item', classes.item)} {...filterDataAttrs(dataAttrs?.item, i + 1)} key={i}>
                {isObjectElement(item) ? (
                    <BreadcrumbsItem
                        title={item.title}
                        href={item.href}
                        color={color}
                        index={i}
                        isLastItem={i === items.length - 1}
                        hasMicrodata={hasMicrodata}
                        dataAttrs={{
                            root: dataAttrs?.itemInner,
                            link: dataAttrs?.link,
                            itemTitle: dataAttrs?.itemTitle,
                            meta: dataAttrs?.itemMeta,
                        }}
                        classes={{
                            link: classes?.link,
                            itemTitle: classes?.itemTitle,
                            lastItemTitle: classes?.lastItemTitle,
                        }}
                    />
                ) : (
                    item
                )}
            </div>
        ))}
    </div>
);

Breadcrumbs.propTypes = {
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
        item: PropTypes.objectOf(PropTypes.string.isRequired),
        itemInner: PropTypes.objectOf(PropTypes.string.isRequired),
        itemTitle: PropTypes.objectOf(PropTypes.string.isRequired),
        itemMeta: PropTypes.objectOf(PropTypes.string.isRequired),
        link: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    className: PropTypes.string,
    classes: PropTypes.shape({
        item: PropTypes.string,
        itemTitle: PropTypes.string,
        lastItemTitle: PropTypes.string,
        link: PropTypes.string,
    }),
    items: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element.isRequired),
        PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string,
                href: PropTypes.string,
            }).isRequired,
        ),
    ]).isRequired,
    color: PropTypes.oneOf(Object.values(TextColor)),
    hasMicrodata: PropTypes.bool,
};

export default Breadcrumbs;
