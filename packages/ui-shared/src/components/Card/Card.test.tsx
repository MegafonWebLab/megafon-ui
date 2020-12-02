import * as React from 'react';
import { shallow } from 'enzyme';
import Card, { ObjectFit } from './Card';
import { title, text, img, svg, button, link, fakeLink } from './doc/Card.docz';

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

    it('render with one interactive element', () => {
        const wrapper = shallow(<Card title={title} text={text} svgSrc={svg} button={button} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('left align of the interactive element', () => {
        const wrapper = shallow(<Card title={title} text={text} imageSrc={img} link={link} isLeftHAlign />);
        expect(wrapper).toMatchSnapshot();
    });

    it('disable left align if there is a button and link', () => {
        const wrapper = shallow(
            <Card title={title} text={text} imageSrc={img} button={button} link={link} isLeftHAlign/>
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
});
