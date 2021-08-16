/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { shallow } from 'enzyme';
import * as React from 'react';
import BannerBox from './BannerBox';

describe('<BannerBox />', () => {
    it('render BannerBox with default props', () => {
        const wrapper = shallow(
            <BannerBox>
                <div>test</div>
            </BannerBox>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('render BannerBox with props', () => {
        const wrapper = shallow(
            <BannerBox
                loop
                autoPlay
                autoPlayDelay={1000}
                navTheme="green"
                onNextClick={jest.fn()}
                onPrevClick={jest.fn()}
                onDotClick={jest.fn()}
                onChange={jest.fn()}
            >
                <div>test</div>
            </BannerBox>,
        );

        expect(wrapper).toMatchSnapshot();
    });
});
