const detectIE11 = (): boolean => {
    if (typeof window === 'undefined') {
        return false;
    }
    const userAgent: string = window.navigator.userAgent.toLowerCase();
    return userAgent.indexOf('trident/') !== -1;
};

export default detectIE11;
