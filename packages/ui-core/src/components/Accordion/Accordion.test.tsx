import * as React from 'react';
import { mount } from 'enzyme';
import Accordion, { IAccordionProps } from './Accordion';

const props: IAccordionProps = {
    title: 'Test',
    isOpened: false,
    dataAttrs: {
        root: {
            'data-root': 'data-test-value',
        },
        header: {
            'data-header': 'data-test-value',
        },
        collapse: {
            'data-collapse': 'data-test-value',
        },
        titleWrap: {
            'data-title-wrap': 'data-test-value',
        },
        arrowUp: {
            'data-arrow-up': 'data-test-value',
        },
        arrowDown: {
            'data-arrow-down': 'data-test-value',
        },
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
        const onClickAccordion = jest.fn();
        const { isOpened } = props;
        const wrapper = mount(
            <Accordion {...props} onClickAccordion={onClickAccordion}>
                <div />
            </Accordion>,
        );

        wrapper.find('.mfui-accordion__title-wrap').simulate('click');
        expect(onClickAccordion).toBeCalledWith(!isOpened);
    });

    it('should open accordion after title click, if event code enter', () => {
        const onClickAccordion = jest.fn();
        const event = {
            type: 'keydown',
            nativeEvent: {
                code: 'Enter',
            },
        } as React.KeyboardEvent;

        const { isOpened } = props;
        const wrapper = mount(
            <Accordion {...props} onClickAccordion={onClickAccordion}>
                <div />
            </Accordion>,
        );

        wrapper.find('.mfui-accordion__title-wrap').simulate('keydown', event);
        expect(onClickAccordion).toBeCalledWith(!isOpened);
    });

    it('shouldn`t open accordion after title click, if event code not enter', () => {
        const onClickAccordion = jest.fn();
        const event = {
            type: 'keydown',
            nativeEvent: {
                code: 'Escape',
            },
        } as React.KeyboardEvent;

        const wrapper = mount(
            <Accordion {...props} onClickAccordion={onClickAccordion}>
                <div />
            </Accordion>,
        );

        wrapper.find('.mfui-accordion__title-wrap').simulate('keydown', event);
        expect(onClickAccordion).not.toBeCalled();
    });

    it('checking the opening/closing of the accordion on click', () => {
        const wrapper = mount(
            <Accordion {...props}>
                <div />
            </Accordion>,
        );

        wrapper.find('.mfui-accordion__title-wrap').simulate('click');
        expect(wrapper.find('.mfui-accordion').hasClass('mfui-accordion_opened')).toEqual(true);

        wrapper.find('.mfui-accordion__title-wrap').simulate('click');
        expect(wrapper.find('.mfui-accordion').hasClass('mfui-accordion_opened')).toEqual(false);
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
        const rootNode = wrapper.find('.mfui-accordion');
        const contentNode = wrapper.find('Collapse');
        const titleWrapNode = wrapper.find('.mfui-accordion__title-wrap');

        expect(rootNode.hasClass('testClassName')).toEqual(true);
        expect(rootNode.hasClass('testRootClass')).toEqual(true);
        expect(rootNode.hasClass('testIsOpenClass')).toEqual(false);
        expect(contentNode.hasClass('testCollapseClass')).toEqual(true);
        expect(titleWrapNode.hasClass('testTitleWrapClass')).toEqual(true);

        titleWrapNode.simulate('click');
        wrapper.update();

        const newRootNode = wrapper.find('.mfui-accordion');

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

            expect(wrapper.find('.mfui-accordion').hasClass('mfui-accordion_opened')).toEqual(true);
            wrapper.setProps({ isOpened: false });
            wrapper.update();
            expect(wrapper.find('.mfui-accordion').hasClass('mfui-accordion_opened')).toEqual(false);
        });

        it('first value of isOpened - false, then it changes to true', () => {
            const wrapper = mount(
                <Accordion {...props}>
                    <div />
                </Accordion>,
            );

            expect(wrapper.find('.mfui-accordion').hasClass('mfui-accordion_opened')).toEqual(false);
            wrapper.setProps({ isOpened: true });
            wrapper.update();
            expect(wrapper.find('.mfui-accordion').hasClass('mfui-accordion_opened')).toEqual(true);
        });

        it('first value of isOpened - false, then it changes to false', () => {
            const wrapper = mount(
                <Accordion {...props}>
                    <div />
                </Accordion>,
            );

            expect(wrapper.find('.mfui-accordion').hasClass('mfui-accordion_opened')).toEqual(false);
            wrapper.setProps({ isOpened: false });
            wrapper.update();
            expect(wrapper.find('.mfui-accordion').hasClass('mfui-accordion_opened')).toEqual(false);
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

            expect(wrapper.find('.mfui-accordion').hasClass('mfui-accordion_opened')).toEqual(true);
            wrapper.setProps({ isOpened: true });
            wrapper.update();
            expect(wrapper.find('.mfui-accordion').hasClass('mfui-accordion_opened')).toEqual(true);
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
