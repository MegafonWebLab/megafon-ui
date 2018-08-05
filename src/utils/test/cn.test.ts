import { cnCreate } from '../cn';

const cn = cnCreate('test');
it('get modificator', () => {
    const selector = cn('make');
    expect(selector).toBe('test__make');
});

it('get modificator_modificator', () => {
    const selector = cn('make', { start: true });
    expect(selector).toBe('test__make test__make_start');
});

it('get modificator_modificator_modificator', () => {
    const selector = cn('make', { start: 'final' });
    expect(selector).toBe('test__make test__make_start_final');
});

it('get custom class name', () => {
    const selector = cn('make', {}, 'custom-class');
    expect(selector).toBe('test__make custom-class');
});

it('get with empty prefix', () => {
    const selector = cn('', {}, 'custom-class');
    expect(selector).toBe('test custom-class');
});

it('get with empty prefix and with options', () => {
    const selector = cn('', { start: true }, 'custom-class');
    expect(selector).toBe('test test_start custom-class');
});

it('get with empty prefix and with options string', () => {
    const selector = cn('', { start: 'check' }, 'custom-class');
    expect(selector).toBe('test test_start_check custom-class');
});
