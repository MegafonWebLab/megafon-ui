import * as React from 'react';
import { shallow } from 'enzyme';
import PriceBadge from './PriceBadge';

const defaultChildren = 'badge text';

describe('<PriceBadge />', () => {
    describe('snapshots', () => {
        it('renders with default props', () => {
            const wrapper = shallow(<PriceBadge>{defaultChildren}</PriceBadge>);

            expect(wrapper).toMatchSnapshot();
        });

        it('renders with all props', () => {
            const wrapper = shallow(
                <PriceBadge iconType="price" theme="green" isAdaptive>
                    {defaultChildren}
                </PriceBadge>,
            );

            expect(wrapper).toMatchSnapshot();
        });

        it('renders with check icon', () => {
            const wrapper = shallow(<PriceBadge iconType="check">{defaultChildren}</PriceBadge>);

            expect(wrapper).toMatchSnapshot();
        });

        it('renders with attention icon', () => {
            const wrapper = shallow(<PriceBadge iconType="attention">{defaultChildren}</PriceBadge>);

            expect(wrapper).toMatchSnapshot();
        });
    });
});
