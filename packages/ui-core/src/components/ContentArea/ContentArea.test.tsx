import * as React from 'react';
import { render } from '@testing-library/react';
import ContentArea, { IConrentAreaProps } from './ContentArea';

const dataAttrs: IConrentAreaProps['dataAttrs'] = {
    root: {
        'data-testid': 'root',
    },
    inner: {
        'data-testid': 'inner',
    },
};

describe('<ContentArea />', () => {
    it('should render ContentArea', () => {
        const { container } = render(<ContentArea>children</ContentArea>);

        expect(container).toMatchSnapshot();
    });

    it('should render with classes', () => {
        const { getByTestId } = render(
            <ContentArea
                className="custom-class"
                classes={{
                    root: 'root-class',
                    inner: 'inner-class',
                }}
                dataAttrs={dataAttrs}
            >
                children
            </ContentArea>,
        );

        expect(getByTestId('root')).toHaveClass('custom-class');
        expect(getByTestId('root')).toHaveClass('root-class');
        expect(getByTestId('inner')).toHaveClass('inner-class');
    });

    it('should render with dataAttrs', () => {
        const { queryByTestId } = render(<ContentArea dataAttrs={dataAttrs}>children</ContentArea>);

        expect(queryByTestId('root')).toBeTruthy();
        expect(queryByTestId('inner')).toBeTruthy();
    });

    it('should render with outerBackgroundColor', () => {
        const { getByTestId } = render(
            <ContentArea dataAttrs={dataAttrs} outerBackgroundColor="spbSky1">
                children
            </ContentArea>,
        );

        expect(getByTestId('root')).toHaveClass('mfui-content-area_background-color_spbSky1');
    });

    it('should render with innerBackgroundColor', () => {
        const { getByTestId } = render(
            <ContentArea dataAttrs={dataAttrs} innerBackgroundColor="spbSky1">
                children
            </ContentArea>,
        );

        expect(getByTestId('inner')).toHaveClass('mfui-content-area__inner_background-color_spbSky1');
    });

    it('should render with disableIndents', () => {
        const { getByTestId } = render(
            <ContentArea dataAttrs={dataAttrs} disableIndents="mobile-tablet">
                children
            </ContentArea>,
        );

        expect(getByTestId('inner')).toHaveClass('mfui-content-area__inner_disable-indents_mobile-tablet');
    });
});
