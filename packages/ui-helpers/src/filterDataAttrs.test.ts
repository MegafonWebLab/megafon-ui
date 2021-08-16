/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import filterDataAttrs from './filterDataAttrs';

describe('filterDataAttrs', () => {
    it('should return correct attributes', () => {
        const correctAttrs = {
            'data-test': 'test',
            'data-test-test': 'test',
        };
        const incorrectAttrs = {
            'Data-test': 'test',
            'test-data-test': 'test',
            'test-data': 'test',
            dataTest: 'test',
            testTest: 'test',
        };
        const filteredAttrs = filterDataAttrs({
            ...correctAttrs,
            ...incorrectAttrs,
        });

        expect(filteredAttrs).toEqual(correctAttrs);
    });

    it('should return empty object with incorrect params', () => {
        const numberRandom = 123;
        const incorrectParams = [undefined, null, [], Function, 'test', numberRandom];

        incorrectParams.forEach((param: any) => {
            expect(filterDataAttrs(param)).toEqual({});
        });
    });
});
