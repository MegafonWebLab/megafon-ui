/* eslint-disable no-console */
import nestingNameGenerator from './nestingNameGenerator';

const blockName = 'Test';
const testId = nestingNameGenerator(blockName);

describe('nestingNameGenerator', () => {
    describe('return value tests', () => {
        it('should return correct value with 1 argument', () => {
            expect(testId('element')).toEqual(`${blockName}-element`);
        });

        it('should return correct value with element name and string', () => {
            expect(testId('element', 2)).toEqual(`${blockName}-element[2]`);
        });

        it('should return correct value with two element names', () => {
            expect(testId('element', 'slide')).toEqual(`${blockName}-element-slide`);
        });

        it('should return correct value with four consequtive arguments', () => {
            expect(testId('element', 1, 'slide', 2)).toEqual(`${blockName}-element[1]-slide[2]`);
        });

        it('should return correct value with four mixed arguments', () => {
            expect(testId('element', 1, 'slide', 'button')).toEqual(`${blockName}-element[1]-slide-button`);
        });

        it('should return correct value with six consequtive arguments', () => {
            expect(testId('element', 1, 'slide', 2, 'button', 3)).toEqual(`${blockName}-element[1]-slide[2]-button[3]`);
        });

        it('should return correct value with six mixed arguments', () => {
            expect(testId('element', 1, 'slide', 'button', 3, 'link')).toEqual(
                `${blockName}-element[1]-slide-button[3]-link`,
            );
        });
    });

    describe('console warning tests', () => {
        beforeAll(() => {
            jest.spyOn(console, 'warn').mockImplementation();
        });

        it('should return correct value and fire console warning if block name contains digits', () => {
            const wrongTestId = nestingNameGenerator('Test99');
            const id = wrongTestId('element');

            expect(id).toEqual('Test99-element');
            expect(console.warn).toHaveBeenCalledWith(
                'Wrong block name Test99. Block name should contain only letters in camelCase format.',
            );
        });

        it('should return correct value and fire console warning if block name contains symbols', () => {
            const wrongTestId = nestingNameGenerator('Test-');
            const id = wrongTestId('element');

            expect(id).toEqual('Test--element');
            expect(console.warn).toHaveBeenCalledWith(
                'Wrong block name Test-. Block name should contain only letters in camelCase format.',
            );
        });

        it('should return correct value and fire console warning if block name contains non-cyrillic letters', () => {
            const wrongTestId = nestingNameGenerator('Тест');
            const id = wrongTestId('element');

            expect(id).toEqual('Тест-element');
            expect(console.warn).toHaveBeenCalledWith(
                'Wrong block name Тест. Block name should contain only letters in camelCase format.',
            );
        });

        it('should return correct value and fire console warning for element containing number', () => {
            const id = testId('element99');

            expect(id).toEqual(`${blockName}-element99`);
            expect(console.warn).toHaveBeenCalledWith(
                `Wrong element name element99 of ${blockName} in args:element99. Element name should contain only letters in camelCase format.`,
            );
        });

        it('should return correct value and fire console warning for element containing symbols', () => {
            const id = testId('element-');

            expect(id).toEqual(`${blockName}-element-`);
            expect(console.warn).toHaveBeenCalledWith(
                `Wrong element name element- of ${blockName} in args:element-. Element name should contain only letters in camelCase format.`,
            );
        });

        it('should return correct value and fire console warning for element containing non-cyrillic letters', () => {
            const id = testId('элемент');

            expect(id).toEqual(`${blockName}-элемент`);
            expect(console.warn).toHaveBeenCalledWith(
                `Wrong element name элемент of ${blockName} in args:элемент. Element name should contain only letters in camelCase format.`,
            );
        });

        it('should return correct value and fire console warning for zero index', () => {
            const id = testId('element', 0);

            expect(id).toEqual(`${blockName}-element[0]`);
            expect(console.warn).toHaveBeenCalledWith(
                `Wrong element index 0 of ${blockName} in args:element,0. Index should be above zero and in number format.`,
            );
        });

        it('should return correct value and fire console warning for negative index', () => {
            const id = testId('element', -2);

            expect(id).toEqual(`${blockName}-element[-2]`);
            expect(console.warn).toHaveBeenCalledWith(
                `Wrong element index -2 of ${blockName} in args:element,-2. Index should be above zero and in number format.`,
            );
        });
    });
});
