import * as React from 'react';
import {mount, shallow} from 'enzyme';
import DownloadLinks from './DownloadLinks';
import DownloadLink, { IDownloadLink } from './DownloadLink';

const props: IDownloadLink = {
    href: 'href',
    text: 'text',
    extension: 'PDF',
    fileSize: '500 MB',
};

describe('DownloadLinks', () => {
    it('render component with one column', () => {
        const wrapper = shallow(<DownloadLinks><DownloadLink {...props} /></DownloadLinks>);
        expect(wrapper).toMatchSnapshot();
    });

    it('render component with two columns', () => {
        const wrapper = shallow(
            <DownloadLinks>
                <DownloadLink {...props} />
                <DownloadLink {...props} />
                <DownloadLink {...props} />
            </DownloadLinks>);
        expect(wrapper).toMatchSnapshot();
    });

    it('render component with three columns', () => {
        const wrapper = shallow(
            <DownloadLinks>
                <DownloadLink {...props} />
                <DownloadLink {...props} />
                <DownloadLink {...props} />
                <DownloadLink {...props} />
                <DownloadLink {...props} />
            </DownloadLinks>);
        expect(wrapper).toMatchSnapshot();
    });

    it('should return reference to root element', () => {
        const ref: React.RefObject<HTMLDivElement> = React.createRef();
        mount(<DownloadLinks rootRef={ref}><DownloadLink {...props} /></DownloadLinks>);

        expect(ref.current).not.toBeNull();
    });
});
