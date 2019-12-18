import * as React from 'react';
import { shallow } from 'enzyme';
import Paragraph from './Paragraph';

describe('<Paragraph />', () => {
    describe('onClick prop', () => {
        it('calls on click event', () => {
            const mock = jest.fn();
            const event = { target: 'p' };
            const wrapper = shallow(<Paragraph onClick={mock}>Text</Paragraph>);
            wrapper.simulate('click', event);
            expect(mock).toBeCalledWith(event);
        });
    });

    it('it renders Paragraph', () => {
        const wrapper = shallow(<Paragraph>Text</Paragraph>);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders Paragraph with div element as wrapper', () => {
        const wrapper = shallow(<Paragraph as="div">Text</Paragraph>);

        expect(wrapper).toMatchSnapshot();
    });
});
