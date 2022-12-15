const getMinutes = (sec: number): string => {
    const min = parseInt(`${sec / 60}`, 10);
    if (min < 10) {
        return `0${min}`;
    }

    return `${min}`;
};

/**
 * @param {Number} sec
 * @returns {String}
 */
const getSeconds = (sec: number): string => {
    if (sec < 10) {
        return `0${sec}`;
    }

    return `${sec}`;
};

export const timerFormat = (sec: number): string => {
    const min = getMinutes(sec);
    const seconds = getSeconds(sec % 60);

    return `${min}:${seconds}`;
};
