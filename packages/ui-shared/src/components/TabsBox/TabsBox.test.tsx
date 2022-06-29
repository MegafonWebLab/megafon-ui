import * as React from 'react';
import Balance from '@megafon/ui-icons/basic-24-balance_24.svg';
import { mount, shallow } from 'enzyme';
import TabBox from './TabBox';
import TabsBox from './TabsBox';

const renderTabWrapper = (tab: React.ReactNode) => <div className="tab-wrapper">{tab}</div>;

describe('<TabsBox />', () => {
    it('should render with props', () => {
        const wrapper = shallow(
            <TabsBox
                classes={{
                    root: 'className',
                    innerIndents: 'innerIndentsClass',
                }}
                size="large"
                hAlign="center"
                autoWidth
                tabColorTheme="green"
                sticky
                currentIndex={1}
                defaultIndex={1}
            >
                <TabBox title="title 1" icon={<Balance />} href="www.test.com">
                    1
                </TabBox>
                <TabBox title="title 2" renderTabWrapper={renderTabWrapper}>
                    2
                </TabBox>
            </TabsBox>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should return reference to root element', () => {
        const ref = React.createRef<HTMLDivElement>();
        const mockObserveFn = () => ({
            observe: jest.fn(),
            unobserve: jest.fn(),
        });

        window.IntersectionObserver = jest.fn().mockImplementationOnce(mockObserveFn);

        mount(
            <TabsBox rootRef={ref}>
                <TabBox title="title 1" icon={<Balance />} href="www.test.com">
                    1
                </TabBox>
                <TabBox title="title 2" renderTabWrapper={renderTabWrapper}>
                    2
                </TabBox>
            </TabsBox>,
        );

        expect(ref.current).not.toBeNull();
    });
});
