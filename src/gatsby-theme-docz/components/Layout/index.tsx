import React from 'react';
import { cnCreate } from '@megafon/ui-core';
import { useWindowSize } from 'docz'
import './Layout.less';
import SideBar from '../SideBar';
import PageHeader from '../PageHeader';

const cn = cnCreate('docz-layout');
const Layout: React.FC = ({ children }) => {
    const size = useWindowSize();
    const [isOpen, setIsOpen] = React.useState(size.innerWidth > 767);

    React.useEffect(() => {
        if (size.innerWidth > 767 && !isOpen) {
            setIsOpen(true);
        } else if (size.innerWidth < 768 && isOpen) {
            setIsOpen(false);
        }
    }, [size.innerWidth]);

    const handleClick = () => {
        setIsOpen(prev => !prev);
    };

    const handleClickOut = () => {
        setIsOpen(false);
    };

    return (
        <div className={cn()}>
            <PageHeader onClick={handleClick} isOpen={isOpen}/>
            <div className={cn('side-bar', { open: isOpen })}>
                <SideBar />
            </div>
            <div className={cn('sep', { open: isOpen })} />
            {isOpen && <div className={cn('open-bg')} onClick={handleClickOut} />}
            <div className={cn('content')}>
                <div className={cn('content-inner')}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout;
