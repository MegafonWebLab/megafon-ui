import * as React from 'react';
import Carousel from '../Carousel';

export const DemoSlide = ({ children }) => {
    return (
        <div
            style={{
                height: '200px',
                backgroundColor: '#f3f3f3',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                fontSize: '30px',
            }}
        >
            {children}
        </div>
    );
};
