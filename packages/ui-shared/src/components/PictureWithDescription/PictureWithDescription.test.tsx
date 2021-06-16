import * as React from 'react';
import { mount, shallow } from 'enzyme';
import PictureWithDescription, {
    pictureAlignTypes,
    IPictureWithDescriptionProps,
} from './PictureWithDescription';

const props: IPictureWithDescriptionProps = {
    pictureUrl: '/testUrl',
};

describe('<PictureWithDescription />', () => {
    it('should render with default props', () => {
        const wrapper = shallow(
            <PictureWithDescription {...props}><div /></PictureWithDescription>
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with right side picture', () => {
        const newProps = {
            ...props,
            pictureAlign: pictureAlignTypes.RIGHT,
        };

        const wrapper = shallow(
            <PictureWithDescription {...newProps}><div /></PictureWithDescription>
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should render with top align text', () => {
        const newProps = {
            ...props,
            isTextTopAlign: true,
        };

        const wrapper = shallow(
            <PictureWithDescription {...newProps}><div /></PictureWithDescription>
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should return reference to root element', () => {
        const ref: React.RefObject<HTMLDivElement> = React.createRef();

        mount(<PictureWithDescription {...props} rootRef={ref}><div /></PictureWithDescription>);

        expect(ref.current).not.toBeNull();
    });
});
