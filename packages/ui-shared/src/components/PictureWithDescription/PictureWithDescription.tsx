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
    /** Ссылка на корневой элемент */
    rootRef?: React.Ref<HTMLDivElement>;
    /** Url изображения */
    pictureUrl: string;
    /** Расположение изображения */
    pictureAlign?: PictureAlignTypesType;
    /** Выравнивание текста по верхнему краю */
    isTextTopAlign?: boolean;
}

const cn = cnCreate('mfui-beta-picture-with-description');
const PictureWithDescription: React.FC<IPictureWithDescriptionProps> = ({
    rootRef,
    pictureUrl,
    pictureAlign = 'left',
    isTextTopAlign,
    children,
}) => (
    <div className={cn()} ref={rootRef}>
        <div className={cn('picture', { align: pictureAlign })}>
            <img className={cn('img')} src={pictureUrl} alt="" />
        </div>
        <div className={cn('articles', { align: pictureAlign, 'text-top-align': isTextTopAlign })}>
            {children}
        </div>
    </div>
);

PictureWithDescription.propTypes = {
    rootRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any ]),
    ]),
    pictureUrl: PropTypes.string.isRequired,
    pictureAlign: PropTypes.oneOf([pictureAlignTypes.LEFT, pictureAlignTypes.RIGHT]),
    isTextTopAlign: PropTypes.bool,
};

export default PictureWithDescription;
