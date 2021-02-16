import * as React from 'react';
import { shallow, mount } from 'enzyme';
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
}) => (
    <TestTooltipWrapper>
        {({ triggerElement }) => (
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
        )}
    </TestTooltipWrapper>
);
const mouseDownEvent = new MouseEvent('mousedown');
const mouseDownEventBubbles = new MouseEvent('mousedown', { bubbles: true });
const mouseEnterEvent = new MouseEvent('mouseenter');
const touchStartEvent = new MouseEvent('touchstart');
const mouseOverEventBubbles = new MouseEvent('mouseover', { bubbles: true });

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
        it('renders component with expected placement', async () => {
            const triggerElement = { current: document.createElement('div') };
            const wrapper = mount(<Tooltip triggerElement={triggerElement} placement={props.placement} />);

            await act(async () => Promise.resolve());
            wrapper.update();

            expect(wrapper.find(Tooltip).prop('placement')).toEqual(props.placement);
            expect(wrapper.find(`[data-popper-placement="${props.placement}"]`)).toHaveLength(1);
        });

        it('renders component with expected size', async () => {
            const triggerElement = { current: document.createElement('div') };
            const wrapper = mount(<Tooltip triggerElement={triggerElement} size={props.size} />);

            await act(async () => Promise.resolve());
            wrapper.update();

            expect(wrapper.find(Tooltip).prop('size')).toEqual(props.size);
            expect(wrapper.find(`${tooltipClassName}_size_${props.size}`)).toHaveLength(1);
        });

        it('renders component with expected isOpened', async () => {
            const triggerElement = { current: document.createElement('div') };
            const wrapper = mount(<Tooltip triggerElement={triggerElement} isOpened={true} />);

            await act(async () => Promise.resolve());
            wrapper.update();

            expect(wrapper.find(Tooltip).prop('isOpened')).toBeTruthy();
            expect(wrapper.find(openedTooltipClassName)).toHaveLength(1);
        });
    });

    describe('triggerEvent:click', () => {
        it('toggles open with click on triggerElement', async () => {
            const wrapper = mount(
                <TestTooltipWithHandlers onOpen={props.onOpen} onClose={props.onClose} triggerEvent="click" />
            );
            expect(props.onOpen).not.toBeCalled();
            expect(props.onClose).not.toBeCalled();
            expect(wrapper.find(openedTooltipClassName)).toHaveLength(0);

            const triggerNode = wrapper.find(triggerNodeClassName).getDOMNode();
            await act( async () => {
                triggerNode.dispatchEvent(mouseDownEvent);
            });
            wrapper.update();

            expect(props.onOpen).toBeCalledTimes(1);
            expect(wrapper.find(openedTooltipClassName)).toHaveLength(1);

            await act( async () => {
                triggerNode.dispatchEvent(mouseDownEvent);
            });
            wrapper.update();

            expect(props.onClose).toBeCalledTimes(1);
            expect(wrapper.find(openedTooltipClassName)).toHaveLength(0);
        });

        it('closes with click on outside node', async () => {
            const documentDiv = document.createElement('div');
            document.body.appendChild(documentDiv);

            const wrapper = mount(
                <TestTooltipWithHandlers
                    isOpened={true}
                    onClose={props.onClose}
                    triggerEvent="click"
                />, { attachTo: documentDiv }
            );

            expect(wrapper.find(openedTooltipClassName)).toHaveLength(1);

            const outsideNode = wrapper.find(outsideNodeClassName).getDOMNode();
            await act( async () => {
                outsideNode.dispatchEvent(mouseDownEventBubbles);
            });
            wrapper.update();

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
                    isOpened={true}
                    onClose={props.onClose}
                    triggerEvent="click"
                />, { attachTo: documentDiv }
            );

            const tooltipNode = wrapper.find(tooltipClassName).getDOMNode();
            await act( async () => {
                tooltipNode.dispatchEvent(mouseDownEventBubbles);
            });
            wrapper.update();

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

            const triggerNode = wrapper.find(triggerNodeClassName).getDOMNode();
            await act( async () => {
                triggerNode.dispatchEvent(touchStartEvent);
            });
            wrapper.update();

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

            const triggerNode = wrapper.find(triggerNodeClassName).getDOMNode();
            await act( async () => {
                triggerNode.dispatchEvent(mouseEnterEvent);
            });
            wrapper.update();

            expect(props.onOpen).toBeCalledTimes(1);
            expect(wrapper.find(openedTooltipClassName)).toHaveLength(1);
        });

        it('closes with outside event', async () => {
            const documentDiv = document.createElement('div');
            document.body.appendChild(documentDiv);

            const wrapper = mount(
                <TestTooltipWithHandlers
                    isOpened={true}
                    onClose={props.onClose}
                    triggerEvent="hover"
                />, { attachTo: documentDiv }
            );
            expect(wrapper.find(openedTooltipClassName)).toHaveLength(1);

            const outsideTrigger = wrapper.find(outsideNodeClassName).getDOMNode();
            await act( async () => {
                outsideTrigger.dispatchEvent(mouseOverEventBubbles);
            });
            wrapper.update();

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
                    isOpened={true}
                    onClose={props.onClose}
                    triggerEvent="hover"
                />, { attachTo: documentDiv }
            );
            const tooltipNode = wrapper.find(tooltipClassName).getDOMNode();

            await act( async () => {
                tooltipNode.dispatchEvent(mouseOverEventBubbles);
            });
            wrapper.update();

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
            const triggerNode = wrapper.find(triggerNodeClassName).getDOMNode();

            await act( async () => {
                triggerNode.dispatchEvent(touchStartEvent);
            });
            wrapper.update();

            expect(props.onOpen).toBeCalledTimes(1);
            expect(wrapper.find(openedTooltipClassName)).toHaveLength(1);

            delete window.ontouchstart;
        });
    });

    describe('triggerEvent:controlled', () => {
        it(`doesn't open with default event handlers in component`, async () => {
            const wrapper = mount(<TestTooltipWithHandlers onOpen={props.onOpen} triggerEvent="controlled" />);
            const triggerNode = wrapper.find(triggerNodeClassName).getDOMNode();

            await act( async () => {
                triggerNode.dispatchEvent(mouseDownEvent);
            });
            wrapper.update();

            expect(props.onOpen).not.toBeCalled();
        });

        it(`doesn't close with default event handlers in component`, async () => {
            const documentDiv = document.createElement('div');
            document.body.appendChild(documentDiv);

            const wrapper = mount(
                <TestTooltipWithHandlers
                    isOpened={true}
                    onClose={props.onClose}
                    triggerEvent="controlled"
                />, { attachTo: documentDiv }
            );
            const outsideTrigger = wrapper.find(outsideNodeClassName).getDOMNode();

            await act( async () => {
                outsideTrigger.dispatchEvent(mouseOverEventBubbles);
            });
            wrapper.update();

            expect(props.onClose).not.toBeCalled();

            wrapper.detach();
            document.body.removeChild(documentDiv);
        });

        it('toggles open with onClick', async () => {
            const wrapper = mount(
                <TestTooltipWrapper isOpen={false}>
                    {({ triggerElement, isOpened, handleOpen, handleClose }) => (
                        <>
                            <div ref={triggerElement} />
                            <Tooltip
                                triggerEvent="controlled"
                                triggerElement={triggerElement}
                                isOpened={isOpened}
                                onOpen={handleOpen}
                            />
                            <div className="open-button" onClick={handleOpen} />
                            <div className="close-button" onClick={handleClose} />
                        </>
                    )}
                </TestTooltipWrapper>
            );
            const openButton = wrapper.find('.open-button');
            const closeButton = wrapper.find('.close-button');

            expect(controlledOnOpen).not.toBeCalled();
            expect(controlledOnClose).not.toBeCalled();
            expect(wrapper.find(openedTooltipClassName)).toHaveLength(0);

            await act( async () => {
                openButton.simulate('click');
            });
            wrapper.update();
            expect(controlledOnOpen).toBeCalledTimes(1);
            expect(wrapper.find(openedTooltipClassName)).toHaveLength(1);

            await act( async () => {
                closeButton.simulate('click');
            });
            wrapper.update();
            expect(controlledOnClose).toBeCalledTimes(1);
            expect(wrapper.find(openedTooltipClassName)).toHaveLength(0);
        });
    });

    describe('controlled isOpened property and default event', () => {
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
            const triggerNode = wrapper.find('.trigger-element').getDOMNode();
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

            await act( async () => {
                triggerNode.dispatchEvent(mouseDownEvent);
            });
            wrapper.update();
            expect(controlledOnOpen).toBeCalledTimes(1);
            expect(wrapper.find(openedTooltipClassName)).toHaveLength(1);
        });
    });
});
