import { renderHook } from '@testing-library/react-hooks';
import usePagination from '../usePagination';

describe('usePagination', () => {
    it('should return items without hidden buttons', () => {
        const { result: { current: pagination }} = renderHook(() => usePagination(3, 1));

        expect(pagination).toEqual([1, 2, 3]);
    });

    it('should return items with right hidden buttons', () => {
        const { result: { current: pagination }} = renderHook(() => usePagination(10, 1));

        expect(pagination).toEqual([1, 2, 3, 4, 5, 'HIDDEN', 10]);
    });

    it('should return items with left hidden buttons', () => {
        const { result: { current: pagination }} = renderHook(() => usePagination(10, 8));

        expect(pagination).toEqual([1, 'HIDDEN', 6, 7, 8, 9, 10]);
    });

    it('should return items with left and right hidden buttons', () => {
        const { result: { current: pagination }} = renderHook(() => usePagination(10, 5));

        expect(pagination).toEqual([1, 'HIDDEN', 4, 5, 6, 'HIDDEN', 10]);
    });

    describe('mobile resolution', () => {
        type LocalWindowType = Omit<Window, 'innerWidth'> & {
            innerWidth: number;
        };

        const localWindow = window as LocalWindowType;
        const windowInnerWidth = window.innerWidth;

        beforeAll(() => {
            localWindow.innerWidth = 320;
        });

        afterAll(() => {
            localWindow.innerWidth = windowInnerWidth;
        });

        it('should return items with right hidden buttons', () => {
            const { result: { current: pagination }} = renderHook(() => usePagination(10, 1));

            expect(pagination).toEqual([1, 2, 3, 'HIDDEN', 10]);
        });

        it('should return items with left hidden buttons', () => {
            const { result: { current: pagination }} = renderHook(() => usePagination(10, 8));

            expect(pagination).toEqual([1, 'HIDDEN', 8, 9, 10]);
        });

        it('should return items with left and right hidden buttons', () => {
            const { result: { current: pagination }} = renderHook(() => usePagination(10, 5));

            expect(pagination).toEqual([1, 'HIDDEN', 5, 'HIDDEN', 10]);
        });
    });
});
