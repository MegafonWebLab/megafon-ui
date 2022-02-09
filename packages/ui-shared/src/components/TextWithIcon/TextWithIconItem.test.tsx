import * as React from 'react';
import Star from '@megafon/ui-icons/basic-16-promo_16.svg';
import { shallow, mount } from 'enzyme';
import TextWithIconItem from './TextWithIconItem';

describe('<TextWithIconItem />', () => {
    it('should render', () => {
        const wrapper = shallow(
            <TextWithIconItem text="First item" icon={<Star style={{ fill: '#00B956' }} />} className="test-class" />,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('should return reference to root element', () => {
        const ref: React.RefObject<HTMLDivElement> = React.createRef();
        mount(<TextWithIconItem text="First item" icon={<Star style={{ fill: '#00B956' }} />} rootRef={ref} />);

        expect(ref.current).not.toBeNull();
    });
});
