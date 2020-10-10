import * as React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Tooltip, { ITooltipProps, Placement, Size, Trigger } from './Tooltip';

const props: ITooltipProps = {
    className: 'test-class',
    placement: Placement.LEFT,
    size: Size.SMALL,
    trigger: Trigger.CLICK,
    triggerElement: <span>trigger</span>,
    onOpen: jest.fn(),
    onClose: jest.fn(),
};

const tooltipSelector = '.mfui-beta-tooltip';
const tooltipOpenedSelector = `${tooltipSelector}__popper_open`;
describe('<Tooltip />', () => {
    describe('snapshots', () => {
        it('renders component', () => {
            const wrapper = mount(
                <Tooltip triggerElement={props.triggerElement}>Some test content</Tooltip>
            );
            expect(wrapper).toMatchSnapshot();
        });

        it('renders component with props', () => {
            const wrapper = mount(
                <Tooltip {...props}>Some test content</Tooltip>
            );
            expect(wrapper).toMatchSnapshot();
        });

        it('renders component with isOpened prop set to true', () => {
            const wrapper = mount(
                <Tooltip
                    isOpened={true}
                    triggerElement={props.triggerElement}
                >
                    Some test content
                </Tooltip>
            );
            expect(wrapper.find(tooltipOpenedSelector).exists()).toBeTruthy();
            expect(wrapper).toMatchSnapshot();
        });

        it('must toggle drop open on component mouseenter/mouseleave', () => {
            const wrapper = mount(
                <Tooltip
                    triggerElement={props.triggerElement}
                >
                    Some test content
                </Tooltip>
            );
            wrapper.simulate('mouseenter');
            expect(wrapper.find(tooltipOpenedSelector).exists()).toBeTruthy();

            wrapper.simulate('mouseleave');
            expect(wrapper.find(tooltipOpenedSelector).exists()).toBeFalsy();

            expect(wrapper).toMatchSnapshot();
        });

        it('must open drop when click on component', () => {
            const wrapper = mount(
                <Tooltip
                    trigger="click"
                    triggerElement={props.triggerElement}
                >
                    Some test content
                </Tooltip>
            );
            wrapper.simulate('click');
            expect(wrapper.find(tooltipOpenedSelector).exists()).toBeTruthy();

            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('handlers', () => {
        it('must call onOpen/onClose on component mouseenter/mouseleave', () => {
            const onOpen = jest.fn();
            const onClose = jest.fn();

            const wrapper = mount(
                <Tooltip
                    triggerElement={props.triggerElement}
                    onOpen={onOpen}
                    onClose={onClose}
                >
                    Some test content
                </Tooltip>
            );

            wrapper.simulate('mouseenter');
            expect(onOpen).toHaveBeenCalledTimes(1);

            wrapper.simulate('mouseleave');
            expect(onClose).toHaveBeenCalledTimes(1);
        });

        it('must call onOpen when click on component', () => {
            const onOpen = jest.fn();

            const wrapper = mount(
                <Tooltip
                    trigger="click"
                    triggerElement={props.triggerElement}
                    onOpen={onOpen}
                >
                    Some test content
                </Tooltip>
            );

            wrapper.simulate('click');
            expect(onOpen).toHaveBeenCalledTimes(1);
        });

        it('must call onClose when click on outside drop area', () => {
            const listeners: any = {};

            document.addEventListener = jest.fn((e, cb) => {
                listeners[e] = cb;
            });
            document.removeEventListener = jest.fn(e => {
                delete listeners[e];
            });

            const onClose = jest.fn();

            const wrapper = mount(
                <Tooltip
                    trigger="click"
                    triggerElement={props.triggerElement}
                    onClose={onClose}
                >
                    Some test content
                </Tooltip>
            );

            wrapper.simulate('click');
            act(() => listeners.click({ target: document.body }));

            expect(onClose).toHaveBeenCalledTimes(1);
        });

        it('must not call onOpen when click on component and trigger prop set to "hover"', () => {
            const onOpen = jest.fn();

            const wrapper = mount(
                <Tooltip
                    triggerElement={props.triggerElement}
                    onOpen={onOpen}
                >
                    Some test content
                </Tooltip>
            );

            wrapper.simulate('click');
            expect(onOpen).not.toHaveBeenCalled();
        });

        it('must not call onOpen when trigger mouseenter on component and trigger prop set to "click"', () => {
            const onOpen = jest.fn();

            const wrapper = mount(
                <Tooltip
                    trigger="click"
                    triggerElement={props.triggerElement}
                    onOpen={onOpen}
                >
                    Some test content
                </Tooltip>
            );

            wrapper.simulate('mouseenter');
            expect(onOpen).not.toHaveBeenCalled();
        });
    });
});
