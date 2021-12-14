import type { AccessibilityEventType, AccessibilityEventTypeNative } from './a11y';
import {
    MOUSE_KEY,
    TOUCH_KEY,
    KEYBOARD_ENTER_KEY,
    checkEventIsClickOrEnterPress,
    checkNativeEventIsClickOrEnterPress,
} from './a11y';

describe('a11y util', () => {
    describe('checkEventIsClickOrEnterPress tests', () => {
        it('returns true, if event type is touchstart', () => {
            const event = {
                type: TOUCH_KEY,
            } as AccessibilityEventType;

            expect(checkEventIsClickOrEnterPress(event)).toBeTruthy();
        });

        it('returns true, if event type is mouse key click', () => {
            const event = {
                type: MOUSE_KEY,
            } as AccessibilityEventType;

            expect(checkEventIsClickOrEnterPress(event)).toBeTruthy();
        });

        it('returns true if enter pressed', () => {
            expect(
                checkEventIsClickOrEnterPress({
                    nativeEvent: { code: KEYBOARD_ENTER_KEY },
                } as AccessibilityEventType),
            ).toBeTruthy();
        });

        it('returns false, if event type isnt mouse key click or touchstart', () => {
            const event = {
                type: 'focus',
                nativeEvent: {},
            } as AccessibilityEventType;

            expect(checkEventIsClickOrEnterPress(event)).toBeFalsy();
        });

        it('returns false, if pressed button isnt enter', () => {
            const event = {
                nativeEvent: { code: 'ctrl' },
            } as AccessibilityEventType;

            expect(checkEventIsClickOrEnterPress(event)).toBeFalsy();
        });
    });

    describe('checkNativeEventIsClickOrEnterPress tests', () => {
        it('returns true, if event type is touchstart', () => {
            const event = {
                type: TOUCH_KEY,
            } as AccessibilityEventTypeNative;

            expect(checkNativeEventIsClickOrEnterPress(event)).toBeTruthy();
        });

        it('returns true, if event type is mouse key click', () => {
            const event = {
                type: MOUSE_KEY,
            } as AccessibilityEventTypeNative;

            expect(checkNativeEventIsClickOrEnterPress(event)).toBeTruthy();
        });

        it('returns true if enter pressed', () => {
            expect(
                checkNativeEventIsClickOrEnterPress({
                    code: KEYBOARD_ENTER_KEY,
                } as AccessibilityEventTypeNative),
            ).toBeTruthy();
        });

        it('returns false, if event type isnt mouse key click or touchstart', () => {
            const event = {
                type: 'focus',
            } as AccessibilityEventTypeNative;

            expect(checkNativeEventIsClickOrEnterPress(event)).toBeFalsy();
        });

        it('returns false, if pressed button isnt enter', () => {
            const event = {
                code: 'ctrl',
            } as AccessibilityEventTypeNative;

            expect(checkNativeEventIsClickOrEnterPress(event)).toBeFalsy();
        });
    });
});
