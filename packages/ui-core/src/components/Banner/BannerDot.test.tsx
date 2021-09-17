import * as React from 'react';
import { shallow } from 'enzyme';
import { cnCreate } from '@megafon/ui-helpers';
import BannerDot, { IBannerDotProps } from './BannerDot';

const props = {
    index: 3,
    isActive: false,
    showTimer: false,
    timerDelay: 0,
    onClick: jest.fn(),
} as IBannerDotProps;

const cn = cnCreate('.mfui-beta-banner-dot');

describe('<BannerDot />', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render with props', () => {
        const wrapper = shallow(<BannerDot {...props} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with className', () => {
        const wrapper = shallow(<BannerDot {...props} className="class" />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render without timer when isActive is true and showTimer is false', () => {
        const wrapper = shallow(<BannerDot {...props} isActive />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render without timer when isActive is false and showTimer is true', () => {
        const wrapper = shallow(<BannerDot {...props} showTimer />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render timer when isActive is true and showTimer is true', () => {
        const wrapper = shallow(<BannerDot {...props} showTimer isActive />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should call onClick', () => {
        const wrapper = shallow(<BannerDot {...props} showTimer isActive />);

        wrapper.find(cn()).simulate('click');

        expect(props.onClick).toBeCalledWith(props.index);
    });
});
