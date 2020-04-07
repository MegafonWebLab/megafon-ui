import classnames from 'classnames';

interface IModificators {
    [key: string]: boolean | string | undefined | null;
}

interface IClassSet {
    [key: string]: boolean;
}

type CustomClassNameType = string;
type CustomClassNamesArrayType = string[];
type CustomClassNamesType = CustomClassNameType | CustomClassNamesArrayType | undefined;

type ElementNameType = string | IModificators | CustomClassNamesArrayType | CustomClassNamesType;

const getCustomClassName = (first?: ElementNameType, second?: ElementNameType, third?: CustomClassNamesType) => {
    if (Array.isArray(first)) {
        return first.filter(f => typeof f === 'string').join(' ');
    }
    if (Array.isArray(second)) {
        return second.filter(f => typeof f === 'string').join(' ');
    }
    if (typeof second === 'string') {
        return second;
    }
    if (Array.isArray(third)) {
        return third.filter(f => typeof f === 'string').join(' ');
    }
    if (typeof third === 'string') {
        return third;
    }

    return '';
};

/**
 * Бэм генератор
 * @param {String} blockName - название блока
 * @returns {function} - возвращает функцию с тремя возожными параметрами
 * @param {String} elementName - название элемента
 * @param {Object} modificatorsObject - объект с модификаторами
 * @param {String} customClassNames - названия кастомных классов
 * @returns {String}
 */
function cnCreate(blockName: string) {
    function getElement(): string;
    function getElement(elementName: ElementNameType): string;
    function getElement(modificatorsObject: ElementNameType): string;
    function getElement(customClassNames: CustomClassNamesArrayType): string;
    function getElement(elementName: ElementNameType, modificatorsObject: ElementNameType): string;
    function getElement(elementName: ElementNameType, customClassNames: CustomClassNamesType): string;
    function getElement(modificatorsObject: ElementNameType, customClassNames: CustomClassNamesType): string;
    function getElement(
        elementName: ElementNameType,
        modificatorsObject: ElementNameType,
        customClassNames: CustomClassNamesType
    ): string;
    function getElement(
        elementName?: ElementNameType,
        modificatorsObject?: ElementNameType,
        customClassNames?: CustomClassNamesType
    ): string {
        const prefix = typeof elementName === 'string' ? elementName : '';
        const className = getCustomClassName(elementName, modificatorsObject, customClassNames);
        const secondMods = !Array.isArray(modificatorsObject) && typeof modificatorsObject !== 'string'
            ? modificatorsObject
            : undefined;
        const params = typeof elementName !== 'string' && !Array.isArray(elementName)
            ? elementName
            : secondMods;

        if (!params || typeof params === 'object' && Object.keys(params).length === 0) {
            return classnames(`${blockName}${prefix ? '__' + prefix : ''}`, className);
        }

        const classParams: IClassSet = {};
        let prefixKey, withoutPrefix;

        for (const key in params) {
            if (typeof params[key] === 'boolean' && params[key]) {
                prefixKey = `__${prefix}_${key}`;
                classParams[`${blockName}${prefix ? prefixKey : '_' + key}`] = true;
            } else if (typeof params[key] === 'string') {
                prefixKey = `__${prefix}_${key}_${params[key]}`;
                withoutPrefix = `_${key}_${params[key]}`;
                classParams[`${blockName}${prefix ? prefixKey : withoutPrefix}`] = true;
            }
        }

        return prefix === ''
            ? classnames(blockName, classParams, className)
            : classnames(`${blockName}__${prefix}`, classParams, className);
    }

    return getElement;
}

export default cnCreate;
