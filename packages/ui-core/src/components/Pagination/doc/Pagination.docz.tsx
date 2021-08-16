/* eslint-disable no-magic-numbers */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React from 'react';
import Pagination from '../Pagination';

const DemoWrapper = ({ totalPages }: Record<string, number>): JSX.Element => {
    const [activePage, setActivePage] = React.useState(3);

    return <Pagination activePage={activePage} totalPages={totalPages} onChange={setActivePage} />;
};

export default DemoWrapper;
