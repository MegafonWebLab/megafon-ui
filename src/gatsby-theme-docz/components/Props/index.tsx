import React from 'react';
import { cnCreate } from '@megafon/ui-core';
import './Props.less';

export const getDefaultValue = ({ defaultValue, type, flowType }) => {
    const propType = flowType ? flowType : type;
    if (!defaultValue || !defaultValue.value) return null;
    if (defaultValue.value === "''") {
        return '[Empty string]';
    }

    if (propType && propType.name === 'string') {
        return defaultValue.value.replace(/\'/g, '"');
    }

    if (typeof defaultValue.value === 'object' && defaultValue.value.toString) {
        return defaultValue.value.toString();
    }

    return defaultValue.value
}

const cn = cnCreate('docz-props');

export const Prop = ({ propName, prop }) => {
    if (!prop.type && !prop.flowType) return null;

    return (
        <tr className={cn('row')}>
            <td className={cn('cell', { name: true })}>{propName}{prop.required && '*'}</td>
            <td className={cn('cell')}>{prop.type.name.replace(/ \| undefined/g, '')}</td>
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
}

export const Props = ({ props }) => {
    const entries = Object.entries(props);

    return (
        <table className={cn()}>
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
                    <Prop
                        key={key}
                        propName={key}
                        prop={prop}
                    />
                ))}
            </tbody>
        </table>
    )
}

export default Props;
