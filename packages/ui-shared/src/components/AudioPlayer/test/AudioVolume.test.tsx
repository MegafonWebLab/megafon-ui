import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import type { IAudioRangeProps } from '../AudioRange';
import AudioVolume, { IAudioVolumeProps } from '../AudioVolume';

const props: IAudioVolumeProps = {
    onChangeAudioVolume: jest.fn(),
};

const setTrackVolume = jest.fn();
const setMockedState = ({ trackVolume = 0.3 } = {}): void => {
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [trackVolume, setTrackVolume]);
};

const getWrapper = (additionalProps?: Partial<IAudioVolumeProps>): ShallowWrapper =>
    shallow(<AudioVolume {...props} {...additionalProps} />);

describe('<AudioVolume />', () => {
    afterEach(() => jest.clearAllMocks());
    afterAll(() => jest.restoreAllMocks());

    describe('snapshots', () => {
        it('should render component', () => {
            setMockedState();

            const wrapper = getWrapper();
            expect(wrapper).toMatchSnapshot();
        });

        it('should render component when trackVolume to 0', () => {
            setMockedState({ trackVolume: 0 });

            const wrapper = getWrapper();
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('handleScrubVolume', () => {
        it('should update state and call onChangeAudioVolume', () => {
            const trackVolumeValue = 0.8;
            const event = { target: { value: `${trackVolumeValue}` } } as React.ChangeEvent<HTMLInputElement>;

            setMockedState();

            const wrapper = getWrapper();
            const AudioRangeProps = wrapper.find('AudioRange').props() as IAudioRangeProps;
            AudioRangeProps.onChange(event);

            expect(setTrackVolume).toBeCalledWith(trackVolumeValue);
            expect(props.onChangeAudioVolume).toBeCalledWith(trackVolumeValue);
        });
    });
});
