import React from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import './Tabs.less';

const TextMap = ['Примеры и код', 'Свойства и методы', 'Правила использования'];
const cn = cnCreate('docz-tabs');

export const DoczTabs: React.FC = ({ children }) => {
    const isList = Array.isArray(children);
    const tabs = React.useMemo(
        () => (Array.isArray(children) ? [...children].slice(0, TextMap.length) : []),
        [children],
    );
    const tabsRef = React.useRef<number[]>([]);
    const [state, setState] = React.useState({ underlineWidth: 0, underlineTransform: 0 });

    const setTabRef = React.useCallback(n => {
        if (n) {
            tabsRef.current.push(n.node.clientWidth);
        }
    }, []);

    const handleSelect = React.useCallback((index: number) => {
        const underlineTransform = [...tabsRef.current].splice(0, index).reduce((a, b) => a + b, 0);
        setState({ underlineWidth: tabsRef.current[index], underlineTransform });
    }, []);

    React.useEffect(() => {
        if (!isList) {
            // eslint-disable-next-line no-console
            console.error('DoczTabs: children must be array of components');
        }
    }, [isList]);

    React.useEffect(() => {
        if (tabsRef.current[0]) {
            setState({ underlineWidth: tabsRef.current[0], underlineTransform: 0 });
        }
    }, []);

    return (
        <Tabs className={cn()} onSelect={handleSelect}>
            <TabList className={cn('tab-list')}>
                {tabs.map((_, i) => (
                    <Tab key={TextMap[i]} ref={setTabRef} className={cn('tab')}>
                        {TextMap[i]}
                    </Tab>
                ))}
                <div className={cn('underline')}>
                    <div
                        className={cn('underline-swipe')}
                        style={{
                            width: `${state.underlineWidth}px`,
                            transform: `translateX(${state.underlineTransform}px)`,
                        }}
                    />
                </div>
            </TabList>
            {tabs.map((tab, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <TabPanel key={i}>{tab}</TabPanel>
            ))}
        </Tabs>
    );
};

export default DoczTabs;
