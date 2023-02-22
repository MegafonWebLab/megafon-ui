import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Switcher from './Switcher';

const dataAttrs = {
    root: { 'data-testid': 'root' },
    input: { 'data-testid': 'input' },
    loader: { 'data-testid': 'loader' },
};

describe('<Switcher />', () => {
    it('should render', () => {
        const { container } = render(<Switcher />);

        expect(container).toMatchSnapshot();
    });

    it('should render with dataAttrs', () => {
        const { getByTestId } = render(<Switcher dataAttrs={dataAttrs} />);

        expect(getByTestId('root')).toBeInTheDocument();
        expect(getByTestId('input')).toBeInTheDocument();
    });

    it('should render with className', () => {
        const { getByTestId } = render(<Switcher dataAttrs={dataAttrs} className="testClass" />);

        expect(getByTestId('root')).toHaveClass('testClass');
    });

    it('should render with checked=true', () => {
        const { getByTestId } = render(<Switcher dataAttrs={dataAttrs} checked />);

        expect(getByTestId('input')).toHaveClass('mfui-switcher__input_checked');
    });

    it('should render with disabled=true', () => {
        const { getByTestId } = render(<Switcher dataAttrs={dataAttrs} disabled />);

        expect(getByTestId('root')).toHaveClass('mfui-switcher_disabled');
        expect(getByTestId('input')).toHaveClass('mfui-switcher__input_disabled');
        expect(getByTestId('input')).not.toHaveAttribute('tabindex');
    });

    it('should render with showLoader=true', () => {
        const { getByTestId } = render(<Switcher dataAttrs={dataAttrs} showLoader />);
        const input = getByTestId('input');

        expect(input).not.toHaveAttribute('tabindex');
        expect(input).toHaveClass('mfui-switcher__input_loaded');
        expect(getByTestId('loader')).toMatchSnapshot();
    });

    it('should render without showLoader when disabled=true', () => {
        const { getByTestId, queryByTestId } = render(<Switcher dataAttrs={dataAttrs} showLoader disabled />);

        expect(queryByTestId('loader')).not.toBeInTheDocument();
        expect(getByTestId('input')).not.toHaveAttribute('tabindex');
    });

    it('should render right side text with medium size', () => {
        const { getByTestId } = render(<Switcher dataAttrs={dataAttrs}>Text</Switcher>);
        const textNode = getByTestId('root').lastElementChild;

        expect(textNode).toHaveClass('mfui-switcher__content_size_medium');
        expect(textNode).toMatchSnapshot();
    });

    it('should render right side text with small size', () => {
        const { getByTestId } = render(
            <Switcher dataAttrs={dataAttrs} textSize="small">
                Text
            </Switcher>,
        );

        expect(getByTestId('root').lastElementChild).toHaveClass('mfui-switcher__content_size_small');
    });

    it('should render left side text with medium size', () => {
        const { getByTestId } = render(
            <Switcher dataAttrs={dataAttrs} textPosition="left">
                Text
            </Switcher>,
        );
        const textNode = getByTestId('root').firstChild;

        expect(textNode).toHaveClass('mfui-switcher__content_left');
        expect(textNode).toHaveClass('mfui-switcher__content_size_medium');
        expect(textNode).toMatchSnapshot();
    });

    it('should render left side text with small size', () => {
        const { getByTestId } = render(
            <Switcher dataAttrs={dataAttrs} textPosition="left" textSize="small">
                Text
            </Switcher>,
        );
        const textNode = getByTestId('root').firstChild;

        expect(textNode).toHaveClass('mfui-switcher__content_left');
        expect(textNode).toHaveClass('mfui-switcher__content_size_small');
    });

    it('should call onChange by click', () => {
        const mockOnChange = jest.fn();
        const { getByTestId } = render(<Switcher dataAttrs={dataAttrs} onChange={mockOnChange} />);

        fireEvent.click(getByTestId('input'));
        expect(mockOnChange).toBeCalled();
    });

    it('should call onChange by press NumpadEnter', () => {
        const mockOnChange = jest.fn();
        const { getByTestId } = render(<Switcher dataAttrs={dataAttrs} onChange={mockOnChange} />);

        fireEvent.keyDown(getByTestId('input'), { code: 'NumpadEnter' });
        expect(mockOnChange).toBeCalled();
    });

    it('should call onChange by press Enter', () => {
        const mockOnChange = jest.fn();
        const { getByTestId } = render(<Switcher dataAttrs={dataAttrs} onChange={mockOnChange} />);

        fireEvent.keyDown(getByTestId('input'), { code: 'Enter' });
        expect(mockOnChange).toBeCalled();
    });

    it('should not call onChange by disabled', () => {
        const mockOnChange = jest.fn();
        const { getByTestId } = render(<Switcher dataAttrs={dataAttrs} onChange={mockOnChange} disabled />);

        fireEvent.click(getByTestId('input'));
        expect(mockOnChange).not.toBeCalled();
    });

    it('should not call onChange when showLoader=true', () => {
        const mockOnChange = jest.fn();
        const { getByTestId } = render(<Switcher dataAttrs={dataAttrs} onChange={mockOnChange} showLoader />);

        fireEvent.click(getByTestId('input'));
        expect(mockOnChange).not.toBeCalled();
    });

    it('should not call onChange when key down code not equal "Enter" or NumpadEnter', () => {
        const mockOnChange = jest.fn();
        const { getByTestId } = render(<Switcher dataAttrs={dataAttrs} onChange={mockOnChange} showLoader />);

        fireEvent.keyDown(getByTestId('input'), { code: 'Tab' });
        expect(mockOnChange).not.toBeCalled();
    });
});
