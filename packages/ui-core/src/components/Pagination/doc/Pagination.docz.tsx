import React from 'react';
import Pagination from '../Pagination';

const DemoWrapper = ({ totalPages }: Record<string, number>): JSX.Element => {
    const defaultActivePage = 3;
    const [activePage, setActivePage] = React.useState(defaultActivePage);

    return <Pagination activePage={activePage} totalPages={totalPages} onChange={setActivePage} />;
};

// eslint-disable-next-line import/prefer-default-export
export { DemoWrapper };
