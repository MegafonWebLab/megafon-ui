import React from 'react';
import type { RefObject } from 'react';
import { render } from '@testing-library/react';
import Tooltip, { ITooltipProps } from './Tooltip';

const props: ITooltipProps = {
    placement: 'left',
    fallbackPlacements: ['left'],
    paddings: 'none',
    triggerEvent: 'click',
    isOpened: false,
    isPortal: false,
    className: 'className',
    triggerElement: {
        current: {} as HTMLElement,
    },
    classes: {
        root: 'rootClass',
        arrow: 'arrow',
        content: 'content',
        contentShadow: 'content-shadow',
    },
    dataAttrs: {
        root: {
            'data-root': 'test',
            'incorrect-attr': 'test',
        },
        content: {
            'data-content': 'test',
            'incorrect-attr': 'test',
        },
    },
    onOpen: jest.fn(),
    onClose: jest.fn(),
};

describe('<Tooltip/>', () => {
    it('renders component with default props', () => {
        const triggerElement: RefObject<HTMLElement> = React.createRef();
        const { container } = render(<Tooltip triggerElement={triggerElement}>Some test content</Tooltip>);

        expect(container).toMatchSnapshot();
    });
    it('renders with props', () => {
        const triggerElement: RefObject<HTMLElement> = React.createRef();
        const { container } = render(<Tooltip {...props} triggerElement={triggerElement} />);

        expect(container).toMatchSnapshot();
    });
});
