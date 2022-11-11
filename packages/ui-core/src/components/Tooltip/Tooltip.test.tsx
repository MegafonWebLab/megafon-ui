import React from 'react';
import type { RefObject } from 'react';
import { shallow } from 'enzyme';
import Tooltip, { ITooltipProps } from './Tooltip';

const props: ITooltipProps = {
    colorTheme: 'red',
    size: 'big',
    title: 'Заголовок',
    buttonText: 'Кнопка',
    text: 'Текст',
    hasCloseButton: true,
    placement: 'left',
    fallbackPlacements: ['left', 'bottom'],
    paddings: 'none',
    triggerEvent: 'click',
    isOpened: true,
    isPortal: false,
    portalSelector: 'portalSelector',
    className: 'className',
    triggerElement: {
        current: {} as HTMLElement,
    },
    boundaryElement: {
        current: {} as HTMLElement,
    },
    targetElement: {
        current: {} as HTMLElement,
    },
    classes: {
        root: 'rootClass',
        arrow: 'arrow',
        content: 'content',
        contentShadow: 'content-shadow',
    },
    dataAttrs: {
        root: { 'data-root': 'test' },
        close: { 'data-close': 'test' },
        content: { 'data-content': 'test' },
    },
    onOpen: jest.fn(),
    onClose: jest.fn(),
    onClick: jest.fn(),
    onCloseButtonClick: jest.fn(),
};

describe('<Tooltip/>', () => {
    it('renders component with default props', () => {
        const triggerElement: RefObject<HTMLElement> = React.createRef();
        const wrapper = shallow(<Tooltip triggerElement={triggerElement}>Some test content</Tooltip>);
        expect(wrapper).toMatchSnapshot();
    });
    it('renders component with all props', () => {
        const wrapper = shallow(<Tooltip {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});
