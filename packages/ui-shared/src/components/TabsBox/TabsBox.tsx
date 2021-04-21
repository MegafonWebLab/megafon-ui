import * as React from 'react';
import { cnCreate, Tabs } from '@megafon/ui-core';

type TabsPropsType = React.ComponentProps<typeof Tabs> & {
    /** Ссылка на корневой элемент */
    rootRef?: React.Ref<HTMLDivElement>;
};

const cn = cnCreate('mfui-beta-tabs-box');
const TabsBox: React.FC<TabsPropsType> = props => (
    <div ref={props.rootRef} className={cn()}>
        <Tabs {...props} />
    </div>
);

export default TabsBox;
