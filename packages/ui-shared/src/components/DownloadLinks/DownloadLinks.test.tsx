import * as React from 'react';
import { shallow } from 'enzyme';
import DownloadLinks from './DownloadLinks';
import DownloadLink, { IDownloadLink } from './DownloadLink';

const props: IDownloadLink = {
    href: 'href',
    text: 'text',
    extension: 'PDF',
    fileSize: '500 MB',
};

describe('DownloadLinks', () => {
    it('render component', () => {
        const wrapper = shallow(<DownloadLinks><DownloadLink {...props} /></DownloadLinks>);
        expect(wrapper).toMatchSnapshot();
    });

    it('render component with another grid config', () => {
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
});
