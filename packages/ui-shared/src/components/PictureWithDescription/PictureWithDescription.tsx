import * as React from 'react';
import PropTypes from 'prop-types';
import './PictureWithDescription.less';
import { cnCreate } from '@megafon/ui-core';

export const pictureAlignTypes = {
    LEFT: 'left',
    RIGHT: 'right',
} as const;

type PictureAlignTypesType = typeof pictureAlignTypes[keyof typeof pictureAlignTypes];

export interface IPictureWithDescriptionProps {
    /** Url изображения */
    pictureUrl: string;
    /** Расположение изображения */
    pictureAlign?: PictureAlignTypesType;
}

const cn = cnCreate('mfui-beta-picture-with-description');
const PictureWithDescription: React.FC<IPictureWithDescriptionProps> = ({
    pictureUrl,
    pictureAlign = 'left',
    children,
}) => (
    <div className={cn()}>
        <div className={cn('picture', { align: pictureAlign })}>
            <img className={cn('img')} src={pictureUrl} alt="" />
        </div>
        <div className={cn('articles', { align: pictureAlign })}>
            {children}
        </div>
    </div>
);

PictureWithDescription.propTypes = {
    pictureUrl: PropTypes.string.isRequired,
    pictureAlign: PropTypes.oneOf([pictureAlignTypes.LEFT, pictureAlignTypes.RIGHT]),
};

export default PictureWithDescription;
