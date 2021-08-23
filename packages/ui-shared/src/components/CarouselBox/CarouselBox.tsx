import { Carousel } from '@megafon/ui-core';
import { cnCreate } from '@megafon/ui-helpers';
import * as React from 'react';

type CarouselPropsTypes = React.ComponentProps<typeof Carousel>;

const cn = cnCreate('mfui-beta-carousel-box');
const CarouselBox: React.FC<CarouselPropsTypes> = ({ children, ...props }) => (
    <div className={cn()}>
        <Carousel {...props}>{children}</Carousel>
    </div>
);

export default CarouselBox;
