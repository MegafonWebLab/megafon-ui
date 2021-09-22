import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate } from '@megafon/ui-helpers';
import './TextBoxPicture.less';

export const pictureMarginTypes = {
    DEFAULT: 'default',
    BIG_TOP_MARGIN: 'big_top_margin',
    BIG_BOTTOM_MARGIN: 'big_bottom_margin',
    BIG_VERTICAL_MARGIN: 'big_vertical_margin',
} as const;

type PictureMarginTypesType = typeof pictureMarginTypes[keyof typeof pictureMarginTypes];

export interface ITextBoxPictureProps {
    /** URL картинки */
    url: string;
    /** Значение вертикальных отступов */
    margin?: PictureMarginTypesType;
}

const cn = cnCreate('mfui-beta-text-box-picture');
const TextBoxPicture: React.FC<ITextBoxPictureProps> = ({ url, margin = pictureMarginTypes.DEFAULT }) => (
    <div className={cn({ margin })}>
        <img className={cn('img')} src={url} />
    </div>
);

TextBoxPicture.propTypes = {
    url: PropTypes.string.isRequired,
    margin: PropTypes.oneOf([
        pictureMarginTypes.DEFAULT,
        pictureMarginTypes.BIG_TOP_MARGIN,
        pictureMarginTypes.BIG_BOTTOM_MARGIN,
        pictureMarginTypes.BIG_VERTICAL_MARGIN,
    ]),
};

export default TextBoxPicture;
