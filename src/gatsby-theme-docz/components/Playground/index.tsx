import React from 'react'
import { LiveProvider, LiveError, LivePreview, LiveEditor } from 'react-live'
import { Wrapper } from './Wrapper';
import { theme } from './theme';
import { cnCreate } from '@megafon/ui-core';
import './Playground.less';
import { PlaygroundProps } from 'docz/dist/hooks/useComponents';
import { Language } from 'prism-react-renderer';
import copy from 'copy-text-to-clipboard'

const transformCode = (code: string) => {
    if (code.startsWith('()') || code.startsWith('class')) return code;
    return `<React.Fragment>${code}</React.Fragment>`;
}

const copyIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 6V2H2V16H9V6H13ZM15 6H24V24H9V18H0V0H15V6ZM11 8V22H22V8H11Z" fill="#D8D8D8"/>
    </svg>
);

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
                            {copyIcon}
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
