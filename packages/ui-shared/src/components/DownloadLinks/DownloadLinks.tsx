import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate, Grid, GridColumn } from '@megafon/ui-core';
import './DownloadLinks.less';
import { IDownloadLink } from './DownloadLink';

interface IDownloadLinks {
    children: Array<React.ReactElement<IDownloadLink>> | React.ReactElement<IDownloadLink>;
}

const cn = cnCreate('mfui-beta-download-links');
const DownloadLinks: React.FC<IDownloadLinks> = ({ children }) => {
    const itemsCount = React.Children.count(children);

    const renderLinks = React.useCallback(() => {
        const renderColumns = index => {
            switch (true) {
                case (itemsCount === 1): {
                    return (
                        <GridColumn all="6" mobile="12">{children}</GridColumn>
                    );
                }

                case (itemsCount <= 4): {
                    const isIndexEven = !(index % 2);

                    if (!isIndexEven) {
                        return;
                    }

                    return (
                        <GridColumn all="6" mobile="12" className={cn('column')}>
                            <div className={cn('item')}>
                                {children[index]}
                            </div>
                            {children[index + 1] && (
                                <div className={cn('item')}>
                                    {children[index + 1]}
                                </div>
                            )}
                        </GridColumn>
                    );
                }

                default: {
                    return (
                        <GridColumn desktop="4" wide="4" tablet="6" mobile="12" className={cn('column')}>
                            <div className={cn('item')}>
                                {children[index]}
                            </div>
                        </GridColumn>
                    );
                }
            }
        };

        return React.Children.map(children, (_child, index) => renderColumns(index));
    }, []);

    return (
        <div className={cn()}>
            <Grid guttersLeft="medium">
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
