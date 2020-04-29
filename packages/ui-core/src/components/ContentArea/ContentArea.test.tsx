import * as React from 'react';
import { shallow } from 'enzyme';
import ContentArea, { IContentAreaProps } from './ContentArea';

const props: Partial<IContentAreaProps> = {
    outerBackgroundColor: 'white',
    innerBackgroundColor: 'white',
    innerPadding: 'none',
    mobileInnerPadding: 'none',
    className: 'test-class',
};

describe('<ContentArea />', () => {
    const getWrapper = (additionalProps?: Partial<IContentAreaProps>) => shallow(
        <ContentArea
            {...additionalProps}
        >
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
});
