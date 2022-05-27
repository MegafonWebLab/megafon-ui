import * as React from 'react';
import { shallow } from 'enzyme';
import Switcher from './Switcher';

describe('<Switcher />', () => {
    describe('layout', () => {
        it('should render switcher with default props', () => {
            const wrapper = shallow(<Switcher />);
            expect(wrapper).toMatchSnapshot();
        });

        it('should render switcher with external className and data-attributes', () => {
            const wrapper = shallow(
                <Switcher
                    className="external-class-name"
                    dataAttrs={{ root: { 'data-testid': 'root-test' }, input: { 'data-testid': 'input-test' } }}
                />,
            );
            expect(wrapper).toMatchSnapshot();
        });

        it('should render checked switcher', () => {
            const wrapper = shallow(<Switcher checked />);
            expect(wrapper).toMatchSnapshot();
        });

        it('should render disabled switcher', () => {
            const wrapper = shallow(<Switcher disabled />);
            expect(wrapper).toMatchSnapshot();
        });

        it('should render showLoader switcher with children', () => {
            const wrapper = shallow(<Switcher showLoader>children</Switcher>);
            expect(wrapper).toMatchSnapshot();
        });

        it('should render switcher with children with small size by left', () => {
            const wrapper = shallow(
                <Switcher showLoader textPosition="left" textSize="small">
                    children
                </Switcher>,
            );
            expect(wrapper).toMatchSnapshot();
        });

        it('should render switcher for mobile devices', () => {
            const onTouchStart = window.ontouchstart;
            window.ontouchstart = jest.fn();

            const wrapper = shallow(<Switcher />);
            expect(wrapper).toMatchSnapshot();

            window.ontouchstart = onTouchStart;
        });
    });

    describe('handleChange', () => {
        it('should call onChange id switcher is enabled', () => {
            const handleChange = jest.fn();
            const wrapper = shallow(<Switcher onChange={handleChange} />);

            const event = { target: {}, nativeEvent: {}, type: 'click' };
            wrapper.find('.mfui-switcher__input').simulate('click', event);
            expect(handleChange).toHaveBeenCalledWith(event);
        });

        it('shouldn`t call onChange id switcher is disabled', () => {
            const handleChange = jest.fn();
            const wrapper = shallow(<Switcher disabled onChange={handleChange} />);

            const event = { target: {}, nativeEvent: {}, type: 'click' };
            wrapper.find('.mfui-switcher__input').simulate('click', event);
            expect(handleChange).not.toHaveBeenCalled();
        });
    });
});
