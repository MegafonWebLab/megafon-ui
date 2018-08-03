import * as React from 'react';
import { shallow } from 'enzyme';
import Link from './Link';

test('Link renders with default props', () => {
    const link = shallow(<Link/>);
    expect(link).toMatchSnapshot();
});
