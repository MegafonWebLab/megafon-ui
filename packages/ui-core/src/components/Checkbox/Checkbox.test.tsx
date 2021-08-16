/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { shallow } from 'enzyme';
import * as React from 'react';
import Checkbox from './Checkbox';

const props = {
    className: 'testClassName',
    name: 'testInputName',
    value: 'testInputValue',
    checked: true,
    disabled: true,
    error: true,
    extraContent: 'text',
};

const dataAttrs = {
    'data-test': 'test',
    'incorrect-attr': 'test',
};

describe('<Checkbox />', () => {
    describe('layout', () => {
        it('renders Checkbox', () => {
            const wrapper = shallow(<Checkbox>Тестовая строка</Checkbox>);
            expect(wrapper).toMatchSnapshot();
        });

        it('renders Checkbox with props', () => {
            const wrapper = shallow(
                // eslint-disable-next-line react/jsx-props-no-spreading
                <Checkbox {...props} fontSize="small" color="light" onChange={jest.fn()}>
                    Тестовая строка
                </Checkbox>,
            );
            expect(wrapper).toMatchSnapshot();
        });

        it('renders Checkbox on mobile resolution', () => {
            const onTouchStart = window.ontouchstart;
            window.ontouchstart = jest.fn();

            const wrapper = shallow(<Checkbox>Тестовая строка на мобильном разрешении</Checkbox>);
            expect(wrapper).toMatchSnapshot();

            window.ontouchstart = onTouchStart;
        });

        it('renders with data attrs', () => {
            const wrapper = shallow(<Checkbox dataAttrs={dataAttrs} />);
            expect(wrapper).toMatchSnapshot();
        });

        it('renders with classes', () => {
            const wrapper = shallow(<Checkbox classes={{ icon: 'custom-icon', inner: 'custom-inner' }} />);
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('handleChange', () => {
        it('calls onChange', () => {
            const handleChange = jest.fn();
            const event = {
                target: { value: 'test value' },
            };

            const wrapper = shallow(<Checkbox onChange={handleChange}>Тестовая строка</Checkbox>);

            wrapper.find('input').simulate('change', event);
            expect(handleChange).toBeCalledWith(event);
        });
    });
});
