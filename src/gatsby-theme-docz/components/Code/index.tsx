import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { Styled } from 'theme-ui';
import { theme } from '../Playground/theme';
import { Collapse, TextLink, cnCreate } from '@megafon/ui-core';
import './Code.less';

const cn = cnCreate('docz-code');
const Code = ({children, className: outerClassName, ...meta}) => {
    const metaString = meta && meta.metastring || '';
    const hasCollapse = meta && (!!meta.collapse || metaString.includes('collapse'));
    const metaStringSplited = metaString.split('=');
    const collapseTitle = metaStringSplited.length >= 2 ? metaStringSplited[1] : 'Expand';

    const [language] = outerClassName
        ? outerClassName.replace(/language-/, '').split(' ')
        : ['text'];

    const [isOpened, setIsOpened] = React.useState(false);

    const handleClick = (): void => {
        setIsOpened(!isOpened);
    };

    const renderCodeBlock = () => (
        <Highlight
            {...defaultProps}
            code={children.trim()}
            language={language}
            theme={theme}
        >
            {({className, style, tokens, getLineProps, getTokenProps}) => (
                <Styled.pre
                    className={cn('code-block', [`${outerClassName || ''} ${className}`])}
                    style={{...style, overflowX: 'auto'}}
                    data-testid="code"
                >
                    {tokens.map((line, i) => (
                        <div {...getLineProps({line, key: i})}>
                            {line.map((token, key) => (
                                <span
                                    {...getTokenProps({token, key})}
                                />
                            ))}
                        </div>
                    ))}
                </Styled.pre>
            )}
        </Highlight>
    );

    return (
        <div className={cn()}>
            {
                hasCollapse ? (
                    <>
                        <TextLink onClick={handleClick} underlineStyle="dashed">
                            {`${collapseTitle}...`}
                        </TextLink>
                        <Collapse isOpened={isOpened} className={cn('wrapper')} classNameContainer={cn('inner')}>
                            {renderCodeBlock()}
                        </Collapse>
                    </>
                ) : renderCodeBlock()
            }
        </div>
    )
}

export default Code;
