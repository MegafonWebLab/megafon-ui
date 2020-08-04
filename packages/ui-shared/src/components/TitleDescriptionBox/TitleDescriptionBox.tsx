import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
    cnCreate,
    Header,
    Paragraph,
    Grid,
    GridColumn
} from '@megafon/ui-core';
import './TitleDescriptionBox.less';

export interface ITitleDescriptionBoxProps {
    /** Custom className */
    className?: string;
    /** Title */
    title?: string;
    /** Description */
    description?: string;
    /** Text color */
    textColor?: 'white';
    /** Horizontal alignment */
    hAlign?: 'center';
}

const cn = cnCreate('mfui-title-description-box');
const TitleDescriptionBox: React.FC<ITitleDescriptionBoxProps> = ({
    title,
    description,
    textColor,
    hAlign,
    className,
}) => (
    <div
        className={cn(
            { 'h-align': hAlign, 'text-color': textColor },
            className
        )}
    >
        <Grid hAlign={hAlign}>
            <GridColumn wide="8" desktop="10">
                {title && (
                    <Header
                        className={cn('item')}
                        as="h2"
                        color="inherit"
                    >
                        {title}
                    </Header>
                )}
                {description && (
                    <Paragraph
                        className={cn('item')}
                        hasMargin={false}
                        color="inherit"
                    >
                        {description}
                    </Paragraph>
                )}
            </GridColumn>
        </Grid>
    </div>
);

TitleDescriptionBox.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    hAlign: PropTypes.oneOf(['center']),
    textColor: PropTypes.oneOf(['white']),
};

export default TitleDescriptionBox;
