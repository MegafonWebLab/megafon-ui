/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { shallow } from 'enzyme';
import * as React from 'react';
import Logo from './Logo';

test('Logo renders with default props', () => {
    const logo = shallow(<Logo />);
    expect(logo).toMatchSnapshot();
});
