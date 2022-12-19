import React from 'react';
import { shallow } from 'enzyme';
import AudioRange, { IAudioRangeProps } from '../AudioRange';

const props: IAudioRangeProps = {
    className: 'test-className',
    maxValue: 100,
    value: 10,
    step: '1',
    colorPercent: 10,
    onChange: jest.fn(),
    onMouseUp: jest.fn(),
    onTouchEnd: jest.fn(),
};

describe('<AudioRange />', () => {
    describe('snapshots', () => {
        it('should render component', () => {
            const wrapper = shallow(<AudioRange {...props} />);
            expect(wrapper).toMatchSnapshot();
        });
    });
});
