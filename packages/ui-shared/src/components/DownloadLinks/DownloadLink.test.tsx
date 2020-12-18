import * as React from 'react';
import { shallow } from 'enzyme';
import { cnCreate } from '@megafon/ui-core';
import DownloadLink, { IDownloadLink } from './DownloadLink';

const props: IDownloadLink = {
    href: 'href',
    text: 'text',
    extension: 'PDF',
    fileSize: '500 MB',
};

const cn = cnCreate('mfui-beta-download-link');

describe('DownloadLink', () => {
    it('render component', () => {
        const wrapper = shallow(<DownloadLink {...props} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('render with custom classname', () => {
        const wrapper = shallow(<DownloadLink {...props} className="custom-classname" />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should call onClick props', () => {
        const onClick = jest.fn();
        const wrapper = shallow(<DownloadLink {...props} onClick={onClick} />);
        const link = wrapper.find(`.${cn('link')}`);

        link.simulate('click');
        expect(onClick).toBeCalled();
    });
});
