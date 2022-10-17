import React from 'react';
import { GridColumn } from '@megafon/ui-core';

type GridColumnPropsType = React.ComponentProps<typeof GridColumn>;
type GridColumnConfigType = Pick<GridColumnPropsType, 'all' | 'wide' | 'desktop' | 'tablet' | 'mobile'>;

export const getColumnConfig = (isFullWidth: boolean): GridColumnConfigType =>
    isFullWidth ? { all: '12' } : { wide: '8', desktop: '10', tablet: '12', mobile: '12' };
