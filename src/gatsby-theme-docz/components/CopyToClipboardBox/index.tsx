import React from 'react';
import './CopyToClipboardBox.less';
import cnCreate from 'utils/cnCreate';
import Copy from 'icons/System/24/Copy_24.svg';

const cn = cnCreate('copy-to-clipboard-box');

interface IProps {
    importPath: string;
}

const CopyToClipboardBox: React.FC<IProps> = ({ importPath }) => {
    const createElToClipboard = () => {
        const el = document.createElement('textarea');

        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);

        return () => {
            el.value = importPath;
            el.select();
            document.execCommand('copy');
        };
    };

    return (
        <div className={cn()}>
            <code>{importPath}</code>
            <a title="Скопировать в буфер" className={cn('button')}>
                <Copy
                    className={cn('icon')}
                    onClick={createElToClipboard()}
                />
            </a>
        </div>
    );
};

export default CopyToClipboardBox;
