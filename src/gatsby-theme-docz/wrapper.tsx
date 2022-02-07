import React from 'react';
import { Helmet } from 'react-helmet-async';

const Wrapper: React.FC = ({ children }) => (
    <>
        <Helmet>
            <meta name="robots" content="noindex, nofollow" />
            <link rel="icon" type="image/png" href="/src/public/mf-icon.png" />
        </Helmet>
        {children}
    </>
);

export default Wrapper;
