import * as React from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import { fireEvent, render } from '@testing-library/react';
import Notification, { INotificationProps, testIdPrefix } from './Notification';

const dataAttrs: INotificationProps['dataAttrs'] = {
    root: {
        'data-testid': 'root',
    },
    close: {
        'data-testid': 'close',
    },
    text: {
        'data-testid': 'text',
    },
    title: {
        'data-testid': 'title',
    },
    collapseButton: {
        'data-testid': 'collapseButton',
    },
    button: {
        'data-testid': 'button',
    },
    link: {
        'data-testid': 'link',
    },
};

const cn = cnCreate('mfui-notification');

describe('<Notification />', () => {
    it('should render with default props', () => {
        const { container } = render(<Notification>Some text</Notification>);
        expect(container).toMatchSnapshot();
    });

    it('should render with className props', () => {
        const { getByTestId } = render(
            <Notification className="testClass" dataAttrs={dataAttrs}>
                Some text
            </Notification>,
        );

        expect(getByTestId('root')).toHaveClass('testClass');
    });

    it('should render with classes props', () => {
        const { getByTestId } = render(
            <Notification
                dataAttrs={dataAttrs}
                classes={{ root: 'rootTestClass', container: 'containerTestClass', content: 'contentTestClass' }}
            >
                Some text
            </Notification>,
        );

        expect(getByTestId('root')).toHaveClass('rootTestClass');
        expect(getByTestId(`${testIdPrefix}-container`)).toHaveClass('containerTestClass');
        expect(getByTestId(`${testIdPrefix}-content`)).toHaveClass('contentTestClass');
    });

    it('should render with props type="info" and isColored="true"', () => {
        const { getByTestId } = render(<Notification dataAttrs={dataAttrs}>Some text</Notification>);

        expect(getByTestId('root')).toHaveClass(cn({ type: 'info', colored: true }));
    });

    it('should render with props type="info" and isColored="false"', () => {
        const { getByTestId } = render(
            <Notification isColored={false} dataAttrs={dataAttrs}>
                Some text
            </Notification>,
        );

        expect(getByTestId('root')).toHaveClass(cn({ type: 'info', colored: false }));
    });

    it('should render with props type="success" and isColored="false"', () => {
        const { getByTestId } = render(
            <Notification type="success" isColored={false} dataAttrs={dataAttrs}>
                Some text
            </Notification>,
        );

        expect(getByTestId('root')).toHaveClass(cn({ type: 'success', colored: false }));
    });

    it('should render with props type="success" and isColored="true"', () => {
        const { getByTestId } = render(
            <Notification type="success" dataAttrs={dataAttrs}>
                Some text
            </Notification>,
        );

        expect(getByTestId('root')).toHaveClass(cn({ type: 'success', colored: true }));
    });

    it('should render with props type="warning" and isColored="true"', () => {
        const { getByTestId } = render(
            <Notification type="warning" dataAttrs={dataAttrs}>
                Some text
            </Notification>,
        );

        expect(getByTestId('root')).toHaveClass(cn({ type: 'warning', colored: true }));
    });

    it('should render with props type="warning" and isColored="false"', () => {
        const { getByTestId } = render(
            <Notification type="warning" isColored={false} dataAttrs={dataAttrs}>
                Some text
            </Notification>,
        );

        expect(getByTestId('root')).toHaveClass(cn({ type: 'warning', colored: false }));
    });

    it('should render with props type="error" and isColored="true"', () => {
        const { getByTestId } = render(
            <Notification type="error" dataAttrs={dataAttrs}>
                Some text
            </Notification>,
        );

        expect(getByTestId('root')).toHaveClass(cn({ type: 'error', colored: true }));
    });

    it('should render with props type="error" and isColored="false"', () => {
        const { getByTestId } = render(
            <Notification type="error" isColored={false} dataAttrs={dataAttrs}>
                Some text
            </Notification>,
        );

        expect(getByTestId('root')).toHaveClass(cn({ type: 'error', colored: false }));
    });

    it('should render with close button', () => {
        const { getByTestId } = render(
            <Notification hasCloseButton dataAttrs={dataAttrs}>
                Some text
            </Notification>,
        );

        expect(getByTestId('close')).toMatchSnapshot();
        expect(getByTestId('text')).toHaveClass(cn('text', { 'close-padding': true }));
    });

    it('should render with close button and title', () => {
        const { getByTestId } = render(
            <Notification title="Title" hasCloseButton dataAttrs={dataAttrs}>
                Some text
            </Notification>,
        );

        expect(getByTestId('close')).toBeInTheDocument();
        expect(getByTestId('text')).not.toHaveClass(cn('text', { 'close-padding': true }));
    });

    it('should render with title', () => {
        const { getByTestId } = render(
            <Notification title="Title" dataAttrs={dataAttrs}>
                Some text
            </Notification>,
        );

        expect(getByTestId('title')).toMatchSnapshot();
    });

    it('should render with shortText', () => {
        const { getByTestId } = render(
            <Notification shortText="Short text" dataAttrs={dataAttrs}>
                Some text
            </Notification>,
        );

        expect(getByTestId('text')).toMatchSnapshot('text block');
        expect(getByTestId(`${testIdPrefix}-bottom`)).toMatchSnapshot('bottom block');
    });

    it('should render with closeCollapseTitle', () => {
        const { getByText } = render(
            <Notification shortText="Short text" closeCollapseTitle="Close collapse title">
                Some text
            </Notification>,
        );

        expect(getByText('Close collapse title')).toBeInTheDocument();
    });

    it('should render with openCollapseTitle', () => {
        const { getByText } = render(
            <Notification isCollapseOpened shortText="Short text" openCollapseTitle="Open collapse title">
                Some text
            </Notification>,
        );

        expect(getByText('Open collapse title')).toBeInTheDocument();
    });

    it('should render with isCollapseOpened="true"', () => {
        const { getByText } = render(
            <Notification isCollapseOpened shortText="Short text">
                Some text
            </Notification>,
        );

        expect(getByText('Свернуть')).toBeInTheDocument();
    });

    it('should render with buttonText', () => {
        const { getByTestId } = render(<Notification buttonText="Button text">Some text</Notification>);

        expect(getByTestId(`${testIdPrefix}-bottom`)).toMatchSnapshot();
    });

    it('should render with buttonLoader', () => {
        const { getByTestId } = render(
            <Notification buttonText="Button text" buttonLoader dataAttrs={dataAttrs}>
                Some text
            </Notification>,
        );

        expect(getByTestId('button')).toHaveClass('mfui-button_loading');
    });

    it('should render with buttonDisable', () => {
        const { getByTestId } = render(
            <Notification buttonText="Button text" buttonDisable dataAttrs={dataAttrs}>
                Some text
            </Notification>,
        );

        expect(getByTestId('button')).toHaveClass('mfui-button_disabled');
    });

    it('should render with link and link arguments', () => {
        const { getByTestId } = render(
            <Notification link="Link" rel="contact" href="/link" target="_blank" dataAttrs={dataAttrs}>
                Some text
            </Notification>,
        );

        expect(getByTestId('link')).toHaveAttribute('href', '/link');
        expect(getByTestId('link')).toHaveAttribute('rel', 'contact');
        expect(getByTestId('link')).toHaveAttribute('target', '_blank');
        expect(getByTestId(`${testIdPrefix}-bottom`)).toMatchSnapshot();
    });

    it('should render with dataAttrs', () => {
        const { getByTestId, rerender } = render(
            <Notification link="Link" title="Title" hasCloseButton dataAttrs={dataAttrs} buttonText="Button text">
                Some text
            </Notification>,
        );

        expect(getByTestId('root')).toBeInTheDocument();
        expect(getByTestId('title')).toBeInTheDocument();
        expect(getByTestId('text')).toBeInTheDocument();
        expect(getByTestId('close')).toBeInTheDocument();
        expect(getByTestId('link')).toBeInTheDocument();
        expect(getByTestId('button')).toBeInTheDocument();

        rerender(
            <Notification dataAttrs={dataAttrs} shortText="Short text">
                Some text
            </Notification>,
        );

        expect(getByTestId('collapseButton')).toBeInTheDocument();
    });

    it('should call onClose', () => {
        const onCloseMock = jest.fn();
        const { getByTestId } = render(
            <Notification hasCloseButton onClose={onCloseMock} dataAttrs={dataAttrs}>
                Some text
            </Notification>,
        );

        fireEvent.click(getByTestId('close'));

        expect(onCloseMock).toBeCalled();
    });

    it('should call onLinkClick', () => {
        const onLinkClickMock = jest.fn();
        const { getByTestId } = render(
            <Notification link="/link" dataAttrs={dataAttrs} onLinkClick={onLinkClickMock}>
                Some text
            </Notification>,
        );

        fireEvent.click(getByTestId('link'));

        expect(onLinkClickMock).toBeCalled();
    });

    it('should call onButtonClick', () => {
        const onButtonClickMock = jest.fn();
        const { getByTestId } = render(
            <Notification dataAttrs={dataAttrs} buttonText="Button text" onButtonClick={onButtonClickMock}>
                Some text
            </Notification>,
        );

        fireEvent.click(getByTestId('button'));

        expect(onButtonClickMock).toBeCalled();
    });

    it('should call onCollapseButtonClick', () => {
        const onCollapseButtonClickMock = jest.fn();
        const { getByTestId } = render(
            <Notification
                dataAttrs={dataAttrs}
                shortText="Short text"
                onCollapseButtonClick={onCollapseButtonClickMock}
            >
                Some text
            </Notification>,
        );

        fireEvent.click(getByTestId('collapseButton'));

        expect(onCollapseButtonClickMock).toBeCalled();
    });
});
