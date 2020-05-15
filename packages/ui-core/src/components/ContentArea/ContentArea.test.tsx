import * as React from 'react';
import { shallow } from 'enzyme';
import ContentArea, { IProps, BackgroundColorType } from './ContentArea';

const props: Partial<IProps> = {
    outerBackgroundColor: 'white',
    innerBackgroundColor: 'white',
    innerPadding: 'none',
    mobileInnerPadding: 'none',
    className: 'test-class',
};

const backgroundColors = [
    'white',
    'transparent',
    'green',
    'purple',
    'spbSky0',
    'spbSky1',
    'spbSky2',
    'soggyAsphalt',
    'fullBlack',
];

describe('<ContentArea />', () => {
    const getWrapper = (additionalProps?: Partial<IProps>) =>
        shallow(
            <ContentArea {...additionalProps}>
                <span>child</span>
            </ContentArea>
        );

    it('renders correctly with default props', () => {
        const wrapper = getWrapper();
        expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly with custom props', () => {
        const wrapper = getWrapper(props);
        expect(wrapper).toMatchSnapshot();
    });

    backgroundColors.forEach(color => {
        it(`render component when outerBackgroundColor with ${color}`, () => {
            const wrapper = shallow(
                <ContentArea
                    outerBackgroundColor={color as BackgroundColorType}
                >
                    some content
                </ContentArea>
            );
            expect(wrapper).toMatchSnapshot();
        });
    });

    backgroundColors.forEach(color => {
        it(`render component when innerBackgroundColor with ${color}`, () => {
            const wrapper = shallow(
                <ContentArea
                    innerBackgroundColor={color as BackgroundColorType}
                >
                    some content
                </ContentArea>
            );
            expect(wrapper).toMatchSnapshot();
        });
    });
});
