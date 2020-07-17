import BP from 'constants/breakpoints';

/**
 * @return {boolean}
 */
const isDesktopWideScreen = (): boolean => {
    return window.innerWidth >= BP.DESKTOP_BIG_START;
};

/**
 * @return {boolean}
 */
const isDesktopScreen = (): boolean => {
    const windowWidth = window.innerWidth;

    return windowWidth >= BP.DESKTOP_MIDDLE_START && windowWidth <= BP.DESKTOP_MIDDLE_END;
};

/**
 * @return {boolean}
 */

const isDesktopSmallScreen = (): boolean => {
    const windowWidth = window.innerWidth;

    return windowWidth < BP.DESKTOP_MIDDLE_START && windowWidth >= BP.DESKTOP_SMALL_START;
};

/**
 * @return {boolean}
 */
const isTabletScreen = (): boolean => {
    const windowWidth = window.innerWidth;

    return windowWidth < BP.DESKTOP_SMALL_START && windowWidth >= BP.MOBILE_BIG_START;
};

/**
 * @return {boolean}
 */
const isMobileScreen = (): boolean => {
    return window.innerWidth < BP.MOBILE_BIG_START;
};

/**
 * @return {boolean}
 */

const isMobileWideScreen = (): boolean => {
    return isTabletScreen() || isMobileScreen();
};

export default {
    isDesktopWideScreen,
    isDesktopScreen,
    isDesktopSmallScreen,
    isTabletScreen,
    isMobileScreen,
    isMobileWideScreen,
};
