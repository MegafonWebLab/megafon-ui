import * as React from 'react';
import { shallow } from 'enzyme';
import DownloadLink, { IDownloadLink } from './DownloadLink';
import DownloadLinks from './DownloadLinks';

const props: IDownloadLink = {
    href: 'href',
    text: 'text',
    extension: 'PDF',
    fileSize: '500 MB',
};

describe('DownloadLinks', () => {
    it('render component with one column', () => {
        const wrapper = shallow(
            <DownloadLinks>
                <DownloadLink {...props} />
            </DownloadLinks>,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('render component with two columns', () => {
        const wrapper = shallow(
            <DownloadLinks>
                <DownloadLink {...props} />
                <DownloadLink {...props} />
                <DownloadLink {...props} />
            </DownloadLinks>,
        );
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
            </DownloadLinks>,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('render component with one column regardless of the quantity', () => {
        const wrapper = shallow(
            <DownloadLinks inOneColumn>
                <DownloadLink {...props} />
                <DownloadLink {...props} />
                <DownloadLink {...props} />
                <DownloadLink {...props} />
                <DownloadLink {...props} />
                <DownloadLink {...props} />
                <DownloadLink {...props} />
            </DownloadLinks>,
        );
        expect(wrapper).toMatchSnapshot();
    });
});
