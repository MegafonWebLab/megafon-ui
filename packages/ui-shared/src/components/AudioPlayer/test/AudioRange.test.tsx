import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AudioRange, { IAudioRangeProps } from '../AudioRange';

const props: IAudioRangeProps = {
    maxValue: 100,
    value: 10,
    step: '1',
    colorPercent: 10,
    dataAttrs: { 'data-testid': 'AudioRange' },
};

describe('<AudioRange />', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render component', () => {
        const { container } = render(<AudioRange {...props} />);

        expect(container).toMatchSnapshot();
    });

    it('should render with custom class name', () => {
        render(<AudioRange {...props} className="custom-class-name" />);

        const rootEl = screen.getByTestId('AudioRange');

        expect(rootEl).toHaveClass('custom-class-name');
    });

    it('should call handle change callback', () => {
        const onChangeMock = jest.fn();
        render(<AudioRange {...props} onChange={onChangeMock} />);

        const rootEl = screen.getByTestId('AudioRange');
        fireEvent.change(rootEl, { target: { value: 50 } });

        expect(onChangeMock).toBeCalled();
    });

    it('should call mouse up callback', () => {
        const handleMouseUp = jest.fn();
        render(<AudioRange {...props} onMouseUp={handleMouseUp} />);

        const rootEl = screen.getByTestId('AudioRange');
        fireEvent.mouseUp(rootEl);

        expect(handleMouseUp).toBeCalled();
    });

    it('should call touch end callback', () => {
        const handleTouchEnd = jest.fn();
        render(<AudioRange {...props} onTouchEnd={handleTouchEnd} />);

        const rootEl = screen.getByTestId('AudioRange');
        fireEvent.touchEnd(rootEl);

        expect(handleTouchEnd).toBeCalled();
    });
});
