import * as React from 'react';
import { shallow } from 'enzyme';
import CarouselBlock from 'components/CarouselBlock/CarouselBlock';

describe('<CarouselBlock />', () => {
    it('render CarouselBlock', () => {
        const wrapper = shallow(
            <CarouselBlock>
                <div>test</div>
            </CarouselBlock>
        );

        expect(wrapper).toMatchSnapshot();
    });
});
