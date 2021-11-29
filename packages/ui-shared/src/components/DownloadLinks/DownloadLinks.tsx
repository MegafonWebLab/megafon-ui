import * as React from 'react';
import { Grid, GridColumn } from '@megafon/ui-core';
import { cnCreate } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import './DownloadLinks.less';
import { IDownloadLink } from './DownloadLink';

type GridColumnType = React.ComponentProps<typeof GridColumn>;

type ColumnConfig = {
    wide?: GridColumnType['wide'];
    desktop?: GridColumnType['desktop'];
    tablet?: GridColumnType['tablet'];
    mobile?: GridColumnType['mobile'];
    all?: GridColumnType['all'];
};

const getColumnConfig = (itemsCount): ColumnConfig => {
    switch (true) {
        case itemsCount <= 2: {
            return {
                all: '7',
                mobile: '12',
            };
        }

        case itemsCount <= 4: {
            return {
                all: '6',
                mobile: '12',
            };
        }

        default: {
            return {
                wide: '4',
                desktop: '4',
                tablet: '6',
                mobile: '12',
            };
        }
    }
};

interface IDownloadLinks {
    /** Выстраивать ссылки в одну колонку вне зависимости от количества */
    inOneColumn?: boolean;
    children: Array<React.ReactElement<IDownloadLink>> | React.ReactElement<IDownloadLink>;
}

const cn = cnCreate('mfui-beta-download-links');
const DownloadLinks: React.FC<IDownloadLinks> = ({ inOneColumn = false, children }) => {
    if (inOneColumn) {
        return (
            <div className={cn()}>
                {React.Children.map(children, child => (
                    <div className={cn('item')}>{child}</div>
                ))}
            </div>
        );
    }

    const itemsCount = React.Children.count(children);
    const columnConfig = getColumnConfig(itemsCount);

    return (
        <div className={cn({ count: `${itemsCount}` })}>
            <Grid guttersLeft="medium">
                {React.Children.map(children, child => (
                    <GridColumn {...columnConfig} className={cn('column')}>
                        {child}
                    </GridColumn>
                ))}
            </Grid>
        </div>
    );
};

DownloadLinks.propTypes = {
    inOneColumn: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element.isRequired), PropTypes.element]).isRequired,
};

export default DownloadLinks;
