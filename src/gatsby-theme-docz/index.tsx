import React from 'react'
import './index.less';
import Layout from './components/Layout';
import Props from './components/Props';
import Playground from './components/Playground';
import { theme, ComponentsProvider } from 'docz';
import { h1, h2, h3, h5 } from './components/Header'
import { DoczTabs } from './components/Tabs';
import Code from './components/Code';
import { td, th, table } from './components/Table';

const map = {
    h1,
    h2,
    h3,
    h5,
    p: ({ children }) => <p style={{ margin: "0 0 24px 0" }}>{children}</p>,
    props: Props,
    code: Code,
    td: td,
    th: th,
    table: table,
    playground: Playground,
    layout: Layout,
    DoczTabs: DoczTabs,
};

const Theme = ({ children }) => {
    return (
        <ComponentsProvider components={map}>
            {children}
        </ComponentsProvider>
    );
};

const themeConfig = {};

export default theme(themeConfig)(Theme);
