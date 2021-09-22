import * as React from 'react';
import { shallow } from 'enzyme';
import TextBoxPicture, { ITextBoxPictureProps, pictureMarginTypes } from './TextBoxPicture';

const props: ITextBoxPictureProps = {
    url: '#',
};

describe('TextBoxPicture', () => {
    it('render with default props', () => {
        const wrapper = shallow(
            <TextBoxPicture {...props} />
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('render with big vertical margins', () => {
        const wrapper = shallow(
            <TextBoxPicture {...props} margin={pictureMarginTypes.BIG_VERTICAL_MARGIN} />
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('render with big bottom margin', () => {
        const wrapper = shallow(
            <TextBoxPicture {...props} margin={pictureMarginTypes.BIG_BOTTOM_MARGIN} />
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('render with big top margin', () => {
        const wrapper = shallow(
            <TextBoxPicture {...props} margin={pictureMarginTypes.BIG_TOP_MARGIN} />
        );
        expect(wrapper).toMatchSnapshot();
    });
});
