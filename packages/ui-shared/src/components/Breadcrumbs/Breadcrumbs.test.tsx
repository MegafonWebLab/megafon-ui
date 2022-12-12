import React from 'react';
import { render } from '@testing-library/react';
import Breadcrumbs, { Props } from './Breadcrumbs';

const items = [
    {
        title: 'МегаФон',
        href: '#',
    },
    {
        title: 'Мобильная связь',
        href: '#',
    },
    {
        title: 'Тарифы',
        href: '#',
    },
];

const dataAttrs: Props['dataAttrs'] = {
    root: {
        'data-testid': 'root',
    },
    item: {
        'data-testid': 'item',
    },
    itemInner: {
        'data-testid': 'itemInner',
    },
    itemTitle: {
        'data-testid': 'itemTitle',
    },
    itemMeta: {
        'data-testid': 'itemMeta',
    },
    link: {
        'data-testid': 'link',
    },
};

describe('<Breadcrumbs />', () => {
    it('should render Breadcrumbs', () => {
        const { container } = render(<Breadcrumbs items={items} />);

        expect(container).toMatchSnapshot();
    });

    it('should render Breadcrumbs with custom items', () => {
        const { container } = render(
            <Breadcrumbs
                items={[<a href="test1.com">Item 1</a>, <a href="test2.com">Item 2</a>, <span>Item 3</span>]}
            />,
        );

        expect(container).toMatchSnapshot();
    });

    it('should render with classes', () => {
        const { getByTestId } = render(
            <Breadcrumbs
                className="custom-class"
                classes={{
                    item: 'item-class',
                    itemTitle: 'item-title-class',
                    lastItemTitle: 'last-item-title-class',
                    link: 'link-class',
                }}
                items={items}
                dataAttrs={dataAttrs}
            />,
        );

        expect(getByTestId('root')).toHaveClass('custom-class');
        expect(getByTestId('item[1]')).toHaveClass('item-class');
        expect(getByTestId('itemTitle[1]')).toHaveClass('item-title-class');
        expect(getByTestId('itemTitle[3]')).toHaveClass('last-item-title-class');
        expect(getByTestId('link[1]')).toHaveClass('link-class');
    });

    it('should render with color', () => {
        const { getByTestId } = render(<Breadcrumbs color="white" items={items} dataAttrs={dataAttrs} />);

        expect(getByTestId('root')).toHaveClass('mfui-breadcrumbs_color_white');
        expect(getByTestId('link[1]')).toHaveClass('mfui-text-link_color_white');
        expect(getByTestId('itemInner[3]')).toHaveClass('mfui-breadcrumbs-item_color_white');
    });

    it('should render when hasMicrodata is true', () => {
        const { getByTestId } = render(<Breadcrumbs hasMicrodata items={items} dataAttrs={dataAttrs} />);
        const root = getByTestId('root');
        const itemInner = getByTestId('itemInner[1]');

        expect(root).toHaveAttribute('itemscope');
        expect(root).toHaveAttribute('itemtype', 'https://schema.org/BreadcrumbList');
        expect(itemInner).toHaveAttribute('itemscope');
        expect(itemInner).toHaveAttribute('itemprop', 'itemListElement');
        expect(itemInner).toHaveAttribute('itemtype', 'https://schema.org/ListItem');
        expect(getByTestId('link[1]')).toHaveAttribute('itemprop', 'item');
        expect(getByTestId('itemTitle[1]')).toHaveAttribute('itemprop', 'name');
        expect(getByTestId('itemMeta[1]')).toHaveAttribute('itemprop', 'position');
    });

    it('should render when hasMicrodata is false', () => {
        const { getByTestId, queryByTestId } = render(
            <Breadcrumbs hasMicrodata={false} items={items} dataAttrs={dataAttrs} />,
        );
        const root = getByTestId('root');
        const itemInner = getByTestId('itemInner[1]');

        expect(root).not.toHaveAttribute('itemscope');
        expect(root).not.toHaveAttribute('itemtype');
        expect(itemInner).not.toHaveAttribute('itemscope');
        expect(itemInner).not.toHaveAttribute('itemprop');
        expect(itemInner).not.toHaveAttribute('itemtype');
        expect(getByTestId('link[1]')).not.toHaveAttribute('itemprop');
        expect(getByTestId('itemTitle[1]')).not.toHaveAttribute('itemprop');
        expect(queryByTestId('itemMeta[1]')).not.toBeInTheDocument();
    });
});
