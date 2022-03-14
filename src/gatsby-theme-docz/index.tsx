import React from 'react';
import { theme, ComponentsProvider } from 'docz';
import Code from './components/Code';
import CopyToClipboardBox from './components/CopyToClipboardBox';
import { h1, h2, h3, h5 } from './components/Header';
import Layout from './components/Layout';
import { Playground } from './components/Playground';
import { Props } from './components/Props';
import { td, th, table } from './components/Table';
import { DoczTabs } from './components/Tabs';
import loadFonts from './loadFonts';
import '@megafon/ui-core/styles/base.less';
import './index.less';

const map = {
    h1,
    h2,
    h3,
    h5,
    p: ({ children }) => <p style={{ margin: '0 0 24px 0', maxWidth: '1040px' }}>{children}</p>,
    props: Props,
    code: Code,
    td,
    th,
    table,
    playground: Playground,
    layout: Layout,
    DoczTabs,
    CopyToClipboardBox,
};

const Theme = ({ children }) => {
    React.useEffect(() => {
        loadFonts();
    }, []);

    return <ComponentsProvider components={map}>{children}</ComponentsProvider>;
};

const themeConfig = {};

export default theme(themeConfig)(Theme);
