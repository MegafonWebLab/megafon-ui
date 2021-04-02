import React from 'react'
import { LiveProvider, LiveError, LivePreview, LiveEditor } from 'react-live'
import { Wrapper } from './Wrapper';
import { theme } from './theme';
import { cnCreate } from '@megafon/ui-core';
import './Playground.less';
import { PlaygroundProps } from 'docz/dist/hooks/useComponents';
import { Language } from 'prism-react-renderer';
import Copy from 'icons/System/24/Copy_24.svg';
import copy from 'copy-text-to-clipboard'

const transformCode = (code: string) => {
    if (code.startsWith('()') || code.startsWith('class')) return code;
    return `<React.Fragment>${code}</React.Fragment>`;
}

const cn = cnCreate('docz-playground');

export const Playground: React.FC<PlaygroundProps & { useScoping?: boolean }> = ({
    style, code, scope, language, useScoping = false, showEditor = true,
}) => {
    const [scopeOnMount] = React.useState(scope);
    const copyCode = () => copy(code);

    return (
        <LiveProvider
            code={code}
            scope={scopeOnMount}
            transformCode={transformCode}
            language={language as Language}
            theme={theme}
        >
            <div className={cn('preview')}>
                <Wrapper content="preview">
                    <LivePreview className={cn('preview-content')} data-testid="live-preview" style={style} />
                </Wrapper>
            </div>
            {showEditor &&
                <Wrapper
                    content="editor"
                    useScoping={useScoping}
                >
                    <div className={cn('editor')}>
                        <button className={cn('copy')} onClick={copyCode}>
                            <Copy className={cn('icon')} />
                        </button>
                        <LiveEditor data-testid="live-editor" />
                    </div>
                </Wrapper>
            }
            <LiveError data-testid="live-error" />
        </LiveProvider>
    )
}

export default Playground;
