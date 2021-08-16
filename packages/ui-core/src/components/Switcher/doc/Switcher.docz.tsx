import * as React from 'react';

interface ISwitcherWrapperProps {
    children: (switcherProps: { checked: boolean; onChange: () => void }) => JSX.Element;
}

export const SwitcherWrapper: React.FC<ISwitcherWrapperProps> = props => {
    const [checked, setChecked] = React.useState<boolean>(false);

    const handleChange = () => {
        setChecked(!checked);
    };

    const { children } = props;

    return (
        <div style={{ padding: '20px 15px' }}>
            {children({
                checked,
                onChange: handleChange,
            })}
        </div>
    );
};

export default SwitcherWrapper;
