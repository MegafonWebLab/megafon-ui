import * as React from 'react';
import { render } from '@testing-library/react';
import Grid, { IGridProps } from './Grid';
import GridColumn from './GridColumn';

const dataAttrs: IGridProps['dataAttrs'] = {
    root: {
        'data-testid': 'root',
    },
    container: {
        'data-testid': 'container',
    },
};

describe('<Grid />', () => {
    it('should render Grid', () => {
        const { container } = render(
            <Grid>
                <GridColumn>child1</GridColumn>
                <GridColumn>child2</GridColumn>
            </Grid>,
        );

        expect(container).toMatchSnapshot();
    });

    it('should render with className', () => {
        const { getByTestId } = render(
            <Grid className="custom-class" dataAttrs={dataAttrs}>
                <GridColumn>child1</GridColumn>
            </Grid>,
        );

        expect(getByTestId('root')).toHaveClass('custom-class');
    });

    it('should render with dataAttrs', () => {
        const { queryByTestId } = render(
            <Grid dataAttrs={dataAttrs}>
                <GridColumn>child1</GridColumn>
            </Grid>,
        );

        expect(queryByTestId('root')).toBeTruthy();
        expect(queryByTestId('container')).toBeTruthy();
    });

    it('should render with hAlign', () => {
        const { getByTestId } = render(
            <Grid hAlign="center" dataAttrs={dataAttrs}>
                <GridColumn>child1</GridColumn>
            </Grid>,
        );

        expect(getByTestId('container')).toHaveClass('mfui-grid__container_h-align_center');
    });

    it('should render with vAlign', () => {
        const { getByTestId } = render(
            <Grid vAlign="center" dataAttrs={dataAttrs}>
                <GridColumn>child1</GridColumn>
            </Grid>,
        );

        expect(getByTestId('container')).toHaveClass('mfui-grid__container_v-align_center');
    });

    it('should render with guttersLeft', () => {
        const { getByTestId } = render(
            <Grid guttersLeft="medium" dataAttrs={dataAttrs}>
                <GridColumn dataAttrs={{ root: { 'data-testid': 'column-root' } }}>child1</GridColumn>
            </Grid>,
        );

        expect(getByTestId('container')).toHaveClass('mfui-grid__container_gutters-left_medium');
        expect(getByTestId('column-root')).toHaveClass('mfui-grid__column_gutter-left_medium');
    });

    it('should render with guttersBottom', () => {
        const { getByTestId } = render(
            <Grid guttersBottom="medium" dataAttrs={dataAttrs}>
                <GridColumn dataAttrs={{ root: { 'data-testid': 'column-root' } }}>child1</GridColumn>
            </Grid>,
        );

        expect(getByTestId('container')).toHaveClass('mfui-grid__container_gutters-bottom_medium');
        expect(getByTestId('column-root')).toHaveClass('mfui-grid__column_gutter-bottom_medium');
    });

    it('should render with multiRow', () => {
        const { getByTestId } = render(
            <Grid multiRow dataAttrs={dataAttrs}>
                <GridColumn>child1</GridColumn>
            </Grid>,
        );

        expect(getByTestId('container')).toHaveClass('mfui-grid__container_multi-row');
    });
});
