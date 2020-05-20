import * as React from 'react';
import { mount, shallow } from 'enzyme';
import Accordion, { IAccordionProps  } from './Accordion';

const props: IAccordionProps = {
    title: 'Test',
    isOpened: false,
    onClickAccordion: jest.fn(),
};

describe('<Accordion />', () => {
    it('it renders Accordion', () => {
        const wrapper = mount(
            <Accordion {...props}><div /></Accordion>
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('it render Accordion with controlled state', () => {
        const isOpenedProps = {
            ...props,
            isOpened: true,
        };
        const wrapper = mount(
            <Accordion {...isOpenedProps}><div /></Accordion>
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('it handle click title', () => {
        const { onClickAccordion, title, isOpened } = props;
        const wrapper = mount(
            <Accordion {...props}><div /></Accordion>
        );

        wrapper.find('.mfui-accordion__title-wrap').simulate('click');
        expect(onClickAccordion).toBeCalledWith(!isOpened, title);
    });

    it('should not open Accordion when prev isOpened props matches next isOpened props', () => {
        const wrapper = mount(
            <Accordion {...props}><div /></Accordion>
        );

        expect(wrapper.find('.mfui-accordion').hasClass('mfui-accordion_open')).toEqual(false);
        wrapper.setProps({ isOpened: false });
        wrapper.update();
        expect(wrapper.find('.mfui-accordion').hasClass('mfui-accordion_open')).toEqual(false);
    });

    it('checking the opening/closing of the accordion on click', () => {
        const wrapper = mount(
            <Accordion {...props}><div /></Accordion>
        );

        wrapper.find('.mfui-accordion__title-wrap').simulate('click');
        expect(wrapper.find('.mfui-accordion').hasClass('mfui-accordion_open')).toEqual(true);

        wrapper.find('.mfui-accordion__title-wrap').simulate('click');
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
            <Accordion {...propsWithClasses}><div /></Accordion>
        );

        expect(wrapper.find('.mfui-accordion').hasClass('testRootClass')).toEqual(true);
        expect(wrapper.find('.mfui-accordion__content').hasClass('testCollapseClass')).toEqual(true);
    });

    describe('testing the behavior of the Accordion when changing the external props - isOpened', () => {
        it('first value of isOpened - true, then it changes to false', () => {
            const isOpenedProps = {
                ...props,
                isOpened: true,
            };
            const wrapper = mount(
                <Accordion {...isOpenedProps}><div /></Accordion>
            );

            expect(wrapper.find('.mfui-accordion').hasClass('mfui-accordion_open')).toEqual(true);
            wrapper.setProps({ isOpened: false });
            wrapper.update();
            expect(wrapper.find('.mfui-accordion').hasClass('mfui-accordion_open')).toEqual(false);
        });

        it('first value of isOpened - false, then it changes to true', () => {
            const wrapper = mount(
                <Accordion {...props}><div /></Accordion>
            );

            expect(wrapper.find('.mfui-accordion').hasClass('mfui-accordion_open')).toEqual(false);
            wrapper.setProps({ isOpened: true });
            wrapper.update();
            expect(wrapper.find('.mfui-accordion').hasClass('mfui-accordion_open')).toEqual(true);
        });

        it('first value of isOpened - false, then it changes to false', () => {
            const wrapper = mount(
                <Accordion {...props}><div /></Accordion>
            );

            expect(wrapper.find('.mfui-accordion').hasClass('mfui-accordion_open')).toEqual(false);
            wrapper.setProps({ isOpened: false });
            wrapper.update();
            expect(wrapper.find('.mfui-accordion').hasClass('mfui-accordion_open')).toEqual(false);
        });

        it('first value of isOpened - true, then it changes to true', () => {
            const isOpenedProps = {
                ...props,
                isOpened: true,
            };
            const wrapper = mount(
                <Accordion {...isOpenedProps}><div /></Accordion>
            );

            expect(wrapper.find('.mfui-accordion').hasClass('mfui-accordion_open')).toEqual(true);
            wrapper.setProps({ isOpened: true });
            wrapper.update();
            expect(wrapper.find('.mfui-accordion').hasClass('mfui-accordion_open')).toEqual(true);
        });
    });
});
