import { ISelectItem, SelectItemValueType } from '../Select';

const isEqualItems = <T extends SelectItemValueType>(
    newItems: Array<ISelectItem<T>>,
    setItems: Array<ISelectItem<T>>,
): boolean => {
    if (newItems.length !== setItems.length) {
        return false;
    }

    return newItems.every((item, i) => {
        const isEqualValue = item.value === setItems[i].value;
        const isEqualTitle = item.title === setItems[i].title;

        return isEqualValue && isEqualTitle;
    });
};

export const initialState = {
    isOpened: false,
    hoveredItemIndex: 0,
    itemsList: [],
    comparableInputValue: '',
    inputValue: '',
};

export enum SelectActions {
    TOGGLE_DROPDOWN = 'TOGGLE_DROPDOWN',
    UPDATE_ITEMS_LIST = 'UPDATE_ITEMS_LIST',
    UPDATE_VALUE_FROM_PROPS = 'UPDATE_VALUE_FROM_PROPS',
    UPDATE_SELECT_VALUE = 'UPDATE_SELECT_VALUE',
    SET_HOVERED_ITEM_INDEX = 'SET_HOVERED_ITEM_INDEX',
    COMBOBOX_VALUE_DEBOUNCE = 'COMBOBOX_VALUE_DEBOUNCE',
    COMBOBOX_INPUT_CHANGE = 'COMBOBOX_INPUT_CHANGE',
}

export interface ISelectState<T extends SelectItemValueType> {
    isOpened: boolean;
    hoveredItemIndex: number;
    itemsList: Array<ISelectItem<T>>;
    comparableInputValue: string;
    inputValue: string;
}

export interface ISelectAction<T extends SelectItemValueType> {
    type: SelectActions;
    items?: Array<ISelectItem<T>>;
    hoveredItemIndex?: number;
    inputValue?: string;
    comparableInputValue?: string;
    isOpened?: boolean;
}

const {
    TOGGLE_DROPDOWN,
    UPDATE_ITEMS_LIST,
    UPDATE_VALUE_FROM_PROPS,
    UPDATE_SELECT_VALUE,
    SET_HOVERED_ITEM_INDEX,
    COMBOBOX_VALUE_DEBOUNCE,
    COMBOBOX_INPUT_CHANGE,
} = SelectActions;

const selectReducer = <T extends SelectItemValueType>(
    state: ISelectState<T>,
    action: ISelectAction<T>,
): ISelectState<T> => {
    const {
        type,
        items = [],
        hoveredItemIndex = 0,
        inputValue = '',
        comparableInputValue = '',
        isOpened = false,
    } = action;
    const { itemsList: prevItems } = state;

    switch (type) {
        case TOGGLE_DROPDOWN: {
            return { ...state, isOpened };
        }
        case UPDATE_ITEMS_LIST: {
            const isItemsEqual = isEqualItems(items, prevItems);

            return isItemsEqual ? state : { ...state, itemsList: items };
        }
        case UPDATE_VALUE_FROM_PROPS: {
            return {
                ...state,
                hoveredItemIndex,
                inputValue,
                comparableInputValue: '',
            };
        }
        case COMBOBOX_VALUE_DEBOUNCE: {
            return {
                ...state,
                comparableInputValue,
                itemsList: items,
                isOpened: true,
                hoveredItemIndex: 0,
            };
        }
        case UPDATE_SELECT_VALUE: {
            return {
                ...state,
                isOpened: false,
                itemsList: items,
                hoveredItemIndex,
            };
        }
        case SET_HOVERED_ITEM_INDEX: {
            return { ...state, hoveredItemIndex };
        }
        case COMBOBOX_INPUT_CHANGE: {
            return {
                ...state,
                inputValue,
            };
        }
        default: {
            return state;
        }
    }
};

export default selectReducer;
