import { mount } from 'enzyme';
import * as React from 'react';
import Accordion, { IAccordionProps } from './Accordion';

const props: IAccordionProps = {
    title: 'Test',
    isOpened: false,
    hasVerticalPaddings: false,
    dataAttrs: {
        'data-test': 'data-test-value',
    },
    onClickAccordion: jest.fn(),
};

describe('<Accordion />', () => {
    it('it renders Accordion', () => {
        const wrapper = mount(
            <Accordion {...props}>
                <div />
            </Accordion>,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('it render Accordion with vertical inner paddings', () => {
        const newProps = {
            ...props,
            hasVerticalPaddings: true,
        };
        const wrapper = mount(
            <Accordion {...newProps}>
                <div />
            </Accordion>,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('it render Accordion with controlled state', () => {
        const isOpenedProps = {
            ...props,
            isOpened: true,
        };
        const wrapper = mount(
            <Accordion {...isOpenedProps}>
                <div />
            </Accordion>,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('it handle click title', () => {
        const { onClickAccordion, title, isOpened } = props;
        const wrapper = mount(
            <Accordion {...props}>
                <div />
            </Accordion>,
        );

        wrapper.find('.mfui-beta-accordion__title-wrap').simulate('click');
        expect(onClickAccordion).toBeCalledWith(!isOpened, title);
    });

    it('checking the opening/closing of the accordion on click', () => {
        const wrapper = mount(
            <Accordion {...props}>
                <div />
            </Accordion>,
        );

        wrapper.find('.mfui-beta-accordion__title-wrap').simulate('click');
        expect(wrapper.find('.mfui-beta-accordion').hasClass('mfui-beta-accordion_open')).toEqual(true);

        wrapper.find('.mfui-beta-accordion__title-wrap').simulate('click');
        expect(wrapper.find('.mfui-beta-accordion').hasClass('mfui-beta-accordion_open')).toEqual(false);
    });

    it('test Classes props', () => {
        const propsWithClasses = {
            ...props,
            className: 'testClassName',
            classes: {
                openedClass: 'testIsOpenClass',
                root: 'testRootClass',
                collapse: 'testCollapseClass',
                titleWrap: 'testTitleWrapClass',
            },
        };
        const wrapper = mount(
            <Accordion {...propsWithClasses}>
                <div />
            </Accordion>,
        );
        const rootNode = wrapper.find('.mfui-beta-accordion');
        const contentNode = wrapper.find('Collapse');
        const titleWrapNode = wrapper.find('.mfui-beta-accordion__title-wrap');

        expect(rootNode.hasClass('testClassName')).toEqual(true);
        expect(rootNode.hasClass('testRootClass')).toEqual(true);
        expect(rootNode.hasClass('testIsOpenClass')).toEqual(false);
        expect(contentNode.hasClass('testCollapseClass')).toEqual(true);
        expect(titleWrapNode.hasClass('testTitleWrapClass')).toEqual(true);

        titleWrapNode.simulate('click');
        wrapper.update();

        const newRootNode = wrapper.find('.mfui-beta-accordion');

        expect(newRootNode.hasClass('testIsOpenClass')).toEqual(true);
    });

    describe('testing the behavior of the Accordion when changing the external props - isOpened', () => {
        it('first value of isOpened - true, then it changes to false', () => {
            const isOpenedProps = {
                ...props,
                isOpened: true,
            };
            const wrapper = mount(
                <Accordion {...isOpenedProps}>
                    <div />
                </Accordion>,
            );

            expect(wrapper.find('.mfui-beta-accordion').hasClass('mfui-beta-accordion_open')).toEqual(true);
            wrapper.setProps({ isOpened: false });
            wrapper.update();
            expect(wrapper.find('.mfui-beta-accordion').hasClass('mfui-beta-accordion_open')).toEqual(false);
        });

        it('first value of isOpened - false, then it changes to true', () => {
            const wrapper = mount(
                <Accordion {...props}>
                    <div />
                </Accordion>,
            );

            expect(wrapper.find('.mfui-beta-accordion').hasClass('mfui-beta-accordion_open')).toEqual(false);
            wrapper.setProps({ isOpened: true });
            wrapper.update();
            expect(wrapper.find('.mfui-beta-accordion').hasClass('mfui-beta-accordion_open')).toEqual(true);
        });

        it('first value of isOpened - false, then it changes to false', () => {
            const wrapper = mount(
                <Accordion {...props}>
                    <div />
                </Accordion>,
            );

            expect(wrapper.find('.mfui-beta-accordion').hasClass('mfui-beta-accordion_open')).toEqual(false);
            wrapper.setProps({ isOpened: false });
            wrapper.update();
            expect(wrapper.find('.mfui-beta-accordion').hasClass('mfui-beta-accordion_open')).toEqual(false);
        });

        it('first value of isOpened - true, then it changes to true', () => {
            const isOpenedProps = {
                ...props,
                isOpened: true,
            };
            const wrapper = mount(
                <Accordion {...isOpenedProps}>
                    <div />
                </Accordion>,
            );

            expect(wrapper.find('.mfui-beta-accordion').hasClass('mfui-beta-accordion_open')).toEqual(true);
            wrapper.setProps({ isOpened: true });
            wrapper.update();
            expect(wrapper.find('.mfui-beta-accordion').hasClass('mfui-beta-accordion_open')).toEqual(true);
        });

        it('should return reference to root element', () => {
            const ref: React.RefObject<HTMLDivElement> = React.createRef();
            mount(
                <Accordion {...props} rootRef={ref}>
                    <div />
                </Accordion>,
            );

            expect(ref.current).not.toBeNull();
        });
    });
});
