import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import AudioVolume from '../AudioVolume';

jest.mock('@megafon/ui-core/dist/lib/components/Tooltip/Tooltip', () => ({ children }) => (
    <div data-name="Tooltip">{children}</div>
));

describe('AudioVolume', () => {
    afterEach(() => jest.clearAllMocks());
    afterAll(() => jest.restoreAllMocks());

    it('should render component', () => {
        const { container } = render(<AudioVolume />);

        expect(container).toMatchSnapshot();
    });

    it('should call on change callback', () => {
        const onChangeMock = jest.fn();
        render(<AudioVolume onChangeAudioVolume={onChangeMock} />);

        const volumeRange = screen.getByTestId('AudioVolumeRange');
        fireEvent.change(volumeRange, { target: { value: 0.8 } });

        expect(onChangeMock).toHaveBeenCalledWith(0.8);
    });
});
