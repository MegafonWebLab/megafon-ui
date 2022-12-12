import React from 'react';
import { render } from '@testing-library/react';
import BreadcrumbsItem, { Props } from './BreadcrumbsItem';

const dataAttrs: Props['dataAttrs'] = {
    root: {
        'data-testid': 'root',
    },
    link: {
        'data-testid': 'link',
    },
    itemTitle: {
        'data-testid': 'itemTitle',
    },
    meta: {
        'data-testid': 'meta',
    },
};

describe('<BreadcrumbsItem />', () => {
    it('should render BreadcrumbsItem', () => {
        const { container } = render(<BreadcrumbsItem title="Title" />);

        expect(container).toMatchSnapshot();
    });

    it('should render with classes', () => {
        const { getByTestId } = render(
            <BreadcrumbsItem classes={{ link: 'link-class', itemTitle: 'item-title-class' }} dataAttrs={dataAttrs} />,
        );

        expect(getByTestId('link[1]')).toHaveClass('link-class');
        expect(getByTestId('itemTitle[1]')).toHaveClass('item-title-class');
    });

    it('should render with title', () => {
        const { getByText } = render(<BreadcrumbsItem title="Title" dataAttrs={dataAttrs} />);

        expect(getByText('Title')).toBeInTheDocument();
    });

    it('should render with href', () => {
        const { getByTestId } = render(<BreadcrumbsItem href="test.com" dataAttrs={dataAttrs} />);

        expect(getByTestId('link[1]')).toHaveAttribute('href', 'test.com');
    });

    it('should render with color', () => {
        const { getByTestId } = render(<BreadcrumbsItem color="white" dataAttrs={dataAttrs} />);

        expect(getByTestId('link[1]')).toHaveClass('mfui-text-link_color_white');
    });

    it('should render with index', () => {
        const { queryByTestId } = render(<BreadcrumbsItem index={3} hasMicrodata dataAttrs={dataAttrs} />);

        expect(queryByTestId('root[4]')).toBeTruthy();
        expect(queryByTestId('link[4]')).toBeTruthy();
        expect(queryByTestId('itemTitle[4]')).toBeTruthy();
        expect(queryByTestId('meta[4]')).toHaveAttribute('content', '4');
    });

    it('should render when hasMicrodata is true', () => {
        const { getByTestId } = render(<BreadcrumbsItem hasMicrodata dataAttrs={dataAttrs} />);
        const root = getByTestId('root[1]');

        expect(root).toHaveAttribute('itemscope');
        expect(root).toHaveAttribute('itemprop', 'itemListElement');
        expect(root).toHaveAttribute('itemtype', 'https://schema.org/ListItem');
        expect(getByTestId('link[1]')).toHaveAttribute('itemprop', 'item');
        expect(getByTestId('itemTitle[1]')).toHaveAttribute('itemprop', 'name');
        expect(getByTestId('meta[1]')).toHaveAttribute('itemprop', 'position');
    });

    it('should render when hasMicrodata is false', () => {
        const { getByTestId, queryByTestId } = render(<BreadcrumbsItem hasMicrodata={false} dataAttrs={dataAttrs} />);
        const root = getByTestId('root[1]');

        expect(root).not.toHaveAttribute('itemscope');
        expect(root).not.toHaveAttribute('itemprop');
        expect(root).not.toHaveAttribute('itemtype');
        expect(getByTestId('link[1]')).not.toHaveAttribute('itemprop');
        expect(getByTestId('itemTitle[1]')).not.toHaveAttribute('itemprop');
        expect(queryByTestId('meta[1]')).not.toBeInTheDocument();
    });

    describe('last item', () => {
        it('should render BreadcrumbsItem', () => {
            const { container } = render(<BreadcrumbsItem title="Title" isLastItem />);

            expect(container).toMatchSnapshot();
        });

        it('should render with classes', () => {
            const { getByTestId } = render(
                <BreadcrumbsItem
                    isLastItem
                    classes={{ lastItemTitle: 'last-item-title-class' }}
                    dataAttrs={dataAttrs}
                />,
            );

            expect(getByTestId('itemTitle[1]')).toHaveClass('last-item-title-class');
        });

        it('should render with title', () => {
            const { getByText } = render(<BreadcrumbsItem title="Title" dataAttrs={dataAttrs} isLastItem />);

            expect(getByText('Title')).toBeInTheDocument();
        });

        it('should render with index', () => {
            const { queryByTestId } = render(<BreadcrumbsItem index={3} isLastItem dataAttrs={dataAttrs} />);

            expect(queryByTestId('root[4]')).toBeTruthy();
            expect(queryByTestId('itemTitle[4]')).toBeTruthy();
        });

        it('should render with color', () => {
            const { getByTestId } = render(<BreadcrumbsItem color="white" isLastItem dataAttrs={dataAttrs} />);

            expect(getByTestId('root[1]')).toHaveClass('mfui-breadcrumbs-item_color_white');
        });

        it('should render when hasMicrodata is true', () => {
            const { getByTestId, queryByTestId } = render(
                <BreadcrumbsItem hasMicrodata isLastItem dataAttrs={dataAttrs} />,
            );
            const root = getByTestId('root[1]');

            expect(root).not.toHaveAttribute('itemscope');
            expect(root).not.toHaveAttribute('itemprop');
            expect(root).not.toHaveAttribute('itemtype');
            expect(getByTestId('itemTitle[1]')).not.toHaveAttribute('itemprop');
            expect(queryByTestId('meta[1]')).not.toBeInTheDocument();
        });
    });
});
