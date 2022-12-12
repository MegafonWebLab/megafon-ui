import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Accordion, { IAccordionProps } from './Accordion';

const props: IAccordionProps = {
    title: 'Accordion title',
    dataAttrs: {
        root: { 'data-testid': 'root' },
        header: {
            root: { 'data-testid': 'header' },
        },
        collapse: {
            root: { 'data-testid': 'collapse-root' },
            inner: { 'data-testid': 'collapse-inner' },
        },
        titleWrap: { 'data-testid': 'title-wrap' },
        arrowUp: { 'data-testid': 'arrow-up' },
        arrowDown: { 'data-testid': 'arrow-down' },
    },
    className: 'className',
    classes: {
        openedClass: 'openedClass',
        root: 'rootClass',
        collapse: 'collapseClass',
        titleWrap: 'titleWrapClass',
    },
    onClickAccordion: jest.fn(),
};

describe('<Accordion />', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render Accordion', () => {
        const { container } = render(<Accordion title="Title">content</Accordion>);

        expect(container).toMatchSnapshot();
    });

    it('should render Accordion with dataAttrs props', () => {
        const { queryByTestId, getByTestId } = render(<Accordion {...props}>content</Accordion>);

        expect(queryByTestId('root')).toBeTruthy();
        expect(queryByTestId('header')).toBeTruthy();
        expect(queryByTestId('collapse-root')).toBeTruthy();
        expect(queryByTestId('collapse-inner')).toBeTruthy();
        expect(queryByTestId('title-wrap')).toBeTruthy();
        expect(queryByTestId('arrow-down')).toBeTruthy();
        expect(queryByTestId('arrow-up')).toBeFalsy();

        fireEvent.click(getByTestId('title-wrap'));

        expect(queryByTestId('arrow-up')).toBeTruthy();
        expect(queryByTestId('arrow-down')).toBeFalsy();
    });

    it('should render Accordion with classes props', () => {
        const { getByTestId } = render(<Accordion {...props}>content</Accordion>);
        const rootNode = getByTestId('root');
        const tileWrapNode = getByTestId('title-wrap');
        const collapseNode = getByTestId('collapse-root');

        expect(rootNode).toHaveClass('className');
        expect(rootNode).not.toHaveClass('openedClass');
        expect(rootNode).toHaveClass('rootClass');
        expect(collapseNode).toHaveClass('collapseClass');
        expect(tileWrapNode).toHaveClass('titleWrapClass');

        fireEvent.click(tileWrapNode);

        expect(rootNode).toHaveClass('openedClass');
    });

    it('should render Accordion when hasMicrodata is true', () => {
        const { getByTestId, getByText } = render(
            <Accordion {...props} hasMicrodata>
                content
            </Accordion>,
        );
        const root = getByTestId('root');
        const content = getByText('content');
        const contentParent = content.parentElement;

        expect(root).toHaveAttribute('itemscope');
        expect(root).toHaveAttribute('itemProp', 'mainEntity');
        expect(root).toHaveAttribute('itemType', 'https://schema.org/Question');
        expect(getByTestId('title-wrap')).toHaveAttribute('itemProp', 'name');
        expect(contentParent).toHaveAttribute('itemScope');
        expect(contentParent).toHaveAttribute('itemProp', 'acceptedAnswer');
        expect(contentParent).toHaveAttribute('itemType', 'https://schema.org/Answer');
        expect(content).toHaveAttribute('itemProp', 'text');
    });

    it('should render Accordion when hasMicrodata is false', () => {
        const { getByTestId, getByText } = render(
            <Accordion {...props} hasMicrodata={false}>
                content
            </Accordion>,
        );
        const root = getByTestId('root');
        const content = getByText('content');
        const contentParent = content.parentElement;

        expect(root).not.toHaveAttribute('itemscope');
        expect(root).not.toHaveAttribute('itemProp');
        expect(root).not.toHaveAttribute('itemType');
        expect(getByTestId('title-wrap')).not.toHaveAttribute('itemProp');
        expect(contentParent).not.toHaveAttribute('itemScope');
        expect(contentParent).not.toHaveAttribute('itemProp');
        expect(contentParent).not.toHaveAttribute('itemType');
        expect(content).not.toHaveAttribute('itemProp');
    });

    it('should render closed Accordion when isOpened is false', () => {
        const { getByTestId, queryByTestId } = render(
            <Accordion {...props} isOpened={false}>
                content
            </Accordion>,
        );

        const rootNode = getByTestId('root');

        expect(rootNode).not.toHaveClass('mfui-accordion_opened');
        expect(rootNode).not.toHaveClass('openedClass');

        expect(queryByTestId('arrow-up')).toBeFalsy();
        expect(queryByTestId('arrow-down')).toBeTruthy();
    });

    it('should render opened Accordion when isOpened is true', () => {
        const { getByTestId, queryByTestId } = render(
            <Accordion {...props} isOpened>
                content
            </Accordion>,
        );
        const rootNode = getByTestId('root');

        expect(rootNode).toHaveClass('mfui-accordion_opened');
        expect(rootNode).toHaveClass('openedClass');

        expect(queryByTestId('arrow-up')).toBeTruthy();
        expect(queryByTestId('arrow-down')).toBeFalsy();
    });

    it('should render opened Accordion when isOpened is true after rerender', () => {
        const { getByTestId, queryByTestId, rerender } = render(
            <Accordion {...props} isOpened={false}>
                content
            </Accordion>,
        );

        rerender(
            <Accordion {...props} isOpened>
                content
            </Accordion>,
        );

        const rootNode = getByTestId('root');

        expect(rootNode).toHaveClass('mfui-accordion_opened');
        expect(rootNode).toHaveClass('openedClass');

        expect(queryByTestId('arrow-up')).toBeTruthy();
        expect(queryByTestId('arrow-down')).toBeFalsy();
    });

    it('should render opened Accordion after clicking on title', () => {
        const { getByTestId, queryByTestId } = render(
            <Accordion {...props} isOpened={false}>
                content
            </Accordion>,
        );

        fireEvent.click(getByTestId('title-wrap'));

        const rootNode = getByTestId('root');

        expect(rootNode).toHaveClass('mfui-accordion_opened');
        expect(rootNode).toHaveClass('openedClass');

        expect(queryByTestId('arrow-up')).toBeTruthy();
        expect(queryByTestId('arrow-down')).toBeFalsy();

        expect(props.onClickAccordion).toBeCalled();
    });

    it('should render opened Accordion after pressing Enter', () => {
        const { getByTestId, queryByTestId } = render(
            <Accordion {...props} isOpened={false}>
                content
            </Accordion>,
        );

        fireEvent.keyDown(getByTestId('title-wrap'), { code: 'Enter' });

        const rootNode = getByTestId('root');

        expect(rootNode).toHaveClass('mfui-accordion_opened');
        expect(rootNode).toHaveClass('openedClass');

        expect(queryByTestId('arrow-up')).toBeTruthy();
        expect(queryByTestId('arrow-down')).toBeFalsy();

        expect(props.onClickAccordion).toBeCalled();
    });

    it('should render closed Accordion after pressing any key except Enter', () => {
        const { getByTestId, queryByTestId } = render(
            <Accordion {...props} isOpened={false}>
                content
            </Accordion>,
        );

        fireEvent.keyDown(getByTestId('title-wrap'), { code: 'Space' });

        const rootNode = getByTestId('root');

        expect(rootNode).not.toHaveClass('mfui-accordion_opened');
        expect(rootNode).not.toHaveClass('openedClass');

        expect(queryByTestId('arrow-up')).toBeFalsy();
        expect(queryByTestId('arrow-down')).toBeTruthy();

        expect(props.onClickAccordion).not.toBeCalled();
    });

    it('should return reference to root element', () => {
        const ref: React.RefObject<HTMLDivElement> = React.createRef();
        render(
            <Accordion {...props} rootRef={ref}>
                <div />
            </Accordion>,
        );

        expect(ref.current).not.toBeNull();
    });
});
