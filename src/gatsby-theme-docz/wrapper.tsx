import React from 'react'
import { Helmet } from 'react-helmet-async'

const Wrapper = ({ children }) => {
    return (
        <>
            <Helmet>
                <meta name="robots" content="noindex, nofollow" />
                <link rel="icon" type="image/png" href="/public/mf-icon.png" />
            </Helmet>
            {children}
        </>
    )
}

export default Wrapper;
