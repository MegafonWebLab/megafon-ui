const cat = document.querySelector('.interesting-dialog__cat');
const catButton = cat?.querySelector('button');

const FIRST_CLICK_CLASS = 'interesting-dialog__cat_first-click';
const SECOND_CLICK_CLASS = 'interesting-dialog__cat_second-click';
const FINALLY_CLICK_CLASS = 'interesting-dialog__cat_finally';

const handleCatButtonClick = e => {
    e.preventDefault();

    if (cat?.classList.contains(FINALLY_CLICK_CLASS)) {
        catButton?.removeEventListener('click', handleCatButtonClick);

        return;
    }

    if (cat?.classList.contains(SECOND_CLICK_CLASS)) {
        cat?.classList.add(FINALLY_CLICK_CLASS);

        return;
    }

    if (cat?.classList.contains(FIRST_CLICK_CLASS)) {
        cat?.classList.add(SECOND_CLICK_CLASS);

        return;
    }

    cat?.classList.add(FIRST_CLICK_CLASS);
};

catButton?.addEventListener('click', handleCatButtonClick);
