import * as React from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import Balance from '@megafon/ui-icons/basic-24-balance_24.svg';
import { shallow } from 'enzyme';
import Tab from './Tab';
import Tabs, { TabSize, TabColorTheme, ITabsProps, TabHAlign } from './Tabs';

const renderTabWrapper = (tab: React.ReactNode) => <div className="tab-wrapper">{tab}</div>;

const dataAttrs: ITabsProps['dataAttrs'] = {
    root: {
        'data-test': 'test',
    },
    slider: {
        'data-test': 'test',
    },
    panel: {
        'data-test': 'test',
    },
    prev: {
        'data-test': 'test',
    },
    next: {
        'data-test': 'test',
    },
};

const cn = cnCreate('.mfui-tabs');
describe('<Tabs />', () => {
    afterAll(() => jest.clearAllMocks());

    it('should render with default props', () => {
        const wrapper = shallow(
            <Tabs>
                <Tab>1</Tab>
                <Tab>2</Tab>
            </Tabs>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with props', () => {
        const wrapper = shallow(
            <Tabs
                className="className"
                classes={{
                    root: 'rootClass',
                    innerIndents: 'innerIndentsClass',
                    tab: 'tabClass',
                    activeTab: 'activeTabClass',
                }}
                dataAttrs={dataAttrs}
                size={TabSize.LARGE}
                autoWidth
                hAlign={TabHAlign.CENTER}
                tabColorTheme={TabColorTheme.GREEN}
                sticky
                defaultIndex={1}
                renderOnlyCurrentPanel
                outerObserveContainer={document.createElement('DIV') as HTMLDivElement}
            >
                <Tab
                    title="title 1"
                    icon={<Balance />}
                    href="www.test.com"
                    dataAttrs={{ root: { 'date-test': 'test' } }}
                >
                    1
                </Tab>
                <Tab title="title 2" renderTabWrapper={renderTabWrapper}>
                    2
                </Tab>
            </Tabs>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should render without panels', () => {
        const wrapper = shallow(
            <Tabs>
                <Tab title="title 1" icon={<Balance />} href="www.test.com" />
                <Tab title="title 2" renderTabWrapper={renderTabWrapper} />
            </Tabs>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should call onTabClick', () => {
        const mockHandleTabClick = jest.fn();
        const wrapper = shallow(
            <Tabs onTabClick={mockHandleTabClick}>
                <Tab>1</Tab>
                <Tab>2</Tab>
            </Tabs>,
        );

        wrapper.find(cn('tab-inner')).last().simulate('click');

        expect(mockHandleTabClick).toBeCalledWith(1);
    });
});
