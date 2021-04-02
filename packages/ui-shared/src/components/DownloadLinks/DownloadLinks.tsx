import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate, Grid, GridColumn } from '@megafon/ui-core';
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
    children: Array<React.ReactElement<IDownloadLink>> | React.ReactElement<IDownloadLink>;
}

const cn = cnCreate('mfui-beta-download-links');
const DownloadLinks: React.FC<IDownloadLinks> = ({ children }) => {
    const itemsCount = React.Children.count(children);
    const columnConfig = getColumnConfig(itemsCount);

    return (
        <div className={cn({ count: `${itemsCount}`})}>
            <Grid guttersLeft="medium">
                {React.Children.map(children, (child) =>
                    <GridColumn {...columnConfig} className={cn('column')}>
                        {child}
                    </GridColumn>
                )}
            </Grid>
        </div>
    );
};

DownloadLinks.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element.isRequired),
        PropTypes.element,
    ]).isRequired,
};

export default DownloadLinks;
