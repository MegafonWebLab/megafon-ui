import * as React from 'react';
import * as PropTypes from 'prop-types';
import { TextLink } from '@megafon/ui-core';
import { cnCreate } from '@megafon/ui-helpers';
import './DownloadLink.less';
import DownloadIcon from '@megafon/icons/dist/basic-32-download_32.svg';

export interface IDownloadLink {
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

const cn = cnCreate('mfui-beta-download-link');
const DownloadLink: React.FC<IDownloadLink> = ({
    href,
    text,
    extension,
    fileSize,
    onClick,
    className,
    classes = {},
    rootRef,
}) =>
   (
        <div className={cn([className, classes.root])} ref={rootRef}>
            <div className={cn('icon')}>
                <DownloadIcon className={cn('icon-svg')}/>
            </div>
            <div>
                <TextLink
                    className={cn('link', [classes.link])}
                    href={href}
                    onClick={onClick}
                    download
                >
                    {text}
                </TextLink>
                <p className={cn('info')}>
                    {`${extension}${extension && fileSize ? ',' : ''} ${fileSize}`}
                </p>
            </div>
        </div>
   );

DownloadLink.propTypes = {
    rootRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any ]),
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
