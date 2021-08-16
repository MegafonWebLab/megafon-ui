const getRange = (from: number, to: number, step = 1): number[] => {
    let i = from;
    const range: number[] = [];

    while (i <= to) {
        range.push(i);
        i += step;
    }

    return range;
};

export default getRange;
