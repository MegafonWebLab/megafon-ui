import * as React from 'react';
import { shallow } from 'enzyme';
import Card, { ObjectFit } from './Card';
import WiFi from 'icons/Basic/32/Wi-fi_32.svg';
import img from './img.png';

const title = 'Cмартфоны Huawei с дополнительной скидкой до 3000 ₽ и подарок — до 1000 ₽ на связь';
const text = 'Сдайте старое оборудование в трейд‑ин и получите дополнительную скидку до 3000 ₽ на смартфоны Huawei и до 1000 ₽ на связь в подарок.';
const button = {
    title: 'Подробнее',
    href: '#',
};

const fakeLink = {
    title: 'Подключить',
};

const link = {
    ...fakeLink,
    href: '#',
};

const svg = <WiFi style={{ display: 'block', fill: '#00B956' }} />;

describe('Card', () => {
    it('render component', () => {
        const wrapper = shallow(<Card title={title} text={text} imageSrc={img} button={button} link={link} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('render component with icon', () => {
        const wrapper = shallow(<Card title={title} text={text} svgSrc={svg} button={button} link={link} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('render component with img, if image source and svg source are specified', () => {
        const wrapper = shallow(
            <Card title={title} text={text} svgSrc={svg} button={button} link={link} imageSrc={img} />
            );
        expect(wrapper).toMatchSnapshot();
    });

    it('render without img and svg', () => {
        const wrapper = shallow(<Card title={title} text={text} button={button} link={link} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('render with a single interactive button element', () => {
        const wrapper = shallow(<Card title={title} text={text} svgSrc={svg} button={button} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('render with a single interactive link element', () => {
        const wrapper = shallow(<Card title={title} text={text} svgSrc={svg} link={link} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('left align of the interactive element', () => {
        const wrapper = shallow(<Card title={title} text={text} imageSrc={img} link={link} isLeftHAlign />);
        expect(wrapper).toMatchSnapshot();
    });

    it('disable left align if there is a button and link', () => {
        const wrapper = shallow(
            <Card title={title} text={text} imageSrc={img} button={button} link={link} isLeftHAlign />
            );
        expect(wrapper).toMatchSnapshot();
    });

    it('render with link on the card', () => {
        const wrapper = shallow(<Card title={title} text={text} svgSrc={svg} link={fakeLink} href={'card-href'} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('button is not rendered if a card has the href property set', () => {
        const wrapper = shallow(
            <Card title={title} text={text} svgSrc={svg} link={fakeLink} href={'card-href'} button={button} />
            );
        expect(wrapper).toMatchSnapshot();
    });

    it('render with contain object fit', () => {
        const wrapper = shallow(
            <Card title={title} text={text} imageSrc={img} button={button} objectFit={ObjectFit.CONTAIN} />
            );
        expect(wrapper).toMatchSnapshot();
    });

    it('render with fullHeight', () => {
        const wrapper = shallow(
            <Card title={title} text={text} isFullHeight />
            );
        expect(wrapper).toMatchSnapshot();
    });
});
