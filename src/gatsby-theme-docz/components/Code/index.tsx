/* eslint-disable react/jsx-props-no-spreading,react/jsx-pascal-case */
import React from 'react';
import { Collapse, TextLink } from '@megafon/ui-core';
import { cnCreate } from '@megafon/ui-helpers';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import { Styled } from 'theme-ui';
import './Code.less';

const META_DEFAULT_LENGTH = 2;

interface ICodeProps {
    className: string;
    metastring?: string;
    collapse?: string;
    children: string;
}

const cn = cnCreate('docz-code');
const Code: React.FC<ICodeProps> = ({ children, className: outerClassName, ...meta }) => {
    const metaString = meta?.metastring || '';
    const hasCollapse = !!meta?.collapse || metaString.includes('collapse');
    const metaStringSplited = metaString.split('=');
    const collapseTitle = metaStringSplited.length >= META_DEFAULT_LENGTH ? metaStringSplited[1] : 'Expand';

    const [language] = (outerClassName ? outerClassName.replace(/language-/, '').split(' ') : ['text']) as [Language];

    const [isOpened, setIsOpened] = React.useState(false);

    const handleClick = (): void => {
        setIsOpened(!isOpened);
    };

    const renderCodeBlock = () => (
        <Highlight {...defaultProps} code={children.trim()} language={language} theme={undefined}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <Styled.pre
                    className={cn('code-block', [outerClassName, className])}
                    style={{ ...style, overflowX: 'auto' }}
                    data-testid="code"
                >
                    {tokens.map((line, i) => (
                        <div {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => (
                                <span {...getTokenProps({ token, key })} />
                            ))}
                        </div>
                    ))}
                </Styled.pre>
            )}
        </Highlight>
    );

    return (
        <div className={cn()}>
            {hasCollapse ? (
                <>
                    <TextLink onClick={handleClick} underlineStyle="dashed">
                        {collapseTitle}
                    </TextLink>
                    <Collapse isOpened={isOpened} className={cn('wrapper')} classNameContainer={cn('inner')}>
                        {renderCodeBlock()}
                    </Collapse>
                </>
            ) : (
                renderCodeBlock()
            )}
        </div>
    );
};

export default Code;
