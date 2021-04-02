import React from 'react';
import { cnCreate, Logo } from '@megafon/ui-core';
import './PageHeader.less';

interface IPageHeaderProps {
    isOpen: boolean;
    onClick: React.MouseEventHandler;
}

const burger = (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 32 32" xmlSpace="preserve">
        <path d="M8,9h16v2H8V9z M8,21h16v2H8V21z M8,15h16v2H8V15z"/>
    </svg>
);

const closeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <path d="M16 14.5L11.5 10 10 11.5l4.5 4.5-4.5 4.5 1.5 1.5 4.5-4.5 4.5 4.5 1.5-1.5-4.5-4.5 4.5-4.5-1.5-1.5-4.5 4.5z"/>
    </svg>
);

const cn = cnCreate('docz-page-header');
const PageHeader: React.FC<IPageHeaderProps> = ({ onClick, isOpen }) => {
    return (
        <div className={cn()}>
            <button className={cn('hamburger')} onClick={onClick}>
                {isOpen ? closeIcon : burger}
            </button>
            <div className={cn('logo')}>
                <Logo />
            </div>
        </div>
    )
};

export default PageHeader;
