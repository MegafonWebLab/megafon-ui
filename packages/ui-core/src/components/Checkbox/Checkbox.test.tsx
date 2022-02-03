import * as React from 'react';
import { shallow } from 'enzyme';
import Checkbox, { ICheckboxProps } from './Checkbox';

const props = {
    className: 'testClassName',
    name: 'testInputName',
    value: 'testInputValue',
    checked: true,
    disabled: true,
    error: true,
    extraContent: 'text',
};

const dataAttrs: ICheckboxProps['dataAttrs'] = {
    root: {
        'data-test': 'test',
        'incorrect-attr': 'test',
    },
    input: {
        'data-test': 'test',
        'incorrect-attr': 'test',
    },
    customInput: {
        'data-test': 'test',
        'incorrect-attr': 'test',
    },
    extraContent: {
        'data-test': 'test',
        'incorrect-attr': 'test',
    },
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
            const wrapper = shallow(<Checkbox dataAttrs={dataAttrs}>Тестовая строка</Checkbox>);
            expect(wrapper).toMatchSnapshot();
        });

        it('renders with classes', () => {
            const wrapper = shallow(
                <Checkbox classes={{ icon: 'custom-icon', inner: 'custom-inner' }}>Тестовая строка</Checkbox>,
            );
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('handleChange', () => {
        it('calls onChange on change input', () => {
            const event = {
                type: 'change',
                nativeEvent: {},
            } as React.ChangeEvent;
            const checked = false;
            const handleChange = jest.fn();

            const wrapper = shallow(
                <Checkbox onChange={handleChange} checked={checked}>
                    Тестовая строка
                </Checkbox>,
            );

            wrapper.find('input').simulate('change', event);
            expect(handleChange).toBeCalledWith(!checked);
        });

        it('calls onChange on Enter click', () => {
            const event = {
                type: 'keydown',
                nativeEvent: {
                    code: 'Enter',
                },
            } as React.KeyboardEvent;
            const checked = false;
            const handleChange = jest.fn();

            const wrapper = shallow(
                <Checkbox onChange={handleChange} checked={checked}>
                    Тестовая строка
                </Checkbox>,
            );

            wrapper.find('div[role="checkbox"]').simulate('keydown', event);
            expect(handleChange).toBeCalledWith(!checked);
        });

        it('not calls onChange on keydown, if keyboard code is not Enter', () => {
            const event = {
                type: 'keydown',
                nativeEvent: {
                    code: 'Tab',
                },
            } as React.KeyboardEvent;
            const checked = false;
            const handleChange = jest.fn();

            const wrapper = shallow(
                <Checkbox onChange={handleChange} checked={checked}>
                    Тестовая строка
                </Checkbox>,
            );

            wrapper.find('div[role="checkbox"]').simulate('keydown', event);
            expect(handleChange).not.toBeCalled();
        });
    });
});
