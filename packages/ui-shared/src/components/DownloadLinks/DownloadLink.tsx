import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate, TextLink } from '@megafon/ui-core';
import './DownloadLink.less';
import DownloadIcon from 'icons/Basic/32/Download_32.svg';

export interface IDownloadLink {
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
    /** Обработчик клика по ссылке */
    onClick?: (e: React.SyntheticEvent<EventTarget>) => void;
}

const cn = cnCreate('mfui-beta-download-link');
const DownloadLink: React.FC<IDownloadLink> = ({ href, text, extension, fileSize, onClick, className }) =>
   (
        <div className={cn([className])}>
            <div className={cn('icon')}>
                <DownloadIcon className={cn('icon-svg')}/>
            </div>
            <div>
                <TextLink className={cn('link')} href={href} onClick={onClick} download>{text}</TextLink>
                <p className={cn('info')}>
                    {`${extension}, ${fileSize}`}
                </p>
            </div>
        </div>
   );

DownloadLink.propTypes = {
    href: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    extension: PropTypes.string.isRequired,
    fileSize: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default DownloadLink;
