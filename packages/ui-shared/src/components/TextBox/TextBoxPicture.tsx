import * as React from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import './TextBoxPicture.less';

export const pictureMarginTypes = {
    DEFAULT: 'default',
    BIG_TOP: 'big-top',
    BIG_BOTTOM: 'big-bottom',
    BIG_VERTICAL: 'big-vertical',
} as const;

type PictureMarginTypesType = typeof pictureMarginTypes[keyof typeof pictureMarginTypes];

export interface ITextBoxPictureProps {
    /** URL картинки */
    url: string;
    /** Значение вертикальных отступов */
    margin?: PictureMarginTypesType;
    /** Текст для изображения */
    alt?: string;
}

const cn = cnCreate('mfui-text-box-picture');
const TextBoxPicture: React.FC<ITextBoxPictureProps> = ({ url, margin = pictureMarginTypes.DEFAULT, alt }) => (
    <div className={cn({ margin })}>
        <img className={cn('img')} src={url} alt={alt} />
    </div>
);

TextBoxPicture.propTypes = {
    url: PropTypes.string.isRequired,
    margin: PropTypes.oneOf([
        pictureMarginTypes.DEFAULT,
        pictureMarginTypes.BIG_TOP,
        pictureMarginTypes.BIG_BOTTOM,
        pictureMarginTypes.BIG_VERTICAL,
    ]),
    alt: PropTypes.string,
};

export default TextBoxPicture;
