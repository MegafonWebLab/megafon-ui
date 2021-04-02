import * as React from 'react';
import { shallow, mount } from 'enzyme';
import RadioButton, { IRadioButtonProps } from './RadioButton';

const props: IRadioButtonProps = {
    className: 'test-class',
    name: 'test-input-name',
    value: 'test-input-value',
    isDisabled: true,
    isChecked: true,
    textSize: 'small',
    onChange: jest.fn(),
};

describe('<RadioButton />', () => {
    describe('snapshots', () => {
        it('renders RadioButton', () => {
            const wrapper = shallow(<RadioButton value="value-text">Тестовая строка</RadioButton>);
            expect(wrapper).toMatchSnapshot();
        });

        it('renders RadioButton with props', () => {
            const wrapper = shallow(
                <RadioButton
                    {...props}
                >
                    Тестовая строка
                </RadioButton>
            );
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('handlers', () => {
        it('calls onChange', () => {
            const handleChange = jest.fn(buttonValue => buttonValue);

            const value = 'value-text';

            const wrapper = shallow(
                <RadioButton name="group" value={value} onChange={handleChange}>Тестовая строка</RadioButton>
            );

            wrapper.find('.mfui-beta-radio-button__input').simulate('change');
            expect(handleChange).toHaveBeenCalledWith(value);
        });
    });

    it('should return a reference to the element', () => {
        const ref: React.Ref<HTMLInputElement> = React.createRef();

        mount(<RadioButton inputRef={ref} />);

        if (ref.current === null) {
            throw new Error('No ref');
        }

        expect(ref.current.type).toBe('radio');
    });
});
