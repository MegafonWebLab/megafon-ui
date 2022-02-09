import * as React from 'react';
import Heart from '@megafon/ui-icons/basic-16-heart_16.svg';
import Star from '@megafon/ui-icons/basic-16-promo_16.svg';
import { shallow, mount } from 'enzyme';
import TextWithIcon from './TextWithIcon';
import TextWithIconItem from './TextWithIconItem';

const children = [
    <TextWithIconItem text="First item" icon={<Star style={{ fill: '#00B956' }} />} key={1} />,
    <TextWithIconItem text="Second item" icon={<Heart style={{ fill: '#00B956' }} />} key={2} />,
];

describe('<TextWithIcon />', () => {
    it('should render', () => {
        const wrapper = shallow(<TextWithIcon>{children}</TextWithIcon>);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render with props', () => {
        const wrapper = shallow(
            <TextWithIcon title="Test title" className="test-class">
                {children}
            </TextWithIcon>,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('should return reference to root element', () => {
        const ref: React.RefObject<HTMLDivElement> = React.createRef();
        mount(<TextWithIcon rootRef={ref}>{children}</TextWithIcon>);

        expect(ref.current).not.toBeNull();
    });
});
