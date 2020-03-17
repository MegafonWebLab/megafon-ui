import * as React from 'react';

interface ICheckboxWrapperProps {
    children: (prop: { checked: boolean, onChange: () => void }) => JSX.Element;
}

export const LightColorWrapper: React.FC = ({ children }) => {
    return (
        <div style={{ backgroundColor: '#00b956' }}>
            {children}
        </div>
    );
}

export const CheckboxWrapper: React.FC<ICheckboxWrapperProps> = (props) => {
    const [checked, setChecked] = React.useState<boolean>(false);

    const handleChange = () => {
        setChecked(!checked);
    }

    return (
        <div style={{ padding: '20px 10px 8px 10px' }}>
            {props.children({
                checked,
                onChange: handleChange
            })}
        </div>
    );
}
