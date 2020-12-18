import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate, Grid, GridColumn } from '@megafon/ui-core';
import './DownloadLinks.less';
import { IDownloadLink } from './DownloadLink';
import { ColumnConfig } from './types';

const getColumnConfig = (itemsCount): ColumnConfig => {
    switch (true) {
        case (itemsCount <= 4): {
            return {
                all: '6',
                mobile: '12',
            };
        }

        default: {
            return {
                all: '4',
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
    const columnConfig = getColumnConfig(React.Children.count(children));

    const renderLinks = React.useCallback(() => {
        const childrenWithProps = React.Children.map(children, (child: React.ReactElement<IDownloadLink>) =>
            React.cloneElement(child, { className: cn('item')})
        );

        return React.Children.map(childrenWithProps, (_child, index) => {
            const isIndexEven = !(index % 2);

            if (!isIndexEven) {
                return;
            }

            return (
                <GridColumn {...columnConfig} key={index}>
                    {childrenWithProps[index]}
                    {childrenWithProps[index + 1]}
                </GridColumn>
            );
        });
    }, []);

    return (
        <div className={cn()}>
            <Grid guttersBottom="medium" guttersLeft="medium">
                {renderLinks()}
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
