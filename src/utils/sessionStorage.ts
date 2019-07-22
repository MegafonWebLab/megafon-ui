export const setSessionValue = (data, key) => {
    const dataType = Array.isArray(data) || typeof data === 'object';
    const storageData = dataType ? JSON.stringify(data) : data;

    sessionStorage.setItem(key, storageData);
};

export const getSessionValue = key => {
    if (!sessionStorage[key]) {
        return null;
    }

    return JSON.parse(sessionStorage[key]);
};
