export interface IAttributes {
    [key: string]: string;
}

export interface IDataAttributes {
    /** Дата атрибуты для корневого элемента */
    dataAttrs?: IAttributes;
}

const filterDataAttrs = (attrs: IAttributes = {}): IAttributes | {} => {
    if (!attrs || typeof attrs !== 'object') {
        return {};
    }

    return Object.keys(attrs)
        .filter(key => key.search(/^data-/) !== -1)
        .reduce((acc, key) => ({ ...acc, [key]: attrs[key] }), {});
};

export default filterDataAttrs;
