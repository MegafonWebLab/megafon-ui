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
            const changeEvent = {
                target: { value: 'a1b2c3d4' },
                type: 'change',
                nativeEvent: {
                    type: 'click',
                },
            } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

            const wrapper = shallow(<Checkbox onChange={handleChange}>Тестовая строка</Checkbox>);

            wrapper.find('input').simulate('change', changeEvent);
            expect(handleChange).toBeCalledWith(changeEvent);
        });
    });
});
