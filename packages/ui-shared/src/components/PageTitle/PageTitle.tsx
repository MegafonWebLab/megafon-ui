import * as React from 'react';
import { Header, Grid, GridColumn } from '@megafon/ui-core';
import { cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import PropTypes from 'prop-types';
import './PageTitle.less';
import Breadcrumbs, { Props as BreadcrumbsType } from '../Breadcrumbs/Breadcrumbs';

type Props = {
    /** Дополнительные data атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
        breadcrumbs?: Record<string, string>;
        breadcrumbsLink?: Record<string, string>;
    };
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

const cn = cnCreate('mfui-page-title');
const PageTitle: React.FC<Props> = ({
    dataAttrs,
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
        [badge, title, isBreadcrumbs],
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
        <div {...filterDataAttrs(dataAttrs?.root)} className={cn([className])} ref={rootRef}>
            {breadcrumbs?.length && (
                <Breadcrumbs
                    items={breadcrumbs}
                    dataAttrs={{ root: dataAttrs?.breadcrumbs, link: dataAttrs?.breadcrumbsLink }}
                    className={cn('breadcrumbs', [classes.breadcrumbs])}
                />
            )}
            {isFullWidth ? renderPageTitle() : renderPageTitleWithGrid()}
        </div>
    );
};

PageTitle.propTypes = {
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
        breadcrumbs: PropTypes.objectOf(PropTypes.string.isRequired),
        breadcrumbsLink: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
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
