import * as React from 'react';
import { shallow } from 'enzyme';
import MainTileWrapper from './MainTileWrapper';

const props: {
    hint: {
        title: string;
        color: 'green' | 'orange' | 'black';
    };
} = {
    hint: { title: 'Рекоммендуем', color: 'green' },
};

describe('<MainTileWrapper />', () => {
    it('it renders MainTileWrapper', () => {
        const wrapper = shallow(<MainTileWrapper {...props}><div /></MainTileWrapper>);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders without hint', () => {
        const wrapper = shallow(<MainTileWrapper IsBorderRight={false}><div /></MainTileWrapper>);
        expect(wrapper).toMatchSnapshot();
    });

    it('it click on wrapper', () => {
        const wrapper = shallow(<MainTileWrapper IsBorderRight={false}><div /></MainTileWrapper>);
        const instance = wrapper.instance() as MainTileWrapper;
        const result = instance.handleClick({ target: {} } as React.SyntheticEvent<EventTarget>);
        expect(result).toBe(true);
    });
});
