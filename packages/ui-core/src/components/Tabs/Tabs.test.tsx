import { cnCreate } from '@megafon/ui-helpers';
import { shallow } from 'enzyme';
import * as React from 'react';
import Balance from 'icons/Basic/24/Balance_24.svg';
import Tab from './Tab';
import Tabs, { TabSize, TabHAlign, TabColorTheme } from './Tabs';

const renderTabWrapper = (tab: React.ReactNode) => <div className="tab-wrapper">{tab}</div>;

const cn = cnCreate('.mfui-beta-tabs');
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
                size={TabSize.SMALL}
                hAlign={TabHAlign.CENTER}
                tabColorTheme={TabColorTheme.GREEN}
                sticky
                defaultIndex={1}
            >
                <Tab title="title 1" icon={<Balance />} href="www.test.com">
                    1
                </Tab>
                <Tab title="title 2" renderTabWrapper={renderTabWrapper}>
                    2
                </Tab>
            </Tabs>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('chould call onTabClick', () => {
        const mockHandleTabClick = jest.fn();
        const wrapper = shallow(
            <Tabs onTabClick={mockHandleTabClick}>
                <Tab>1</Tab>
                <Tab>2</Tab>
            </Tabs>,
        );

        wrapper.find(cn('tab-inner')).last().simulate('click');

        // eslint-disable-next-line no-magic-numbers
        expect(mockHandleTabClick).toBeCalledWith(1);
    });
});
