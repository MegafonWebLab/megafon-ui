import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { items } from './doc/TextWithIcon.docz';
import TextWithIcon, { ITextWithIconProps } from './TextWithIcon';

const requiredProps: ITextWithIconProps = {
    items,
};

const allProps: ITextWithIconProps = {
    ...requiredProps,
    title: 'Test title',
    className: 'test-class',
};

describe('<TextWithIcon />', () => {
    it('should render with required props', () => {
        const wrapper = shallow(<TextWithIcon {...requiredProps} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render with all props', () => {
        const wrapper = shallow(<TextWithIcon {...allProps} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should return reference to root element', () => {
        const ref: React.RefObject<HTMLDivElement> = React.createRef();
        mount(
            <TextWithIcon {...allProps} rootRef={ref}>
                <div />
            </TextWithIcon>,
        );

        expect(ref.current).not.toBeNull();
    });
});
