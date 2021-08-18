import { Header } from '@megafon/ui-core';
import { cnCreate } from '@megafon/ui-helpers';
import PropTypes from 'prop-types';
import * as React from 'react';
import './PictureWithDescription.less';

export const pictureAlignTypes = {
    LEFT: 'left',
    RIGHT: 'right',
} as const;

type PictureAlignTypesType = typeof pictureAlignTypes[keyof typeof pictureAlignTypes];

export interface IPictureWithDescriptionProps {
    /** Ссылка на корневой элемент */
    rootRef?: React.Ref<HTMLDivElement>;
    /** Дополнительный класс для корневого элемента */
    className?: string;
    /** Дополнительные классы для корневого и внутренних элементов */
    classes?: {
        root?: string;
        title?: string;
    };
    /** Заголовок */
    title?: string | React.ReactNode | React.ReactNode[];
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
    className,
    classes = {},
    title,
    pictureUrl,
    pictureAlign = 'left',
    isTextTopAlign,
    children,
}) => (
    <div className={cn([className, classes.root])} ref={rootRef}>
        <div className={cn('picture', { align: pictureAlign })}>
            <img className={cn('img')} src={pictureUrl} alt="" />
        </div>
        <div className={cn('articles', { align: pictureAlign, 'text-top-align': isTextTopAlign })}>
            {!!title && (
                <Header className={cn('title', [classes.title])} as="h2">
                    {title}
                </Header>
            )}
            <div className={cn('content')}>{children}</div>
        </div>
    </div>
);

PictureWithDescription.propTypes = {
    rootRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any]),
    ]),
    className: PropTypes.string,
    classes: PropTypes.shape({
        root: PropTypes.string,
        title: PropTypes.string,
    }),
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    pictureUrl: PropTypes.string.isRequired,
    pictureAlign: PropTypes.oneOf([pictureAlignTypes.LEFT, pictureAlignTypes.RIGHT]),
    isTextTopAlign: PropTypes.bool,
};

export default PictureWithDescription;
