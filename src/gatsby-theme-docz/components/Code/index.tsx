import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { Styled } from 'theme-ui';
import { theme } from '../Playground/theme';
import { cnCreate } from '@megafon/ui-core';
import './Code.less';


const cn = cnCreate('docz-code');

const Code = ({ children, className: outerClassName }) => {
  const [language] = outerClassName
    ? outerClassName.replace(/language-/, '').split(' ')
    : ['text'];

  return (
    <Highlight
      {...defaultProps}
      code={children.trim()}
      language={language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Styled.pre
          className={cn([`${outerClassName || ''} ${className}`])}
          style={{ ...style, overflowX: 'auto' }}
          data-testid="code"
        >
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span
                  {...getTokenProps({ token, key })}
                />
              ))}
            </div>
          ))}
        </Styled.pre>
      )}
    </Highlight>
  )
}

export default Code;
