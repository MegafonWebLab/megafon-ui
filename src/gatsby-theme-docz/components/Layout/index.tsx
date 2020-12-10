import React from 'react';
import { cnCreate } from '@megafon/ui-core';
import { useWindowSize } from 'docz'
import './Layout.less';
import SideBar from '../SideBar';
import PageHeader from '../PageHeader';

const cn = cnCreate('docz-layout');
const Layout: React.FC = ({ children }) => {
    const size = useWindowSize();
    const [isOpen, setIsOpen] = React.useState(size.outerWidth > 767);

    React.useEffect(() => {
        if (size.outerWidth > 767 && !isOpen) {
            setIsOpen(true);
        } else if (size.outerWidth < 768 && isOpen) {
            setIsOpen(false);
        }
    }, [size.outerWidth]);

    const handleClick = () => {
        setIsOpen(prev => !prev);
    };
    return (
        <div className={cn()}>
            <PageHeader onClick={handleClick} />
            <div className={cn('side-bar', { open: isOpen })}>
                <SideBar />
            </div>
            <div className={cn('sep', { open: isOpen })} />
            <div className={cn('content', { open: isOpen })}>
                <div className={cn('content-inner')}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout;
