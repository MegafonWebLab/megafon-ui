import React from 'react';
import Pagination from '../Pagination';

const DemoWrapper = ({ totalPages }) => {
    const [activePage, setActivePage] = React.useState(3);

    return (
        <Pagination
            activePage={activePage}
            totalPages={totalPages}
            onChange={setActivePage}
        />
    );
};

export { DemoWrapper };
