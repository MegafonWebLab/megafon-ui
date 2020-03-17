import * as React from 'react';

export const CarouselWrapper = ({ children }) => <div style={{ padding: 32 }}>{children}</div>;

export const carouselParams = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    variableWidth: true,
    responsive: [
        {
            breakpoint: 1000,
            settings: {
                arrows: false,
                dots: true,
                slidesToShow: 3
            }
        },
        {
            breakpoint: 900,
            settings: {
                arrows: true,
                dots: true
            }
        },
        {
            breakpoint: 860,
            settings: {
                arrows: false,
                dots: true
            }
        }
    ]
};
