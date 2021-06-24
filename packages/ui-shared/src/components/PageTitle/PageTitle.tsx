import React from 'react';
import PropTypes from 'prop-types';
import { Header } from '@megafon/ui-core';
import { cnCreate } from '@megafon/ui-helpers';
import './PageTitle.less';
import Breadcrumbs, { Props as BreadcrumbsType } from '../Breadcrumbs/Breadcrumbs';

type Props = {
    /** Текст заголовка */
    title: string;
    /** Хлебные крошки */
    breadcrumbs?: BreadcrumbsType['items'];
    /** Текст бейджа */
    badge?: string;
    /** Класс для корневого элемента */
    className?: string;
    /** Дополнительные классы для внутренних элементов */
    classes?: {
        breadcrumbs?: string;
    };
    /** Ссылка на корневой элемент */
    rootRef?: React.RefObject<HTMLDivElement>;
};

const cn = cnCreate('mfui-beta-page-title');
const PageTitle: React.FC<Props> = ({ title, breadcrumbs, badge, className, classes = {}, rootRef }) => (
    <div className={cn([className])} ref={rootRef}>
        {!!breadcrumbs?.length &&
            <Breadcrumbs items={breadcrumbs} className={cn('breadcrumbs', {}, classes.breadcrumbs)} />}
        {badge && <div className={cn('badge')}>{badge}</div>}
        <Header className={cn('title')} as="h1">{title}</Header>
    </div>
);

PageTitle.propTypes = {
    title: PropTypes.string.isRequired,
    breadcrumbs: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            href: PropTypes.string,
        }).isRequired
    ),
    badge: PropTypes.string,
    className: PropTypes.string,
    classes: PropTypes.shape({
        breadcrumbs: PropTypes.string,
    }),
    rootRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([
            PropTypes.shape({ current: PropTypes.elementType }),
            PropTypes.any,
        ]),
    ]),
};

export default PageTitle;
