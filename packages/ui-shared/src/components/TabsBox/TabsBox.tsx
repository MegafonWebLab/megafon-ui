import * as React from 'react';
import { Tabs } from '@megafon/ui-core';
import { cnCreate } from '@megafon/ui-helpers';

type TabsPropsType = React.ComponentProps<typeof Tabs> & {
    /** Ссылка на корневой элемент */
    rootRef?: React.Ref<HTMLDivElement>;
};

const cn = cnCreate('mfui-tabs-box');
const TabsBox: React.FC<TabsPropsType> = ({ rootRef, ...props }) => (
    <div ref={rootRef} className={cn()}>
        <Tabs {...props} />
    </div>
);

export default TabsBox;
