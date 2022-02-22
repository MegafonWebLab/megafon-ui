import * as React from 'react';
import { TextLink } from '@megafon/ui-core';
import { cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import DownloadIcon from '@megafon/ui-icons/basic-32-download_32.svg';
import * as PropTypes from 'prop-types';
import './DownloadLink.less';

export interface IDownloadLink {
    /** Дополнительные data атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
        link?: Record<string, string>;
    };
    /** Ссылка на корневой элемент */
    rootRef?: React.Ref<HTMLDivElement>;
    /** Адресы ссылки */
    href: string;
    /** Текст ссылки */
    text: string;
    /** Расширение файла */
    extension: string;
    /** Размер файла */
    fileSize: string;
    /** Дополнительный класс для компонента */
    className?: string;
    /** Дополнительные классы для корневого и внутренних элементов */
    classes?: {
        root?: string;
        link?: string;
    };
    /** Обработчик клика по ссылке */
    onClick?: (e: React.SyntheticEvent<EventTarget>) => void;
}

const cn = cnCreate('mfui-download-link');
const DownloadLink: React.FC<IDownloadLink> = ({
    href,
    text,
    extension,
    fileSize,
    onClick,
    className,
    classes = {},
    rootRef,
    dataAttrs,
}) => (
    <div {...filterDataAttrs(dataAttrs?.root)} className={cn([className, classes.root])} ref={rootRef}>
        <div className={cn('icon')}>
            <DownloadIcon className={cn('icon-svg')} />
        </div>
        <div>
            <TextLink
                download
                href={href}
                onClick={onClick}
                dataAttrs={{ root: dataAttrs?.link }}
                className={cn('link', [classes.link])}
            >
                {text}
            </TextLink>
            <p className={cn('info')}>{`${extension}${extension && fileSize ? ',' : ''} ${fileSize}`}</p>
        </div>
    </div>
);

DownloadLink.propTypes = {
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
        link: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    rootRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any]),
    ]),
    href: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    extension: PropTypes.string.isRequired,
    fileSize: PropTypes.string.isRequired,
    className: PropTypes.string,
    classes: PropTypes.shape({
        root: PropTypes.string,
        link: PropTypes.string,
    }),
    onClick: PropTypes.func,
};

export default DownloadLink;
