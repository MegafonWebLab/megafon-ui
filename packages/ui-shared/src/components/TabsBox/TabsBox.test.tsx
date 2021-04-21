import * as React from 'react';
import { shallow } from 'enzyme';
import TabsBox from './TabsBox';
import TabBox from './TabBox';
import Balance from 'icons/Basic/24/Balance_24.svg';

const renderTabWrapper = (tab: React.ReactNode) => {
    return <div className="tab-wrapper">{tab}</div>;
};

describe('<TabsBox />', () => {
    it('should render with props', () => {
        const ref = React.createRef<HTMLDivElement>();
        const wrapper = shallow(
            <TabsBox
                classes={{
                    root: 'className',
                    innerIndents: 'innerIndentsClass',
                }}
                size="small"
                hAlign="center"
                tabColorTheme="green"
                sticky
                currentIndex={1}
                defaultIndex={1}
                rootRef={ref}
            >
                <TabBox title="title 1" icon={<Balance />} href="www.test.com">
                    1
                </TabBox>
                <TabBox
                    title="title 2"
                    renderTabWrapper={renderTabWrapper}
                >
                    2
                </TabBox>
            </TabsBox>
        );
        expect(wrapper).toMatchSnapshot();
    });
});
