import * as React from 'react';
import Tabs from '../Tabs';

export const DemoContent = ({ children }) => (
    <div
        style={{
            padding: '0 0 20px 0',
        }}
    >
        <div
            style={{
                padding: '80px 0',
                background: '#F6F6F6',
                fontSize: '20px',
                textAlign: 'center',
            }}
        >
            {children}
        </div>
    </div>
);

export const OuterObserveContainer = ({ height = '200px', children }) => {
    const rootRef = React.useRef<HTMLDivElement>(null);
    const [observeContainer, setObserveContainer] = React.useState<HTMLDivElement | null>(null);

    React.useEffect(() => {
        setObserveContainer(rootRef.current);
    }, []);

    return (
        <div ref={rootRef}>
            <Tabs sticky outerObserveContainer={observeContainer}>
                {children}
            </Tabs>
            <div style={{ width: '100%', height, background: '#F6F6F6' }} />
        </div>
    );
};

export const increaseSizeComponent = () => {
    const tabs = document.querySelector('.oversize-height') as HTMLDivElement;
    const actualHeight = tabs?.style.height;
    const oversizeHeight = '1500px';

    if (actualHeight === oversizeHeight) {
        tabs.style.height = 'auto';
        tabs.style.border = 'unset';
        tabs.style.marginBottom = '0';
    } else {
        tabs.style.height = oversizeHeight;
        tabs.style.border = '1px solid gray';
        tabs.style.marginBottom = '20px';
    }

    window.dispatchEvent(new Event('resize'));
};
