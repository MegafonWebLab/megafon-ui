import * as React from 'react';
import { shallow } from 'enzyme';
import ProductCardWrapper from './ProductCardWrapper';

const props: {
    hint: {
        title: string;
        color: 'green' | 'orange' | 'black';
    };
} = {
    hint: { title: 'Рекоммендуем', color: 'green' },
};

describe('<ProductCardWrapper />', () => {
    it('it renders ProductCardWrapper', () => {
        const wrapper = shallow(<ProductCardWrapper {...props}><div /></ProductCardWrapper>);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders without hint', () => {
        const wrapper = shallow(<ProductCardWrapper border={{ right: false }}><div /></ProductCardWrapper>);
        expect(wrapper).toMatchSnapshot();
    });

    it('it click on wrapper', () => {
        const wrapper = shallow(<ProductCardWrapper border={{ right: false }}><div /></ProductCardWrapper>);
        const instance = wrapper.instance() as ProductCardWrapper;
        const result = instance.handleClick({ target: {} } as React.MouseEvent<HTMLElement>);
        expect(result).toBe(true);
    });
});
