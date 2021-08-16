/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { shallow } from 'enzyme';
import * as React from 'react';
import Link from './Link';

test('Link renders with default props', () => {
    const link = shallow(<Link href="asd" />);
    expect(link).toMatchSnapshot();
});

test('Link renders children', () => {
    const link = shallow(
        <Link href="asd">
            <h3>some text</h3>
        </Link>,
    );
    expect(link).toMatchSnapshot();
});

test('Link renders with rel', () => {
    const link = shallow(
        <Link href="asd" rel="noopener">
            <h3>No opener</h3>
        </Link>,
    );
    expect(link).toMatchSnapshot();
});

test('Link calls onClick handler', () => {
    const fn = jest.fn();
    const amountCalls = 1;
    const link = shallow(
        <Link href="asd" onClick={fn}>
            some text
        </Link>,
    );

    link.simulate('click');
    expect(fn).toHaveBeenCalledTimes(amountCalls);
});

test('Link renders with attribute download', () => {
    const link = shallow(<Link href="asd" download />);
    expect(link).toMatchSnapshot();
});
