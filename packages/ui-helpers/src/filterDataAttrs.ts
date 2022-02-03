const filterDataAttrs = (attrs: Record<string, string> = {}, index?: number): Record<string, string> => {
    if (!attrs || typeof attrs !== 'object') {
        return {};
    }

    return Object.keys(attrs)
        .filter(key => key.search(/^data-/) !== -1)
        .reduce((acc, key) => ({ ...acc, [key]: `${attrs[key]}${index !== undefined ? `[${index}]` : ''}` }), {});
};

export default filterDataAttrs;
