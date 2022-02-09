/* eslint-disable react/no-multi-comp */
import React from 'react';
import { useConfig } from 'docz';
import Iframe from 'react-frame-component';

const CLEAR_PADDING = `<style> body { padding: 0; margin: 0; }  </style>`;
const INITIAL_IFRAME_CONTENT = `<!DOCTYPE html><html><head> ${CLEAR_PADDING} </head><body><div></div></body></html>`;

type ChildWrapper = {
    style?: Record<string, string>;
};

const IframeWrapper: React.FC<ChildWrapper> = ({ children, style }) => (
    <Iframe initialContent={INITIAL_IFRAME_CONTENT} style={style}>
        {children}
    </Iframe>
);

const NormalWrapper: React.FC<ChildWrapper> = ({ children, style }) => <div style={style}>{children}</div>;

type WrapperProps = {
    useScoping?: boolean;
    style?: Record<string, string>;
};

export const Wrapper: React.FC<WrapperProps> = ({ children, useScoping, style }) => {
    const {
        themeConfig: { useScopingInPlayground },
    } = useConfig();

    const Element = useScoping || useScopingInPlayground ? IframeWrapper : NormalWrapper;

    return <Element style={style}>{children}</Element>;
};

export default Wrapper;
