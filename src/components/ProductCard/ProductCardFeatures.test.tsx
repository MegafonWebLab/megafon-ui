import * as React from 'react';
import { shallow } from 'enzyme';
import ProductCardFeatures from './ProductCardFeatures';

const props = {
    showcaseParams: [{
        title: 'Безлимитный интернет',
        value: 'на мессенджеры',
        children: [{
            title: 'Безлимитный интернет',
            caption: 'на видео, соц-сети и мессенджеры',
            value: 'test',
        }],
    },
    {
        children: [{
            title: 'Youtube, Rutube, Vimeo',
        }],
    },
    {
        children: [{
            title: 'WhatsApp, Viber, Facebook Messanger, Snapchat, eMotion',
        }],
    },
    {
        children: [{
            title: 'Вконтакте, Одноклассники, Facebook, Instagram, Twitter',
        }],
    }],
};

describe('<ProductCardFeatures />', () => {
    it('it renders ProductCardFeatures', () => {
        const wrapper = shallow(<ProductCardFeatures {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});
