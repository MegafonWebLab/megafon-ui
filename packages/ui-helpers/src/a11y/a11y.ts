export const MOUSE_KEY = 'click';
export const KEYBOARD_ENTER_KEY = 'Enter';
export const KEYBOARD_NUMPAD_ENTER_KEY = 'NumpadEnter';
export const TOUCH_KEY = 'touchstart';

export type AccessibilityEventTypeNative = MouseEvent | KeyboardEvent | TouchEvent;

export type AccessibilityEventType =
    | React.MouseEvent<EventTarget>
    | React.SyntheticEvent
    | React.SyntheticEvent<EventTarget, Event>
    | React.KeyboardEvent;

export const checkNativeEventIsClickOrEnterPress = (e: AccessibilityEventTypeNative): boolean =>
    e.type === TOUCH_KEY ||
    e.type === MOUSE_KEY ||
    (e as KeyboardEvent).code === KEYBOARD_ENTER_KEY ||
    (e as KeyboardEvent).code === KEYBOARD_NUMPAD_ENTER_KEY;

export const checkEventIsClickOrEnterPress = (e: AccessibilityEventType): boolean =>
    e.type === TOUCH_KEY ||
    e.type === MOUSE_KEY ||
    (e.nativeEvent as KeyboardEvent).code === KEYBOARD_ENTER_KEY ||
    (e.nativeEvent as KeyboardEvent).code === KEYBOARD_NUMPAD_ENTER_KEY;
