import * as React from 'react';

interface ISwitcherWrapperProps {
    children: (switcherProps: { checked: boolean; onChange: () => void }) => JSX.Element;
}

export const SwitcherWrapper: React.FC<ISwitcherWrapperProps> = props => {
    const [checked, setChecked] = React.useState<boolean>(false);

    const handleChange = () => {
        setChecked(!checked);
    };

    return (
        <div style={{ padding: '20px 15px', maxWidth: '30%' }}>
            {props.children({
                checked,
                onChange: handleChange,
            })}
        </div>
    );
};
