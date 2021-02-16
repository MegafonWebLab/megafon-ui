import * as React from 'react';
import { shallow, mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Tooltip, { ITooltipProps, Placement, Size } from './Tooltip';

const props: Partial<ITooltipProps> = {
    className: 'className',
    placement: Placement.BOTTOM,
    size: Size.SMALL,
    triggerEvent: 'click',
    isOpened: true,
    onClose: jest.fn(),
    onOpen: jest.fn(),
};

const controlledOnOpen = jest.fn();
const controlledOnClose = jest.fn();

const TestTooltipWrapper = ({ isOpen = false, children }) => {
    const triggerElement = React.useRef<HTMLElement>(null);
    const [isOpened, setIsOpened] = React.useState(isOpen);

    const handleOpen = () => {
        controlledOnOpen();
        setIsOpened(true);
    };
    const handleClose = () => {
        controlledOnClose();
        setIsOpened(false);
    };

    return children({ triggerElement, isOpened, handleOpen, handleClose });
};

const tooltipClassName = '.mfui-beta-tooltip';
const openedTooltipClassName = '.mfui-beta-tooltip_open';
const triggerNodeClassName = '.trigger';
const outsideNodeClassName = '.outside';

const TestTooltipWithHandlers: React.FC<Partial<ITooltipProps>> = ({
    triggerEvent =  'click',
    isOpened = false,
    onOpen,
    onClose,
    children,
}) => {
    const triggerElement = React.useRef<HTMLDivElement>(null);

    return (
        <>
            <div className={triggerNodeClassName.substr(1)} ref={triggerElement} />
            <div className={outsideNodeClassName.substr(1)} />
            <Tooltip
                triggerEvent={triggerEvent}
                triggerElement={triggerElement}
                isOpened={isOpened}
                onOpen={onOpen}
                onClose={onClose}
            >
                {children}
            </Tooltip>
        </>
    );
};

const mouseDownEvent = new MouseEvent('mousedown');
const mouseDownEventBubbles = new MouseEvent('mousedown', { bubbles: true });
const mouseEnterEvent = new MouseEvent('mouseenter');
const touchStartEvent = new MouseEvent('touchstart');
const mouseOverEventBubbles = new MouseEvent('mouseover', { bubbles: true });

const dispatchEvent = async (wrapper: ReactWrapper, targetClassName: string, event: MouseEvent) => {
    const targetNode = wrapper.find(targetClassName).getDOMNode();
    await act( async () => {
        targetNode.dispatchEvent(event);
    });
    wrapper.update();
};

describe('<Tooltip />', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('snapshots', () => {
        it('renders component', () => {
            const triggerElement = { current: document.createElement('div') };
            const wrapper = shallow(<Tooltip triggerElement={triggerElement} />);

            expect(wrapper).toMatchSnapshot();
        });

        it('renders component with props', () => {
            const triggerElement = { current: document.createElement('div') };
            const wrapper = shallow(<Tooltip triggerElement={triggerElement} {...props}>content</Tooltip>);

            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('expected properties', () => {
        it('renders component with expected props on nodes', async () => {
            const triggerElement = { current: document.createElement('div') };
            const wrapper = mount(
                <Tooltip
                    triggerElement={triggerElement}
                    isOpened={true}
                    size={props.size}
                    placement={props.placement}
                />
            );

            await act(async () => Promise.resolve());
            wrapper.update();

            expect(wrapper.find(`[data-popper-placement="${props.placement}"]`)).toHaveLength(1);
            expect(wrapper.find(`${tooltipClassName}_size_${props.size}`)).toHaveLength(1);
            expect(wrapper.find(openedTooltipClassName)).toHaveLength(1);
        });
    });

    describe('triggerEvent:click', () => {
        it('toggles open with click on triggerElement', async () => {
            const wrapper = mount(
                <TestTooltipWithHandlers
                    triggerEvent="click"
                    onOpen={props.onOpen}
                    onClose={props.onClose}
                />
            );
            expect(props.onOpen).not.toBeCalled();
            expect(props.onClose).not.toBeCalled();
            expect(wrapper.find(openedTooltipClassName)).toHaveLength(0);

            await dispatchEvent(wrapper, triggerNodeClassName, mouseDownEvent);

            expect(props.onOpen).toBeCalledTimes(1);
            expect(wrapper.find(openedTooltipClassName)).toHaveLength(1);

            await dispatchEvent(wrapper, triggerNodeClassName, mouseDownEvent);

            expect(props.onClose).toBeCalledTimes(1);
            expect(wrapper.find(openedTooltipClassName)).toHaveLength(0);
        });

        it('closes with click on outside node', async () => {
            const documentDiv = document.createElement('div');
            document.body.appendChild(documentDiv);

            const wrapper = mount(
                <TestTooltipWithHandlers
                    triggerEvent="click"
                    isOpened={true}
                    onClose={props.onClose}
                />,
                { attachTo: documentDiv }
            );

            expect(wrapper.find(openedTooltipClassName)).toHaveLength(1);

            await dispatchEvent(wrapper, outsideNodeClassName, mouseDownEventBubbles);

            expect(props.onClose).toBeCalledTimes(1);
            expect(wrapper.find(openedTooltipClassName)).toHaveLength(0);

            wrapper.detach();
            document.body.removeChild(documentDiv);
        });

        it(`doesn't close with click on inner content`, async () => {
            const documentDiv = document.createElement('div');
            document.body.appendChild(documentDiv);

            const wrapper = mount(
                <TestTooltipWithHandlers
                    triggerEvent="click"
                    isOpened={true}
                    onClose={props.onClose}
                />,
                { attachTo: documentDiv }
            );

            await dispatchEvent(wrapper, tooltipClassName, mouseDownEventBubbles);

            expect(props.onClose).not.toBeCalled();
            expect(wrapper.find(openedTooltipClassName)).toHaveLength(1);

            wrapper.detach();
            document.body.removeChild(documentDiv);
        });

        it('uses touchstart event on touch devices', async () => {
            window.ontouchstart = jest.fn();
            const wrapper = mount(
                <TestTooltipWithHandlers onOpen={props.onOpen} triggerEvent="click" />
            );

            await dispatchEvent(wrapper, triggerNodeClassName, touchStartEvent);

            expect(props.onOpen).toBeCalledTimes(1);
            expect(wrapper.find(openedTooltipClassName)).toHaveLength(1);

            delete window.ontouchstart;
        });
    });

    describe('triggerEvent:hover', () => {
        it('opens with mouseenter on triggerElement', async () => {
            const wrapper = mount(
                <TestTooltipWithHandlers onOpen={props.onOpen} triggerEvent="hover" />
            );

            await dispatchEvent(wrapper, triggerNodeClassName, mouseEnterEvent);

            expect(props.onOpen).toBeCalledTimes(1);
            expect(wrapper.find(openedTooltipClassName)).toHaveLength(1);
        });

        it('closes with outside event', async () => {
            const documentDiv = document.createElement('div');
            document.body.appendChild(documentDiv);

            const wrapper = mount(
                <TestTooltipWithHandlers
                    triggerEvent="hover"
                    isOpened={true}
                    onClose={props.onClose}
                />,
                { attachTo: documentDiv }
            );
            expect(wrapper.find(openedTooltipClassName)).toHaveLength(1);

            await dispatchEvent(wrapper, outsideNodeClassName, mouseOverEventBubbles);

            expect(props.onClose).toBeCalledTimes(1);
            expect(wrapper.find(openedTooltipClassName)).toHaveLength(0);

            wrapper.detach();
            document.body.removeChild(documentDiv);
        });

        it(`doesn't close with outside event on inner content`, async () => {
            const documentDiv = document.createElement('div');
            document.body.appendChild(documentDiv);

            const wrapper = mount(
                <TestTooltipWithHandlers
                    triggerEvent="hover"
                    isOpened={true}
                    onClose={props.onClose}
                />,
                { attachTo: documentDiv }
            );

            await dispatchEvent(wrapper, tooltipClassName, mouseOverEventBubbles);

            expect(props.onClose).not.toBeCalled();
            expect(wrapper.find(openedTooltipClassName)).toHaveLength(1);

            wrapper.detach();
            document.body.removeChild(documentDiv);
        });

        it('uses touchstart event on touch devices', async () => {
            window.ontouchstart = jest.fn();
            const wrapper = mount(
                <TestTooltipWithHandlers onOpen={props.onOpen} triggerEvent="hover" />
            );
            await dispatchEvent(wrapper, triggerNodeClassName, touchStartEvent);

            expect(props.onOpen).toBeCalledTimes(1);
            expect(wrapper.find(openedTooltipClassName)).toHaveLength(1);

            delete window.ontouchstart;
        });
    });

    describe('triggerEvent:controlled', () => {
        it('toggles opening with isOpened property changes', async () => {
            const triggerElement = { current: document.createElement('div') };
            const wrapper = mount<ITooltipProps>(
                <Tooltip
                    triggerEvent="controlled"
                    triggerElement={triggerElement}
                    isOpened={false}
                />
            );
            expect(wrapper.find(openedTooltipClassName)).toHaveLength(0);

            await act( async () => {
                wrapper.setProps({ isOpened: true });
            });
            wrapper.update();
            expect(wrapper.find(openedTooltipClassName)).toHaveLength(1);

            await act( async () => {
                wrapper.setProps({ isOpened: false });
            });
            wrapper.update();
            expect(wrapper.find(openedTooltipClassName)).toHaveLength(0);
        });

        it(`doesn't open with default event handlers in component`, async () => {
            const wrapper = mount(
                <TestTooltipWithHandlers triggerEvent="controlled" onOpen={props.onOpen} />
            );
            await dispatchEvent(wrapper, triggerNodeClassName, mouseDownEvent);

            expect(props.onOpen).not.toBeCalled();
        });

        it(`doesn't close with default event handlers in component`, async () => {
            const documentDiv = document.createElement('div');
            document.body.appendChild(documentDiv);

            const wrapper = mount(
                <TestTooltipWithHandlers
                    triggerEvent="controlled"
                    isOpened={true}
                    onClose={props.onClose}
                />,
                { attachTo: documentDiv }
            );
            await dispatchEvent(wrapper, outsideNodeClassName, mouseOverEventBubbles);

            expect(props.onClose).not.toBeCalled();

            wrapper.detach();
            document.body.removeChild(documentDiv);
        });
    });

    describe('controlled isOpened property with default event', () => {
        it('closes onClick and opens with default click event on triggerElement', async () => {
            const wrapper = mount(
                <TestTooltipWrapper isOpen={true}>
                    {({ triggerElement, isOpened, handleOpen, handleClose }) => (
                        <>
                            <div className="trigger-element" ref={triggerElement} />
                            <Tooltip
                                triggerElement={triggerElement}
                                triggerEvent="click"
                                isOpened={isOpened}
                                onOpen={handleOpen}
                                onClose={handleClose}
                            >
                                <div className="button" onClick={handleClose} />
                            </Tooltip>
                        </>
                    )}
                </TestTooltipWrapper>
            );
            const button = wrapper.find('.button');

            expect(controlledOnOpen).not.toHaveBeenCalled();
            expect(controlledOnClose).not.toHaveBeenCalled();
            expect(wrapper.find(openedTooltipClassName)).toHaveLength(1);

            await act( async () => {
                button.simulate('click');
            });
            wrapper.update();
            expect(controlledOnClose).toBeCalledTimes(1);
            expect(wrapper.find(openedTooltipClassName)).toHaveLength(0);

            await dispatchEvent(wrapper, '.trigger-element', mouseDownEvent);

            expect(controlledOnOpen).toBeCalledTimes(1);
            expect(wrapper.find(openedTooltipClassName)).toHaveLength(1);
        });
    });
});
