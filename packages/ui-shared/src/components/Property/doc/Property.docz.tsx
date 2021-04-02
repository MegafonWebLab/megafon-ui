import React from 'react';
import './DemoWrapper.less';

export const valueInSeveralRow =
    `до 100 Гб
    и до 1200 минут
`;

export const DemoWrapper = ({ children }) => <div className="demo-wrapper">{children}</div>;
