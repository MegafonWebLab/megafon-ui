import * as React from 'react';
import { mount, shallow } from 'enzyme';
import DownloadLink, { IDownloadLink } from './DownloadLink';

const props: IDownloadLink = {
    href: 'href',
    text: 'text',
    extension: 'PDF',
    fileSize: '500 MB',
};

describe('DownloadLink', () => {
    it('render component', () => {
        const wrapper = shallow(<DownloadLink {...props} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('render with custom classes and data-attributes', () => {
        const wrapper = shallow(
            <DownloadLink
                {...props}
                className="custom-classname"
                classes={{
                    root: 'root-class',
                    link: 'link-class',
                }}
                dataAttrs={{ root: { 'data-testid': 'root-test' }, link: { 'data-testid': 'link-test' } }}
            />,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('should call onClick props', () => {
        const onClick = jest.fn();
        const wrapper = shallow(<DownloadLink {...props} onClick={onClick} />);
        const link = wrapper.find('TextLink');

        link.simulate('click');
        expect(onClick).toBeCalled();
    });

    it('should return reference to root element', () => {
        const ref: React.RefObject<HTMLDivElement> = React.createRef();
        mount(<DownloadLink {...props} rootRef={ref} />);

        expect(ref.current).not.toBeNull();
    });
});
