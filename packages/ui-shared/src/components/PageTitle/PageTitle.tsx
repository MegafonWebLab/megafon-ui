import * as React from 'react';
import PropTypes from 'prop-types';
import { Header, Grid, GridColumn } from '@megafon/ui-core';
import { cnCreate } from '@megafon/ui-helpers';
import './PageTitle.less';
import Breadcrumbs, { Props as BreadcrumbsType } from '../Breadcrumbs/Breadcrumbs';

type Props = {
    /** Текст заголовка */
    title: string | React.ReactNode | React.ReactNode[];
    /** Хлебные крошки */
    breadcrumbs?: BreadcrumbsType['items'];
    /** Текст бейджа */
    badge?: string;
    /** Растягивание компонента на всю доступную ширину */
    isFullWidth?: boolean;
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
const PageTitle: React.FC<Props> = ({
    title,
    breadcrumbs,
    badge,
    isFullWidth = true,
    className,
    classes = {},
    rootRef,
}) => {
    const isBreadcrumbs = !!breadcrumbs?.length;

    const renderPageTitle = React.useCallback(
        () => (
            <>
                {badge && <div className={cn('badge', { 'under-breadcrumbs': isBreadcrumbs })}>{badge}</div>}
                <Header className={cn('title', { 'under-breadcrumbs': isBreadcrumbs && !badge })} as="h1">
                    {title}
                </Header>
            </>
        ),
        [breadcrumbs, classes, badge, title],
    );

    const renderPageTitleWithGrid = React.useCallback(
        () => (
            <Grid>
                <GridColumn wide="8" desktop="10" tablet="12" mobile="12">
                    {renderPageTitle()}
                </GridColumn>
            </Grid>
        ),
        [renderPageTitle],
    );

    return (
        <div className={cn([className])} ref={rootRef}>
            {breadcrumbs?.length && (
                <Breadcrumbs items={breadcrumbs} className={cn('breadcrumbs', [classes.breadcrumbs])} />
            )}
            {isFullWidth ? renderPageTitle() : renderPageTitleWithGrid()}
        </div>
    );
};

PageTitle.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
    breadcrumbs: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            href: PropTypes.string,
        }).isRequired,
    ),
    badge: PropTypes.string,
    isFullWidth: PropTypes.bool,
    className: PropTypes.string,
    classes: PropTypes.shape({
        breadcrumbs: PropTypes.string,
    }),
    rootRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any]),
    ]),
};

export default PageTitle;
