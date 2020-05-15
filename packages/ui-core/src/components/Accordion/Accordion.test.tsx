import * as React from 'react';
import { mount, shallow } from 'enzyme';
import Accordion, { IAccordionProps  } from './Accordion';

const props: IAccordionProps = {
    title: 'Test',
    children: <div />,
    isOpened: false,
    onClickAccordion: jest.fn(),
};

describe('<Accordion />', () => {
    it('it renders Accordion', () => {
        const wrapper = mount(
            <Accordion {...props} />
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders initially opened Accordion', () => {
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
        const { onClickAccordion, title } = props;
        const wrapper = mount(
            <Accordion {...props} />
        );

        wrapper.find('.mfui-accordion__title-wrap').simulate('click');
        expect(onClickAccordion).toBeCalledWith(wrapper.state('isOpened'), title);
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

    it('checking the opening/closing of the accordion on click', () => {
        const wrapper = mount(
            <Accordion {...props} />
        );

        wrapper.find('.mfui-accordion__title-wrap').simulate('click');
        expect(wrapper.state('isOpened')).toBeTruthy();
        expect(wrapper.find('.mfui-accordion').hasClass('mfui-accordion_open')).toEqual(true);

        wrapper.find('.mfui-accordion__title-wrap').simulate('click');
        expect(wrapper.state('isOpened')).toBeFalsy();
        expect(wrapper.find('.mfui-accordion').hasClass('mfui-accordion_open')).toEqual(false);
    });

    it('test Classes props', () => {
        const propsWithClasses = {
            ...props,
            classes: {
                root: 'testRootClass',
                collapse: 'testCollapseClass',
            },
        };
        const wrapper = shallow(
            <Accordion {...propsWithClasses} />
        );

        expect(wrapper.find('.mfui-accordion').hasClass('testRootClass')).toEqual(true);
        expect(wrapper.find('.mfui-accordion__content').hasClass('testCollapseClass')).toEqual(true);
    });
});
