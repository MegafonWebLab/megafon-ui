import classnames from 'classnames';

interface ClassSet {
    [key: string]: boolean;
}

/**
 * Бэм генератор
 * @param {String} blockName - название блока
 * @returns {function} - возвращает функцию с тремя возожными параметрами
 * @param {String} elementName - название элемента
 * @param {Object} modificatorsObject - объект с модификаторами
 * @param {String} customClassNames - названия кастомных классов
 * @returns {String}
 */
export const cnCreate = (blockName: string) =>
    (elementName: string, modificatorsObject?: {}, customClassNames?: string) => {
        let params;
        const prefix = elementName;
        const className = customClassNames || '';

        if (modificatorsObject) {
            params = modificatorsObject;
        }

        if (!params || typeof params === 'object' && Object.keys(params).length === 0) {
            return classnames(`${blockName}${prefix ? '__' + prefix : ''}`, className);
        }

        const classParams: ClassSet = {};
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
    };
