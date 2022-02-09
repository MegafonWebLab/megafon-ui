import * as React from 'react';
import { shallow, mount } from 'enzyme';
import RadioButton, { IRadioButtonProps } from './RadioButton';

const props: IRadioButtonProps = {
    className: 'test-class',
    classes: {
        root: 'root-class',
        label: 'label-class',
        customInput: 'custom-input-class',
        labelText: 'label-text-class',
    },
    name: 'test-input-name',
    value: 'test-input-value',
    disabled: true,
    isChecked: true,
    textSize: 'small',
    dataAttrs: {
        root: {
            'data-root': 'test',
        },
        input: {
            'data-input': 'test',
        },
        text: {
            'data-text': 'test',
        },
    },
    onChange: jest.fn(),
};

describe('<RadioButton />', () => {
    describe('snapshots', () => {
        it('renders RadioButton', () => {
            const wrapper = shallow(<RadioButton value="value-text">Тестовая строка</RadioButton>);
            expect(wrapper).toMatchSnapshot();
        });

        it('renders RadioButton with props', () => {
            const wrapper = shallow(<RadioButton {...props}>Тестовая строка</RadioButton>);
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('handlers', () => {
        it('calls onChange', () => {
            const handleChange = jest.fn(buttonValue => buttonValue);

            const value = 'value-text';

            const wrapper = shallow(
                <RadioButton name="group" value={value} onChange={handleChange}>
                    Тестовая строка
                </RadioButton>,
            );

            wrapper.find('.mfui-radio-button__input').simulate('change');
            expect(handleChange).toHaveBeenCalledWith(value);
        });
    });

    it('should return a reference to the element', () => {
        const ref: React.Ref<HTMLInputElement> = React.createRef();

        mount(<RadioButton inputRef={ref} value="" />);

        if (ref.current === null) {
            throw new Error('No ref');
        }

        expect(ref.current.type).toBe('radio');
    });
});
