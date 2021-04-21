import * as React from 'react';
import { cnCreate, Tabs } from '@megafon/ui-core';

type TabsPropsType = React.ComponentProps<typeof Tabs> & {
    /** Ссылка на корневой элемент */
    rootRef?: React.Ref<HTMLDivElement>;
};

const cn = cnCreate('mfui-beta-tabs-box');
const TabsBox: React.FC<TabsPropsType> = ({ rootRef, ...props }) => (
    <div ref={rootRef} className={cn()}>
        <Tabs {...props} />
    </div>
);

export default TabsBox;
