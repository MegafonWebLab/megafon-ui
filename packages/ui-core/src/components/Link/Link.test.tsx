import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Link, { ILinkProps } from './Link';

const dataAttrs: ILinkProps['dataAttrs'] = {
    root: {
        'data-testid': 'root',
    },
};

describe('<Link />', () => {
    it('should render Link', () => {
        const { container } = render(<Link>Link</Link>);

        expect(container).toMatchSnapshot();
    });

    it('should render with className', () => {
        const { getByTestId } = render(
            <Link className="custom-class" dataAttrs={dataAttrs}>
                Link
            </Link>,
        );

        expect(getByTestId('root')).toHaveClass('custom-class');
    });

    it('should render with href', () => {
        const { getByTestId } = render(
            <Link href="test.com" dataAttrs={dataAttrs}>
                Link
            </Link>,
        );

        expect(getByTestId('root')).toHaveAttribute('href', 'test.com');
    });

    it('should render with target', () => {
        const { getByTestId } = render(
            <Link target="_blank" dataAttrs={dataAttrs}>
                Link
            </Link>,
        );

        expect(getByTestId('root')).toHaveAttribute('target', '_blank');
    });

    it('should render with rel', () => {
        const { getByTestId } = render(
            <Link rel="contact" dataAttrs={dataAttrs}>
                Link
            </Link>,
        );

        expect(getByTestId('root')).toHaveAttribute('rel', 'contact');
    });

    it('should render with download', () => {
        const { getByTestId } = render(
            <Link download dataAttrs={dataAttrs}>
                Link
            </Link>,
        );

        expect(getByTestId('root')).toHaveAttribute('download');
    });

    it('should render with itemProp', () => {
        const { getByTestId } = render(
            <Link itemProp="item" dataAttrs={dataAttrs}>
                Link
            </Link>,
        );

        expect(getByTestId('root')).toHaveAttribute('itemprop', 'item');
    });

    it('should render with children', () => {
        const { queryByText } = render(
            <Link download dataAttrs={dataAttrs}>
                Link
            </Link>,
        );

        expect(queryByText('Link')).toBeInTheDocument();
    });

    it('should call onClick', () => {
        const onClickMock = jest.fn();
        const { getByTestId } = render(
            <Link onClick={onClickMock} dataAttrs={dataAttrs}>
                Link
            </Link>,
        );

        fireEvent.click(getByTestId('root'));

        expect(onClickMock).toBeCalled();
    });
});
