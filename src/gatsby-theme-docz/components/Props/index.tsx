/* eslint-disable react/no-multi-comp */
import React from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import './Props.less';

interface IPropProps {
    propName: string;
    prop: {
        required?: boolean;
        defaultValue?: {
            value: string | number | boolean | Record<string, string>;
        };
        type: {
            name: string;
        };
        flowType?: {
            name: string;
        };
        description?: string;
    };
}

interface IPropsProps {
    props: Record<string, IPropProps['prop']>;
}

export const getDefaultValue = ({ defaultValue, type, flowType }: IPropProps['prop']): string | number | null => {
    if (!defaultValue || (!defaultValue.value && defaultValue.value !== 0 && typeof defaultValue.value !== 'boolean')) {
        return null;
    }

    if (defaultValue.value === "''") {
        return '[Empty string]';
    }

    if (typeof defaultValue.value === 'boolean') {
        return `${defaultValue.value}`;
    }

    const propType = flowType || type;
    if (propType && propType.name === 'string' && typeof defaultValue.value === 'string') {
        return defaultValue.value.replace(/'/g, '"');
    }

    if (typeof defaultValue.value === 'object' && defaultValue.value.toString) {
        return defaultValue.value.toString();
    }

    return defaultValue.value as string;
};

const cn = cnCreate('docz-props');
export const Prop: React.FC<IPropProps> = ({ propName, prop }) => {
    if (!prop.type && !prop.flowType) return null;

    const type = prop.type.name
        .replace(/ \| undefined/g, '')
        .replace(/</g, '&#60;')
        .replace(/\|/g, '<br>| ')
        .replace(/"/g, "'")
        .replace(/([;])(?=[^;]*$)/, '');

    return (
        <tr className={cn('row')}>
            <td className={cn('cell', { name: true })}>
                {propName}
                {prop.required && '*'}
            </td>
            <td className={cn('cell')} dangerouslySetInnerHTML={{ __html: type }} />
            <td className={cn('cell')}>
                {prop.defaultValue && (
                    <div data-testid="prop-default-value">
                        <em>{getDefaultValue(prop)}</em>
                    </div>
                )}
            </td>
            <td className={cn('cell')}>{prop.description}</td>
        </tr>
    );
};

export const Props: React.FC<IPropsProps> = ({ props }) => {
    const entries = Object.entries<IPropProps['prop']>(props)
        .sort(([, propA], [, propB]) => Number(!!propB.required) - Number(!!propA.required))
        .sort(
            ([, propA], [, propB]) =>
                Number(propA.type.name.search('=>') !== -1) - Number(propB.type.name.search('=>') !== -1),
        );

    return (
        <div className={cn()}>
            <table className={cn('table')}>
                <thead>
                    <tr className={cn('row')}>
                        <td className={cn('cell', { title: true, first: true })}>Prop name</td>
                        <td className={cn('cell', { title: true, second: true })}>Type</td>
                        <td className={cn('cell', { title: true, third: true })}>Default</td>
                        <td className={cn('cell', { title: true, fourth: true })}>Description</td>
                    </tr>
                </thead>
                <tbody>
                    {entries.map(([key, prop]) => (
                        <Prop key={key} propName={key} prop={prop} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Props;
