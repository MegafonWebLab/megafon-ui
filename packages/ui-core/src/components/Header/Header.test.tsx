import * as React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('<Header />', () => {
    it('it renders with default h1 tag', () => {
        const wrapper = shallow(<Header />);
        expect(wrapper.type()).toEqual('h1');
    });

    ['h1', 'h2', 'h3', 'h5'].forEach(tag => {
        it(`it renders only with ${tag}`, () => {
            type AsValuesType = Header['props']['as'];
            const wrapper = shallow(<Header as={tag as AsValuesType} />);
            expect(wrapper.type()).toEqual(tag);
        });
    });

    it('it renders with white color class', () => {
        const wrapper = shallow(<Header color="white" />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders without class margin', () => {
        const wrapper = shallow(<Header margin={false} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders with addition', () => {
        const wrapper = shallow(<Header addition={<div />} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders with children', () => {
        const wrapper = shallow(<Header><section /></Header>);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders with text align center', () => {
        const wrapper = shallow(<Header hAlign="center" />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders with className', () => {
        const wrapper = shallow(<Header className="class" />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders with classNames array', () => {
        const wrapper = shallow(<Header className={['class1', 'class2']} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders with data attributes', () => {
        const wrapper = shallow(<Header dataAttrs={{ 'data-test': 'test', 'incorrect-attr': 'test' }} />);
        expect(wrapper).toMatchSnapshot();
    });
});
