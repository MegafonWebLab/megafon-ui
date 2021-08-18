import * as React from 'react';
import { mount, shallow } from 'enzyme';
import Card, { ObjectFit, Target } from './Card';
import WiFi from '@megafon/ui-icons/dist/basic-32-wi-fi_32.svg';
import img from './img.png';

const title = 'Смартфоны Huawei с дополнительной скидкой до 3000 ₽ и подарок — до 1000 ₽ на связь';
const text = 'Сдайте старое оборудование в трейд‑ин и получите дополнительную скидку до 3000 ₽ на смартфоны Huawei и до 1000 ₽ на связь в подарок.';
const button = {
    title: 'Подробнее',
    href: '#',
    target: Target.BLANK,
};

const fakeLink = {
    title: 'Подключить',
};

const link = {
    ...fakeLink,
    href: '#',
    target: Target.SELF,
};

const svg = <WiFi style={{ display: 'block', fill: '#00B956' }} />;

const classes = { root: 'rootClass', button: 'buttonClass', link: 'linkClass', inner: 'innerClass'};

describe('Card', () => {
    it('render component with required props', () => {
        const wrapper = shallow(
            <Card title={title} />
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('render component with optional props', () => {
        const wrapper = shallow(
            <Card
                title={title}
                text={text}
                imageSrc={img}
                button={button}
                link={link}
                classes={classes}
                className="className"
                dataAttrs={{ 'data-test': 'value' }}
                isCenteredText
            />
        );
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
        const wrapper = shallow(
            <Card
                title={title}
                text={text}
                svgSrc={svg}
                link={fakeLink}
                href={'card-href'}
                target={Target.BLANK}
            />
        );
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

    it('should return reference to root element', () => {
        const ref: React.RefObject<HTMLDivElement> = React.createRef();

        mount(<Card title={title} text={text} isFullHeight rootRef={ref} />);

        expect(ref.current).not.toBeNull();
    });

    it('render with attribute "download" for <Button> and <Textlink>', () => {
        const downloadLink = {...link, download: true};
        const downloadButton = {...button, download: true};

        const wrapper = shallow(<Card title={title} text={text} link={downloadLink} button={downloadButton}/>);
        expect(wrapper).toMatchSnapshot();
    });
});
