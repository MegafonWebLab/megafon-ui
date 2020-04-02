import classnames from 'classnames';

interface IClassSet {
    [key: string]: boolean;
}

interface IParams {
    [key: string]: boolean | string;
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
export default function cnCreate(blockName: string) {
    return (
        elementName: string,
        modificatorsObject?: {},
        customClassNames?: string
    ) => {
        const params: IParams | undefined = modificatorsObject || undefined;
        const prefix = elementName;
        const className = customClassNames || '';

        if (
            !params || (typeof params === 'object' && Object.keys(params).length === 0)
        ) {
            return classnames(
                `${blockName}${prefix ? '__' + prefix : ''}`,
                className
            );
        }

        const classParams: IClassSet = {};
        let prefixKey = '';
        let withoutPrefix = '';

        for (const key in params) {
            if (typeof params[key] === 'boolean' && params[key]) {
                prefixKey = `__${prefix}_${key}`;
                classParams[
                    `${blockName}${prefix ? prefixKey : '_' + key}`
                ] = true;
            } else if (typeof params[key] === 'string') {
                prefixKey = `__${prefix}_${key}_${params[key]}`;
                withoutPrefix = `_${key}_${params[key]}`;
                classParams[
                    `${blockName}${prefix ? prefixKey : withoutPrefix}`
                ] = true;
            }
        }

        return prefix === ''
            ? classnames(blockName, classParams, className)
            : classnames(`${blockName}__${prefix}`, classParams, className);
    };
}
