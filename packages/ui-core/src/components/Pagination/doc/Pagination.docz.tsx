import React from 'react';
import Pagination from '../Pagination';

const DemoWrapper = ({ totalPages }) => {
    const [activePage, setActivePage] = React.useState(3);

    const handleChange = (value) => {
       setActivePage(value);
    };

    return (
        <Pagination
            activePage={activePage}
            totalPages={totalPages}
            onChange={handleChange}
        />
    );
};

export { DemoWrapper };
