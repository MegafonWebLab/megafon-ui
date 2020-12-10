import * as React from 'react';
import { cnCreate, Carousel} from '@megafon/ui-core';

type CarouselPropsTypes = React.ComponentProps<typeof Carousel>;

const cn = cnCreate('mfui-beta-carousel-box');
const CarouselBox: React.FC<CarouselPropsTypes> = ({ children, ...props }) => (
    <div className={cn()}>
        <Carousel {...props}>
            {children}
        </Carousel>
    </div>
);

export default CarouselBox;
