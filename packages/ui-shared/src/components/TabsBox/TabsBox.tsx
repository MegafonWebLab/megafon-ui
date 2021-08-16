/* eslint-disable react/jsx-props-no-spreading */
// eslint-disable-next-line import/no-unresolved
import { Tabs } from '@megafon/ui-core';
import { cnCreate } from '@megafon/ui-helpers';
import * as React from 'react';

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
