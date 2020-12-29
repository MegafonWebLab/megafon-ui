import React from 'react';
import './ImportExample.less';
import cnCreate from 'utils/cnCreate';
import Copy from 'icons/System/24/Copy_24.svg';

const cn = cnCreate('import-example');

interface IProps {
    name: string;
}

const ImportExample: React.FC<IProps> = ({ name }) => {
    const importPath = `import { ${name} } from '@megafon/ui-core';`;

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
            <code className={cn('code')}>{importPath}</code>
            <a title="Скопировать в буфер" className={cn('button')}>
                <Copy
                    className={cn('icon')}
                    onClick={createElToClipboard()}
                />
            </a>
        </div>
    );
};

export default ImportExample;
