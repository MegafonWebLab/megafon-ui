import * as React from 'react';
import { shallow } from 'enzyme';
import Logo from './Logo';

test('Logo renders with default props', () => {
    const logo = shallow(<Logo/>);
    expect(logo).toMatchSnapshot();
});
