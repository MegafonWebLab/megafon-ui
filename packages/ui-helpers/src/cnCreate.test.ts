/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import cnCreate from './cnCreate';

let cn;

beforeEach(() => {
    cn = cnCreate('test');
});

describe('cnCreate', () => {
    describe('elements', () => {
        it('without mod', () => {
            const selector = cn();
            expect(selector).toBe('test');
        });

        it('get modificator', () => {
            const selector = cn('make');
            expect(selector).toBe('test__make');
        });
    });

    describe('mods', () => {
        it('get modificator_modificator', () => {
            const selector = cn('make', { start: true });
            expect(selector).toBe('test__make test__make_start');
        });

        it('get modificator first argument', () => {
            const selector = cn({ start: true });
            expect(selector).toBe('test test_start');
        });

        it('get modificator_modificator_modificator', () => {
            const selector = cn('make', { start: 'final' });
            expect(selector).toBe('test__make test__make_start_final');
        });
    });

    describe('custom classes', () => {
        it('get custom class name', () => {
            const selector = cn('make', {}, 'custom-class');
            expect(selector).toBe('test__make custom-class');
        });

        it('get custom class name list string', () => {
            const selector = cn('make', {}, ['custom-class', 'custom-class-2']);
            expect(selector).toBe('test__make custom-class custom-class-2');
        });

        it('get with undefined in array of custom classes', () => {
            const selector = cn('make', {}, [undefined, 'custom-class']);
            expect(selector).toBe('test__make custom-class');
        });

        it('get with undefined filled array of custom classes', () => {
            const selector = cn('make', {}, [undefined, undefined]);
            expect(selector).toBe('test__make');
        });

        it('get with empty string in array of custom classes', () => {
            const selector = cn('make', {}, ['', 'custom-class']);
            expect(selector).toBe('test__make custom-class');
        });

        it('get with empty string filled array of custom classes', () => {
            const selector = cn('make', {}, ['', '']);
            expect(selector).toBe('test__make');
        });

        it('get with undefined and empty string in array of custom classes', () => {
            const selector = cn('make', {}, [undefined, '']);
            expect(selector).toBe('test__make');
        });

        it('get with empty prefix', () => {
            const selector = cn('', {}, 'custom-class');
            expect(selector).toBe('test custom-class');
        });

        it('get without prefix', () => {
            const selector = cn({}, 'custom-class');
            expect(selector).toBe('test custom-class');
        });

        it('get custom class name second arg str', () => {
            const selector = cn('make', 'test123');
            expect(selector).toBe('test__make test123');
        });

        it('get custom class name second arg list', () => {
            const selector = cn('make', ['test123', 'test321']);
            expect(selector).toBe('test__make test123 test321');
        });

        it('get custom class first arg list', () => {
            const selector = cn(['test123', 'test321']);
            expect(selector).toBe('test test123 test321');
        });

        it('get with empty prefix and with options', () => {
            const selector = cn('', { start: true }, 'custom-class');
            expect(selector).toBe('test test_start custom-class');
        });

        it('get with empty prefix and with options string', () => {
            const selector = cn('', { start: 'check' }, 'custom-class');
            expect(selector).toBe('test test_start_check custom-class');
        });

        it('get with empty prefix, with options string and with array of custom classes', () => {
            const selector = cn('', { start: 'check' }, ['custom-class1', 'custom-class2']);
            expect(selector).toBe('test test_start_check custom-class1 custom-class2');
        });

        it('get without prefix and with options', () => {
            const selector = cn({ start: true }, 'custom-class');
            expect(selector).toBe('test test_start custom-class');
        });

        it('get without prefix and with options string', () => {
            const selector = cn({ start: 'check' }, 'custom-class');
            expect(selector).toBe('test test_start_check custom-class');
        });

        it('get without prefix, with options string and with array of custom classes', () => {
            const selector = cn({ start: 'check' }, ['custom-class1', 'custom-class2']);
            expect(selector).toBe('test test_start_check custom-class1 custom-class2');
        });
    });
});
