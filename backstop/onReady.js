module.exports = async (page, scenario, vp) => {
    const [componentName] = scenario.label.split('-');
    const className = componentName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

    await page.evaluate((className, componentName) => {
        var style = document.createElement('style');
        style.innerHTML = `
            *, *::after, *::before {
                transition-delay: 0s !important;
                transition-duration: 0s !imporant;
                animation-delay: 0s !important;
                animation-duration: 0s !important;
                animation-play-state: 0s !important;
            }
        `;
        document.head.appendChild(style);

        var componentsList = document.querySelectorAll(`.${className}`);
        [].slice.call(componentsList).forEach((domComponent, i) => {
            domComponent.parentElement.classList.add(`${componentName}-${i}`)
        })
    }, className, componentName);
};
