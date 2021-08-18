import { shallow } from 'enzyme';
import * as React from 'react';
import Link from './Link';

test('Link renders with default props', () => {
    const link = shallow(<Link href=" " />);
    expect(link).toMatchSnapshot();
});

test('Link renders children', () => {
    const link = shallow(
        <Link href=" ">
            <h3>some text</h3>
        </Link>,
    );
    expect(link).toMatchSnapshot();
});

test('Link renders with rel', () => {
    const link = shallow(
        <Link href=" " rel="noopener">
            <h3>No opener</h3>
        </Link>,
    );
    expect(link).toMatchSnapshot();
});

test('Link calls onClick handler', () => {
    const fn = jest.fn();
    const link = shallow(
        <Link href=" " onClick={fn}>
            some text
        </Link>,
    );

    link.simulate('click');
    // eslint-disable-next-line no-magic-numbers
    expect(fn).toHaveBeenCalledTimes(1);
});

test('Link renders with attribute download', () => {
    const link = shallow(<Link href=" " download />);
    expect(link).toMatchSnapshot();
});
