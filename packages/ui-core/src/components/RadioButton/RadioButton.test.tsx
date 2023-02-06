import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import RadioButton from './RadioButton';

const dataAttrs = {
    root: {
        'data-testid': 'root',
    },
    input: {
        'data-testid': 'input',
    },
    text: {
        'data-testid': 'text',
    },
};

const value = 'value1';

describe('<RadioButton />', () => {
    it('should render', () => {
        const { container } = render(<RadioButton value="value1">Тестовая строка</RadioButton>);

        expect(container).toMatchSnapshot();
    });

    it('should render with name', () => {
        const name = 'inputName';
        const { getByTestId } = render(
            <RadioButton value={value} name={name} dataAttrs={dataAttrs}>
                Тестовая строка
            </RadioButton>,
        );

        expect(getByTestId('input')).toHaveAttribute('name', name);
    });

    it('should render with textSize="small"', () => {
        const { getByTestId } = render(
            <RadioButton value={value} textSize="small" dataAttrs={dataAttrs}>
                Тестовая строка
            </RadioButton>,
        );

        expect(getByTestId('text')).toHaveClass('mfui-radio-button__text_size_small');
    });

    it('should render with disabled', () => {
        const { getByTestId, getByText } = render(
            <RadioButton value={value} disabled dataAttrs={dataAttrs}>
                Тестовая строка
            </RadioButton>,
        );

        expect(getByTestId('input')).toBeDisabled();
        expect(getByText('Тестовая строка').closest('label')).toHaveClass('mfui-radio-button__label_disabled');
    });

    it('should render with isChecked', () => {
        const { getByTestId } = render(
            <RadioButton value={value} isChecked dataAttrs={dataAttrs}>
                Тестовая строка
            </RadioButton>,
        );

        expect(getByTestId('input')).toBeChecked();
    });

    it('should render with className', () => {
        const className = 'testClass';
        const { getByTestId } = render(
            <RadioButton value={value} className={className} dataAttrs={dataAttrs}>
                Тестовая строка
            </RadioButton>,
        );

        expect(getByTestId('root')).toHaveClass(className);
    });

    it('should render with classes', () => {
        const classes = {
            root: 'rootClass',
            label: 'labelClass',
            customInput: 'customInputClass',
            labelText: 'labelTextClass',
        };
        const { getByTestId, getByText, container } = render(
            <RadioButton value={value} classes={classes} dataAttrs={dataAttrs}>
                Тестовая строка
            </RadioButton>,
        );

        expect(getByTestId('root')).toHaveClass(classes.root);
        expect(getByTestId('text')).toHaveClass(classes.labelText);
        expect(getByText('Тестовая строка').closest('label')).toHaveClass(classes.label);
        expect(container.getElementsByClassName(classes.customInput)).toMatchSnapshot();
    });

    it('should call onChange', () => {
        const handleChange = jest.fn(buttonValue => buttonValue);

        const { getByTestId } = render(
            <RadioButton value={value} onChange={handleChange} dataAttrs={dataAttrs}>
                Тестовая строка
            </RadioButton>,
        );

        fireEvent.click(getByTestId('input'));
        expect(handleChange).toHaveBeenCalledWith(value);
    });

    it('should return a reference to the element', () => {
        const ref: React.Ref<HTMLInputElement> = React.createRef();

        render(<RadioButton inputRef={ref} value="" />);

        if (ref.current === null) {
            throw new Error('No ref');
        }

        expect(ref.current.type).toBe('radio');
    });
});
