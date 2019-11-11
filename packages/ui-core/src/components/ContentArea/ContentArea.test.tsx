import * as React from 'react';
import { shallow } from 'enzyme';
import ContentArea, { IProps } from './ContentArea';

const props: IProps = {
    outerBackgroundColor: 'white',
    innerBackgroundColor: 'white',
    innerPadding: 'none',
};

describe('<ContentArea />', () => {
    const getWrapper = additionalProps => shallow(
        <ContentArea
            {...additionalProps}
        />
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
