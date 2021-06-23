import React from 'react';
import PropTypes from 'prop-types';
import { cnCreate, Header } from '@megafon/ui-core';
import './PageTitle.less';
import Breadcrumbs, { Props as BreadcrumbsType } from '../Breadcrumbs/Breadcrumbs';

type Props = {
    /** Текст заголовка */
    title: string;
    /** Хлебные крошки */
    breadcrumbs?: BreadcrumbsType['items'];
    /** Текст бейджа */
    badge?: string;
};

const cn = cnCreate('mfui-beta-page-title');
const PageTitle: React.FC<Props> = ({ title, breadcrumbs, badge }) => (
    <div className={cn()}>
        <div className={cn('inner')}>
            {breadcrumbs?.length && <Breadcrumbs items={breadcrumbs} className={cn('breadcrumbs')} />}
            {badge && <div className={cn('badge')}>{badge}</div>}
            <Header>{title}</Header>
        </div>
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
};

export default PageTitle;
