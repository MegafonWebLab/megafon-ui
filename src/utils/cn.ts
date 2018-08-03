import * as classnames from 'classnames';

interface ClassSet {
    [key: string]: boolean;
}

export const cnCreate = (str: string) => (...args: Array<any>) => {
    let prefix, params, customClassName = '';
    prefix = args[0];

    if (args.length > 2) {
        params = args[1];
        customClassName = args[2];
    } else if (args.length > 1) {
        params = args[1];
    }

    if (!params || typeof params === 'object' && Object.keys(params).length === 0) {
        return classnames(`${str}${prefix ? '__' + prefix : ''}`, customClassName);
    }

    const classParams: ClassSet = {};
    let prefixKey, withoutPrefix;

    for (const key in params) {
        if (typeof params[key] === 'boolean' && params[key]) {
            prefixKey = `__${prefix}_${key}`;
            classParams[`${str}${prefix ? prefixKey : '_' + key}`] = true;
        } else if (typeof params[key] === 'string') {
            prefixKey = `__${prefix}_${key}_${params[key]}`;
            withoutPrefix = `_${key}_${params[key]}`;
            classParams[`${str}${prefix ? prefixKey : withoutPrefix}`] = true;
        }
    }

    return prefix === ''
        ? classnames(str, classParams, customClassName)
        : classnames(`${str}__${prefix}`, classParams, customClassName);
};
