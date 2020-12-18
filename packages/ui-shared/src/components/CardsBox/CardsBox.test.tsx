import * as React from 'react';
import { shallow } from 'enzyme';
import CardsBox from './CardsBox';
import Card, { ICard } from '../Card/Card';

const cardProps: ICard = {
    title: 'title',
    text: 'text',
    button: {
        title: 'button-title',
        href: 'button-href',
    },
    link: {
        title: 'href-title',
        href: 'href',
    },
};

describe('CardsBox', () => {
    it('render component', () => {
        const wrapper = shallow(<CardsBox><Card {...cardProps} /></CardsBox>);
        expect(wrapper).toMatchSnapshot();
    });
});
