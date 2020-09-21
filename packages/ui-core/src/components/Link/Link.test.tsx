import * as React from 'react';
import { shallow } from 'enzyme';
import Link from './Link';

test('Link renders with default props', () => {
    const link = shallow(<Link/>);
    expect(link).toMatchSnapshot();
});

test('Link renders children', () => {
    const link = shallow(<Link><h3>some text</h3></Link>);
    expect(link).toMatchSnapshot();
});

test('Link renders with rel', () => {
    const link = shallow(<Link rel="noopener"><h3>No opener</h3></Link>);
    expect(link).toMatchSnapshot();
});

test('Link calls onClick handler', () => {
    const fn = jest.fn();
    const link = shallow(<Link onClick={fn}>some text</Link>);

    link.simulate('click');
    expect(fn).toHaveBeenCalledTimes(1);
});
