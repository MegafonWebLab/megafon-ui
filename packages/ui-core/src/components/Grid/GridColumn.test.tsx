import * as React from 'react';
import { render } from '@testing-library/react';
import GridColumn, { IGridColumn } from './GridColumn';

const dataAttrs: IGridColumn['dataAttrs'] = {
    root: {
        'data-testid': 'root',
    },
};

describe('<GridColumn />', () => {
    it('shoud render GridColumn', () => {
        const { container } = render(<GridColumn>item</GridColumn>);

        expect(container).toMatchSnapshot();
    });

    it('shoud render with className', () => {
        const { getByTestId } = render(
            <GridColumn className="custom-class" dataAttrs={dataAttrs}>
                item
            </GridColumn>,
        );

        expect(getByTestId('root')).toHaveClass('custom-class');
    });

    it('shoud render with dataAttrs', () => {
        const { queryByTestId } = render(<GridColumn dataAttrs={dataAttrs}>item</GridColumn>);

        expect(queryByTestId('root')).toBeTruthy();
    });

    it('shoud render with size', () => {
        const { getByTestId } = render(
            <GridColumn all="5" wide="1" desktop="2" tablet="3" mobile="4" dataAttrs={dataAttrs}>
                item
            </GridColumn>,
        );

        const rootNode = getByTestId('root');

        expect(rootNode).toHaveClass('mfui-grid-column_all_5');
        expect(rootNode).toHaveClass('mfui-grid-column_wide_1');
        expect(rootNode).toHaveClass('mfui-grid-column_desktop_2');
        expect(rootNode).toHaveClass('mfui-grid-column_tablet_3');
        expect(rootNode).toHaveClass('mfui-grid-column_mobile_4');
    });

    it('shoud render with order', () => {
        const { getByTestId } = render(
            <GridColumn
                orderAll="5"
                orderWide="1"
                orderDesktop="2"
                orderTablet="3"
                orderMobile="4"
                dataAttrs={dataAttrs}
            >
                item
            </GridColumn>,
        );
        const rootNode = getByTestId('root');

        expect(rootNode).toHaveClass('mfui-grid-column_all-order_5');
        expect(rootNode).toHaveClass('mfui-grid-column_wide-order_1');
        expect(rootNode).toHaveClass('mfui-grid-column_desktop-order_2');
        expect(rootNode).toHaveClass('mfui-grid-column_tablet-order_3');
        expect(rootNode).toHaveClass('mfui-grid-column_mobile-order_4');
    });

    it('shoud render with leftOffset', () => {
        const { getByTestId } = render(
            <GridColumn
                leftOffsetAll="5"
                leftOffsetWide="1"
                leftOffsetDesktop="2"
                leftOffsetTablet="3"
                leftOffsetMobile="4"
                dataAttrs={dataAttrs}
            >
                item
            </GridColumn>,
        );
        const rootNode = getByTestId('root');

        expect(rootNode).toHaveClass('mfui-grid-column_left-offset-all_5');
        expect(rootNode).toHaveClass('mfui-grid-column_left-offset-wide_1');
        expect(rootNode).toHaveClass('mfui-grid-column_left-offset-desktop_2');
        expect(rootNode).toHaveClass('mfui-grid-column_left-offset-tablet_3');
        expect(rootNode).toHaveClass('mfui-grid-column_left-offset-mobile_4');
    });

    it('shoud render with rightOffset', () => {
        const { getByTestId } = render(
            <GridColumn
                rightOffsetAll="5"
                rightOffsetWide="1"
                rightOffsetDesktop="2"
                rightOffsetTablet="3"
                rightOffsetMobile="4"
                dataAttrs={dataAttrs}
            >
                item
            </GridColumn>,
        );
        const rootNode = getByTestId('root');

        expect(rootNode).toHaveClass('mfui-grid-column_right-offset-all_5');
        expect(rootNode).toHaveClass('mfui-grid-column_right-offset-wide_1');
        expect(rootNode).toHaveClass('mfui-grid-column_right-offset-desktop_2');
        expect(rootNode).toHaveClass('mfui-grid-column_right-offset-tablet_3');
        expect(rootNode).toHaveClass('mfui-grid-column_right-offset-mobile_4');
    });

    it('shoud render with align', () => {
        const { getByTestId } = render(
            <GridColumn align="center" dataAttrs={dataAttrs}>
                item
            </GridColumn>,
        );

        expect(getByTestId('root')).toHaveClass('mfui-grid-column_align_center');
    });

    it('shoud render with grow', () => {
        const { getByTestId } = render(
            <GridColumn grow dataAttrs={dataAttrs}>
                item
            </GridColumn>,
        );

        expect(getByTestId('root')).toHaveClass('mfui-grid-column_grow');
    });

    it('shoud render with flex', () => {
        const { getByTestId } = render(
            <GridColumn flex dataAttrs={dataAttrs}>
                item
            </GridColumn>,
        );

        expect(getByTestId('root')).toHaveClass('mfui-grid-column_flex');
    });
});
