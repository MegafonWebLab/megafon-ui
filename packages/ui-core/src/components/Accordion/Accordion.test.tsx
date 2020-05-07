import * as React from 'react';
import { mount } from 'enzyme';
import Accordion, { IAccordionProps } from './Accordion';

const props: IAccordionProps = {
    title: 'Test',
    children: <div />,
    isOpened: false,
    theme: 'default',
    onClickAccordion: jest.fn(),
};

describe('<Accordion />', () => {
    it('it renders Accordion', () => {
        const wrapper = mount(
            <Accordion {...props} />
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders opened Accordion', () => {
        const isOpenedProps = {
            ...props,
            isOpened: true,
        };
        const wrapper = mount(
            <Accordion {...isOpenedProps} />
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('it handle click title', () => {
        const { onClickAccordion } = props;
        const wrapper = mount(
            <Accordion {...props} />
        );

        wrapper.find('.mfui-accordion__title-wrap').simulate('click');
        expect(onClickAccordion).toBeCalled();
    });

    it('should calls setState when prev isOpened props not matches next isOpened props', () => {
        const wrapper = mount(
            <Accordion {...props} />
        );
        const setState = jest.spyOn(wrapper.instance(), 'setState');

        wrapper.setProps({ isOpened: true });
        expect(setState).toBeCalled();
        expect(wrapper.state('isOpened')).toBeTruthy();
    });

    it('should not calls setState when prev isOpened props matches next isOpened props', () => {
        const wrapper = mount(
            <Accordion {...props} />
        );
        const setState = jest.spyOn(wrapper.instance(), 'setState');

        wrapper.setProps({ isOpened: false });
        expect(setState).not.toBeCalled();
    });
});
