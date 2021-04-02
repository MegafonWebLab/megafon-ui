import React from 'react'
import { Helmet } from 'react-helmet-async'

const Wrapper = ({ children }) => {
    return (
        <>
            <Helmet>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            {children}
        </>
    )
}

export default Wrapper;
