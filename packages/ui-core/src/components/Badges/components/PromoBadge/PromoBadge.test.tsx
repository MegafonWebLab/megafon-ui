import * as React from 'react';
import { shallow } from 'enzyme';
import PromoBadge from './PromoBadge';

const defaultChildren = 'badge text';

describe('<PromoBadge />', () => {
    describe('snapshots', () => {
        it('renders with default props', () => {
            const wrapper = shallow(<PromoBadge>{defaultChildren}</PromoBadge>);

            expect(wrapper).toMatchSnapshot();
        });

        it('renders with type prop', () => {
            const wrapper = shallow(<PromoBadge type="popular">{defaultChildren}</PromoBadge>);

            expect(wrapper).toMatchSnapshot();
        });
    });
});
