const getRange = (from, to, step = 1) => {
    let i = from;
    const range: number[] = [];

    while (i <= to) {
        range.push(i);
        i += step;
    }

    return range;
};

export default getRange;
