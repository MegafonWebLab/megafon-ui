import * as React from 'react';

interface ICheckboxWrapperProps {
    children: (prop: { checked: boolean; onChange: () => void }) => JSX.Element;
}

export const extraContentStyle = { backgroundColor: '#00B956', color: '#FFF', padding: '5px' };

export const CheckboxWrapper: React.FC<ICheckboxWrapperProps> = props => {
    const [checked, setChecked] = React.useState<boolean>(false);

    const handleChange = () => {
        setChecked(!checked);
    };
    const { children } = props;

    return (
        <div style={{ padding: '20px 10px 8px 10px' }}>
            {children({
                checked,
                onChange: handleChange,
            })}
        </div>
    );
};
