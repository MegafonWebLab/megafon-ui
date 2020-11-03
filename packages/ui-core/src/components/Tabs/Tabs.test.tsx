import * as React from 'react';
import { shallow } from 'enzyme';
import cnCreate from 'utils/cnCreate';
import Tabs, { TabSize, TabHAlign, TabColorTheme } from './Tabs';
import Tab from './Tab';
import Balance from 'icons/Basic/24/Balance_24.svg';

const renderTabWrapper = (tab: React.ReactNode) => {
    return <div className="tab-wrapper">{tab}</div>;
};

const cn = cnCreate('.mfui-beta-tabs');
describe('<Tabs />', () => {
    afterAll(() => jest.clearAllMocks());

    it('should render with default props', () => {
        const wrapper = shallow(
            <Tabs>
                <Tab>1</Tab>
                <Tab>2</Tab>
            </Tabs>
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with props', () => {
        const wrapper = shallow(
            <Tabs
                className="className"
                innerIndentsClass="innerIndentsClass"
                size={TabSize.SMALL}
                hAlign={TabHAlign.CENTER}
                tabColorTheme={TabColorTheme.GREEN}
                sticky
                defaultIndex={1}
            >
                <Tab title="title 1" icon={<Balance />} href="www.test.com">
                    1
                </Tab>
                <Tab
                    title="title 2"
                    renderTabWrapper={renderTabWrapper}
                >
                    2
                </Tab>
            </Tabs>
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('chould call onTabClick', () => {
        const mockHandleTabClick = jest.fn();
        const wrapper = shallow(
            <Tabs onTabClick={mockHandleTabClick}>
                <Tab>1</Tab>
                <Tab>2</Tab>
            </Tabs>
        );

        wrapper.find(cn('tab-inner')).last().simulate('click');

        expect(mockHandleTabClick).toBeCalledWith(1);
    });
});
