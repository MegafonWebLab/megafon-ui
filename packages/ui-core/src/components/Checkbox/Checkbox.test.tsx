import * as React from 'react';
import { shallow } from 'enzyme';
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

describe('<Checkbox />', () => {
    describe('layout', () => {
        it('renders Checkbox', () => {
            const wrapper = shallow(<Checkbox>Тестовая строка</Checkbox>);
            expect(wrapper).toMatchSnapshot();
        });

        it('renders Checkbox with props', () => {
            const wrapper = shallow(
                <Checkbox
                    {...props}
                    size="small"
                    color="light"
                    onChange={jest.fn()}
                >
                    Тестовая строка
                </Checkbox>
            );
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
