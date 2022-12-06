import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Counter, { ICounterProps } from './Counter';

const dataAttrs: ICounterProps['dataAttrs'] = {
    root: {
        'data-testid': 'root',
    },
    input: {
        'data-testid': 'input',
    },
    minus: {
        'data-testid': 'minus',
    },
    plus: {
        'data-testid': 'plus',
    },
};

describe('<Counter />', () => {
    const onChangeMock = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render Counter', () => {
        const { container } = render(<Counter />);

        expect(container).toMatchSnapshot();
    });

    it('should render with classes', () => {
        const { getByTestId } = render(
            <Counter
                className="custom-class"
                classes={{
                    root: 'root-class',
                    input: 'input-class',
                    buttonMinus: 'button-minus-class',
                    buttonPlus: 'button-plus-class',
                }}
                dataAttrs={dataAttrs}
            />,
        );

        expect(getByTestId('root')).toHaveClass('root-class');
        expect(getByTestId('input')).toHaveClass('input-class');
        expect(getByTestId('minus')).toHaveClass('button-minus-class');
        expect(getByTestId('plus')).toHaveClass('button-plus-class');
    });

    describe('initialValue', () => {
        it('should render with initialValue', () => {
            const { getByTestId } = render(<Counter initialValue={10} min={5} dataAttrs={dataAttrs} />);

            expect(getByTestId('input')).toHaveAttribute('value', '10');
        });

        it('should render with initialValue after rerender', () => {
            const { getByTestId, rerender } = render(<Counter initialValue={10} min={5} dataAttrs={dataAttrs} />);

            rerender(<Counter initialValue={20} dataAttrs={dataAttrs} />);

            expect(getByTestId('input')).toHaveAttribute('value', '20');
        });

        it('should render without initialValue', () => {
            const { getByTestId } = render(<Counter dataAttrs={dataAttrs} min={5} />);

            expect(getByTestId('input')).toHaveAttribute('value', '5');
        });
    });

    describe('disabled', () => {
        it('should render when disabled is true', () => {
            const { getByTestId } = render(<Counter disabled dataAttrs={dataAttrs} />);

            expect(getByTestId('root')).toHaveClass('mfui-counter_disabled');
            expect(getByTestId('minus')).toHaveAttribute('disabled');
            expect(getByTestId('input')).toHaveAttribute('disabled');
            expect(getByTestId('plus')).toHaveAttribute('disabled');
        });

        it('should render when disabled is false and value greater than min and less than max', () => {
            const { getByTestId } = render(
                <Counter disabled={false} min={1} initialValue={2} max={3} dataAttrs={dataAttrs} />,
            );

            expect(getByTestId('root')).not.toHaveClass('mfui-counter_disabled');
            expect(getByTestId('minus')).not.toHaveAttribute('disabled');
            expect(getByTestId('input')).not.toHaveAttribute('disabled');
            expect(getByTestId('plus')).not.toHaveAttribute('disabled');
        });

        it('should render when disabled is false and value greater than max', () => {
            const { getByTestId } = render(
                <Counter initialValue={10} max={8} disabled={false} dataAttrs={dataAttrs} />,
            );

            expect(getByTestId('plus')).toHaveAttribute('disabled');
        });

        it('should render when disabled is false and value equals max', () => {
            const { getByTestId } = render(<Counter initialValue={8} max={8} disabled={false} dataAttrs={dataAttrs} />);

            expect(getByTestId('plus')).toHaveAttribute('disabled');
        });

        it('should render when disabled is false and value less than max', () => {
            const { getByTestId } = render(<Counter initialValue={7} max={8} disabled={false} dataAttrs={dataAttrs} />);

            expect(getByTestId('plus')).not.toHaveAttribute('disabled');
        });

        it('should render when disabled is false and value greater than min', () => {
            const { getByTestId } = render(
                <Counter initialValue={10} min={8} disabled={false} dataAttrs={dataAttrs} />,
            );

            expect(getByTestId('minus')).not.toHaveAttribute('disabled');
        });

        it('should render when disabled is false and value equals min', () => {
            const { getByTestId } = render(<Counter initialValue={8} min={8} disabled={false} dataAttrs={dataAttrs} />);

            expect(getByTestId('minus')).toHaveAttribute('disabled');
        });

        it('should render when disabled is false and value less than min', () => {
            const { getByTestId } = render(<Counter initialValue={7} min={8} disabled={false} dataAttrs={dataAttrs} />);

            expect(getByTestId('minus')).toHaveAttribute('disabled');
        });
    });

    describe('input change', () => {
        it('should render when value greater than min and less than max', () => {
            const value = 4;
            const { getByTestId } = render(<Counter min={3} max={5} onChange={onChangeMock} dataAttrs={dataAttrs} />);
            const input = getByTestId('input');

            fireEvent.change(input, { target: { value } });

            expect(input).toHaveAttribute('value', String(value));
            expect(onChangeMock).toBeCalledWith(value);
        });

        it('should render when value is not number', () => {
            const { getByTestId } = render(<Counter onChange={onChangeMock} dataAttrs={dataAttrs} />);
            const input = getByTestId('input');

            fireEvent.change(input, { target: { value: 'a' } });

            expect(input).toHaveAttribute('value', '0');
            expect(onChangeMock).not.toBeCalled();
        });

        it('should render when value less than min', () => {
            const min = 5;
            const value = 4;
            const { getByTestId } = render(<Counter min={min} onChange={onChangeMock} dataAttrs={dataAttrs} />);
            const input = getByTestId('input');

            fireEvent.change(input, { target: { value } });

            expect(input).toHaveAttribute('value', String(value));
            expect(onChangeMock).toBeCalledWith(min);
        });

        it('should render when value greater than max', () => {
            const max = 5;
            const value = 6;
            const { getByTestId } = render(<Counter max={max} onChange={onChangeMock} dataAttrs={dataAttrs} />);
            const input = getByTestId('input');

            fireEvent.change(input, { target: { value } });

            expect(input).toHaveAttribute('value', String(value));
            expect(onChangeMock).toBeCalledWith(max);
        });
    });

    describe('minus click', () => {
        it('should render when value greater than min and less than max', () => {
            const { getByTestId } = render(
                <Counter initialValue={5} min={3} max={5} onChange={onChangeMock} dataAttrs={dataAttrs} />,
            );

            fireEvent.click(getByTestId('minus'));

            expect(getByTestId('input')).toHaveAttribute('value', '4');
            expect(onChangeMock).toBeCalledWith(4);
        });

        it('should render when value equals min', () => {
            const min = 5;
            const { getByTestId } = render(
                <Counter initialValue={6} min={min} onChange={onChangeMock} dataAttrs={dataAttrs} />,
            );

            fireEvent.click(getByTestId('minus'));

            expect(getByTestId('input')).toHaveAttribute('value', String(min));
            expect(onChangeMock).toBeCalledWith(min);
        });
    });

    describe('plus click', () => {
        it('should render when value greater than min and less than max', () => {
            const { getByTestId } = render(
                <Counter initialValue={3} min={3} max={5} onChange={onChangeMock} dataAttrs={dataAttrs} />,
            );

            fireEvent.click(getByTestId('plus'));

            expect(getByTestId('input')).toHaveAttribute('value', '4');
            expect(onChangeMock).toBeCalledWith(4);
        });

        it('should render when value equals max', () => {
            const max = 5;
            const { getByTestId } = render(
                <Counter initialValue={4} max={max} onChange={onChangeMock} dataAttrs={dataAttrs} />,
            );

            fireEvent.click(getByTestId('plus'));

            expect(getByTestId('input')).toHaveAttribute('value', String(max));
            expect(onChangeMock).toBeCalledWith(max);
        });
    });

    describe('blur', () => {
        it('should render after blur when value less than min', () => {
            const min = 5;
            const { getByTestId } = render(<Counter min={min} onChange={onChangeMock} dataAttrs={dataAttrs} />);
            const input = getByTestId('input');

            fireEvent.change(input, { target: { value: 4 } });
            fireEvent.blur(input);

            expect(input).toHaveAttribute('value', String(min));
            expect(onChangeMock).toBeCalledWith(min);
            expect(onChangeMock).toBeCalledWith(min);
        });

        it('should render after blur when value greater than max', () => {
            const max = 5;
            const { getByTestId } = render(<Counter max={max} onChange={onChangeMock} dataAttrs={dataAttrs} />);
            const input = getByTestId('input');

            fireEvent.change(input, { target: { value: 6 } });
            fireEvent.blur(input);

            expect(input).toHaveAttribute('value', String(max));
            expect(onChangeMock).toBeCalledWith(max);
            expect(onChangeMock).toBeCalledWith(max);
        });
    });

    describe('controlled', () => {
        it('should render when isControlled is true', () => {
            const value = 10;
            const { getByTestId } = render(
                <Counter isControlled value={value} onChange={onChangeMock} dataAttrs={dataAttrs} />,
            );

            expect(getByTestId('input')).toHaveAttribute('value', String(value));
        });

        it('should render when isControlled is true after change', () => {
            const value = 10;
            const newValue = 6;
            const { getByTestId, rerender } = render(
                <Counter isControlled value={value} onChange={onChangeMock} dataAttrs={dataAttrs} />,
            );
            const input = getByTestId('input');

            fireEvent.change(input, { target: { value: newValue } });

            expect(onChangeMock).toBeCalledWith(newValue);
            expect(input).toHaveAttribute('value', String(value));

            rerender(<Counter isControlled value={newValue} onChange={onChangeMock} dataAttrs={dataAttrs} />);

            expect(input).toHaveAttribute('value', String(newValue));
        });
    });
});
