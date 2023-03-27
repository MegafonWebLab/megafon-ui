import * as React from 'react';
import Balance from '@megafon/ui-icons/basic-24-balance_24.svg';
import { fireEvent, render } from '@testing-library/react';
import Tab from './Tab';
import Tabs, { ITabsProps } from './Tabs';

const renderTabWrapper = (tab: React.ReactNode) => <div data-testid="renderTabWrapper">{tab}</div>;

const dataAttrs: ITabsProps['dataAttrs'] = {
    root: { 'data-testid': 'root' },
    prev: { 'data-testid': 'prev' },
    next: { 'data-testid': 'next' },
    panel: { 'data-testid': 'panel' },
    slider: { 'data-testid': 'slider' },
    wrapper: { 'data-testid': 'wrapper' },
    swiperWrapper: { 'data-testid': 'swiperWrapper' },
};

const props = {
    className: 'className',
    classes: {
        tab: 'tab',
        root: 'root',
        wrapper: 'wrapper',
        activeTab: 'activeTab',
        innerIndents: 'innerIndents',
        swiperWrapper: 'swiperWrapper',
    },
};

describe('<Tabs />', () => {
    it('should render with default props', () => {
        const { container } = render(
            <Tabs>
                <Tab>1</Tab>
                <Tab>2</Tab>
            </Tabs>,
        );

        expect(container).toMatchSnapshot();
    });

    it('should render first tab as link and with optional props', () => {
        const href = '/test';
        const rel = 'nofollow';
        const { getByTestId } = render(
            <Tabs>
                <Tab
                    rel={rel}
                    href={href}
                    title="title 1"
                    icon={<Balance />}
                    dataAttrs={{ root: { 'data-testid': 'root' }, inner: { 'data-testid': 'inner' } }}
                >
                    1
                </Tab>
                <Tab>2</Tab>
            </Tabs>,
        );
        const tab1 = getByTestId('inner[1]');

        expect(tab1).toHaveAttribute('rel', rel);
        expect(tab1).toHaveAttribute('href', href);
        expect(tab1).toHaveClass('mfui-tabs__tab-inner_current');
        expect(tab1).toHaveClass('mfui-tabs__tab-inner_with-icon');
        expect(getByTestId('root[1]')).toMatchSnapshot();
    });

    it('should render first tab with renderTabWrapper', () => {
        const { getByTestId } = render(
            <Tabs>
                <Tab renderTabWrapper={renderTabWrapper}>1</Tab>
                <Tab>2</Tab>
            </Tabs>,
        );

        expect(getByTestId('renderTabWrapper')).toBeInTheDocument();
    });

    it('should render without first panel', () => {
        const { getByTestId, queryByTestId } = render(
            <Tabs dataAttrs={dataAttrs}>
                <Tab />
                <Tab>2</Tab>
            </Tabs>,
        );

        expect(queryByTestId('panel[1]')).not.toBeInTheDocument();
        expect(getByTestId('panel[2]')).toBeInTheDocument();
    });

    it('should render first panel', () => {
        const { getByTestId } = render(
            <Tabs dataAttrs={dataAttrs}>
                <Tab>1</Tab>
                <Tab>2</Tab>
            </Tabs>,
        );

        expect(getByTestId('panel[1]')).toHaveClass('mfui-tabs__panel_current');
    });

    it('should render with className', () => {
        const { getByTestId } = render(
            <Tabs dataAttrs={dataAttrs} className={props.className}>
                <Tab>1</Tab>
                <Tab>2</Tab>
            </Tabs>,
        );

        expect(getByTestId('root')).toHaveClass(props.className);
    });

    it('should render with classes', () => {
        const { getByTestId } = render(
            <Tabs dataAttrs={dataAttrs} classes={props.classes}>
                <Tab dataAttrs={{ root: { 'data-testid': 'tab' } }}>1</Tab>
                <Tab>2</Tab>
            </Tabs>,
        );

        expect(getByTestId('root')).toHaveClass(props.classes.root);
        expect(getByTestId('wrapper')).toHaveClass(props.classes.wrapper);
        expect(getByTestId('swiperWrapper')).toHaveClass(props.classes.swiperWrapper);
        expect(getByTestId('slider')).toHaveClass(props.classes.innerIndents);
        expect(getByTestId('tab[1]')).toHaveClass(props.classes.tab);
        expect(getByTestId('tab[1]')).toHaveClass(props.classes.activeTab);
    });

    it('should render with dataAttrs', () => {
        const { getByTestId } = render(
            <Tabs dataAttrs={dataAttrs} classes={props.classes}>
                <Tab dataAttrs={{ root: { 'data-testid': 'tab' } }}>1</Tab>
                <Tab>2</Tab>
            </Tabs>,
        );

        expect(getByTestId('root')).toBeInTheDocument();
        expect(getByTestId('slider')).toBeInTheDocument();
        expect(getByTestId('panel[1]')).toBeInTheDocument();
        expect(getByTestId('prev')).toBeInTheDocument();
        expect(getByTestId('next')).toBeInTheDocument();
        expect(getByTestId('wrapper')).toBeInTheDocument();
        expect(getByTestId('swiperWrapper')).toBeInTheDocument();
    });

    it('should render with size prop', () => {
        const { getByTestId } = render(
            <Tabs dataAttrs={dataAttrs} size="large">
                <Tab>1</Tab>
                <Tab>2</Tab>
            </Tabs>,
        );

        expect(getByTestId('root')).toHaveClass('mfui-tabs_size_large');
    });

    it('should render with tabColorTheme prop', () => {
        const { getByTestId } = render(
            <Tabs dataAttrs={dataAttrs} tabColorTheme="green">
                <Tab>1</Tab>
                <Tab>2</Tab>
            </Tabs>,
        );

        expect(getByTestId('root')).toHaveClass('mfui-tabs_tab-color_green');
    });

    it('should render with autoWidth prop', () => {
        const { getByTestId } = render(
            <Tabs dataAttrs={dataAttrs} autoWidth>
                <Tab>1</Tab>
                <Tab>2</Tab>
            </Tabs>,
        );

        expect(getByTestId('root')).toHaveClass('mfui-tabs_auto-width');
    });

    it('should render with align prop', () => {
        const { getByTestId } = render(
            <Tabs dataAttrs={dataAttrs} align="center">
                <Tab>1</Tab>
                <Tab>2</Tab>
            </Tabs>,
        );

        expect(getByTestId('root')).toHaveClass('mfui-tabs_h-align_center');
    });

    it('should render with currentIndex prop', () => {
        const { getByTestId } = render(
            <Tabs dataAttrs={dataAttrs} currentIndex={1}>
                <Tab>1</Tab>
                <Tab dataAttrs={{ inner: { 'data-testid': 'tab' } }}>2</Tab>
            </Tabs>,
        );

        expect(getByTestId('tab[2]')).toHaveClass('mfui-tabs__tab-inner_current');
    });

    it('should render with defaultIndex prop', () => {
        const { getByTestId } = render(
            <Tabs dataAttrs={dataAttrs} defaultIndex={1}>
                <Tab>1</Tab>
                <Tab dataAttrs={{ inner: { 'data-testid': 'tab' } }}>2</Tab>
            </Tabs>,
        );

        expect(getByTestId('tab[2]')).toHaveClass('mfui-tabs__tab-inner_current');
    });

    it('should render with renderOnlyCurrentPanel prop', () => {
        const { getByTestId, queryByTestId } = render(
            <Tabs dataAttrs={dataAttrs} renderOnlyCurrentPanel>
                <Tab>1</Tab>
                <Tab>2</Tab>
            </Tabs>,
        );

        expect(getByTestId('panel[1]')).toBeInTheDocument();
        expect(queryByTestId('panel[2]')).not.toBeInTheDocument();
    });

    it('should call onTabClick', () => {
        const mockOnTabClick = jest.fn();
        const { getByTestId } = render(
            <Tabs dataAttrs={dataAttrs} onTabClick={mockOnTabClick}>
                <Tab>1</Tab>
                <Tab dataAttrs={{ inner: { 'data-testid': 'tab' } }}>2</Tab>
            </Tabs>,
        );

        fireEvent.click(getByTestId('tab[2]'));

        expect(mockOnTabClick).toBeCalledWith(1);
    });
});
