import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Checkbox, { ICheckboxProps } from './Checkbox';

const dataAttrs: ICheckboxProps['dataAttrs'] = {
    root: {
        'data-testid': 'root',
    },
    inner: {
        'data-testid': 'inner',
    },
    input: {
        'data-testid': 'input',
    },
    customInput: {
        'data-testid': 'customInput',
    },
    extraContent: {
        'data-testid': 'extraContent',
    },
};

describe('<Checkbox />', () => {
    it('should render Checkbox', () => {
        const { container } = render(<Checkbox extraContent="Extra content">Тестовая строка</Checkbox>);

        expect(container).toMatchSnapshot();
    });

    it('should render with classes', () => {
        const { getByTestId } = render(
            <Checkbox
                className="custom-class"
                classes={{ inner: 'inner-class', icon: 'icon-class' }}
                dataAttrs={dataAttrs}
            >
                Тестовая строка
            </Checkbox>,
        );

        expect(getByTestId('root')).toHaveClass('custom-class');
        expect(getByTestId('inner')).toHaveClass('inner-class');
        expect(getByTestId('customInput')).toHaveClass('icon-class');
    });

    it('should render with dataAttrs', () => {
        const { queryByTestId } = render(
            <Checkbox extraContent="extra" dataAttrs={dataAttrs}>
                Тестовая строка
            </Checkbox>,
        );

        expect(queryByTestId('root')).toBeTruthy();
        expect(queryByTestId('inner')).toBeTruthy();
        expect(queryByTestId('input')).toBeTruthy();
        expect(queryByTestId('customInput')).toBeTruthy();
        expect(queryByTestId('extraContent')).toBeTruthy();
    });

    it('should render with color', () => {
        const { getByTestId } = render(
            <Checkbox color="light" dataAttrs={dataAttrs}>
                Тестовая строка
            </Checkbox>,
        );

        expect(getByTestId('root')).toHaveClass('mfui-checkbox_color_light');
    });

    it('should render with fontSize', () => {
        const { getByTestId } = render(
            <Checkbox fontSize="small" dataAttrs={dataAttrs}>
                Тестовая строка
            </Checkbox>,
        );

        expect(getByTestId('root')).toHaveClass('mfui-checkbox_font-size_small');
    });

    it('should render with name', () => {
        const { getByTestId } = render(
            <Checkbox name="testName" dataAttrs={dataAttrs}>
                Тестовая строка
            </Checkbox>,
        );

        expect(getByTestId('input')).toHaveAttribute('name', 'testName');
    });

    it('should render with value', () => {
        const { getByTestId } = render(
            <Checkbox value="testValue" dataAttrs={dataAttrs}>
                Тестовая строка
            </Checkbox>,
        );

        expect(getByTestId('input')).toHaveAttribute('value', 'testValue');
    });

    it('should render checked component after first render', () => {
        const { getByTestId } = render(
            <Checkbox checked dataAttrs={dataAttrs}>
                Тестовая строка
            </Checkbox>,
        );
        const input = getByTestId('input') as HTMLInputElement;

        expect(getByTestId('root')).toHaveClass('mfui-checkbox_checked');
        expect(input.checked).toBeTruthy();
        expect(getByTestId('customInput')).toHaveAttribute('aria-checked', 'true');
    });

    it('should render checked component after change', () => {
        const { getByTestId } = render(<Checkbox dataAttrs={dataAttrs}>Тестовая строка</Checkbox>);
        const root = getByTestId('root');
        const input = getByTestId('input') as HTMLInputElement;
        const customInput = getByTestId('customInput');

        expect(root).not.toHaveClass('mfui-checkbox_checked');
        expect(input.checked).toBeFalsy();
        expect(customInput).toHaveAttribute('aria-checked', 'false');

        fireEvent.click(getByTestId('input'));

        expect(root).toHaveClass('mfui-checkbox_checked');
        expect(input.checked).toBeTruthy();
        expect(customInput).toHaveAttribute('aria-checked', 'true');
    });

    it('should render when disagled is true', () => {
        const { getByTestId } = render(
            <Checkbox disabled dataAttrs={dataAttrs}>
                Тестовая строка
            </Checkbox>,
        );

        expect(getByTestId('root')).toHaveClass('mfui-checkbox_disabled');
        expect(getByTestId('input')).toHaveAttribute('disabled');
    });

    it('should render when error is true', () => {
        const { getByTestId } = render(
            <Checkbox error dataAttrs={dataAttrs}>
                Тестовая строка
            </Checkbox>,
        );

        expect(getByTestId('root')).toHaveClass('mfui-checkbox_error');
    });

    it('should render with extraContent', () => {
        const { queryByText } = render(
            <Checkbox extraContent="Extra content" dataAttrs={dataAttrs}>
                Тестовая строка
            </Checkbox>,
        );

        expect(queryByText('Extra content')).toBeInTheDocument();
    });

    describe('handleChange', () => {
        it('calls onChange on change input', () => {
            const checked = false;
            const handleChange = jest.fn();

            const { getByTestId } = render(
                <Checkbox onChange={handleChange} checked={checked} dataAttrs={dataAttrs}>
                    Тестовая строка
                </Checkbox>,
            );

            fireEvent.click(getByTestId('input'));

            expect(handleChange).toBeCalledWith(!checked);
        });

        it('calls onChange on Enter click', () => {
            const checked = false;
            const handleChange = jest.fn();

            const { getByTestId } = render(
                <Checkbox onChange={handleChange} checked={checked} dataAttrs={dataAttrs}>
                    Тестовая строка
                </Checkbox>,
            );

            fireEvent.keyDown(getByTestId('customInput'), { code: 'Enter' });

            expect(handleChange).toBeCalledWith(!checked);
        });

        it('not calls onChange on keydown, if keyboard code is not Enter', () => {
            const handleChange = jest.fn();

            const { getByTestId } = render(
                <Checkbox onChange={handleChange} checked={false} dataAttrs={dataAttrs}>
                    Тестовая строка
                </Checkbox>,
            );

            fireEvent.keyDown(getByTestId('customInput'), { code: 'Tab' });

            expect(handleChange).not.toBeCalled();
        });
    });
});
