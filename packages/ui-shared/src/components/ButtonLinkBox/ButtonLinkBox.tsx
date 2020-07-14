import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cnCreate, Button, TextLink } from '@megafon/ui-core';
import './ButtonLinkBox.less';

export interface IButtonLinkBoxProps {
    className?: string;
    buttonTitle?: string;
    buttonUrl?: string;
    buttonColor?: 'green' | 'purple';
    linkTitle?: string;
    linkUrl?: string;
    hAlign?: 'center';
}

const cn = cnCreate('mfui-button-link-box');
const ButtonLinkBox: React.FC<IButtonLinkBoxProps> = ({
    buttonTitle,
    buttonUrl,
    buttonColor = 'green',
    linkTitle,
    linkUrl,
    hAlign,
    className,
}) => (
    <div className={cn({ 'h-align': hAlign }, className)}>
        {buttonTitle && (
            <div className={cn('row')}>
                <Button
                    href={buttonUrl}
                    passiveColor={buttonColor}
                    hoverColor={buttonColor}
                >
                    {buttonTitle}
                </Button>
            </div>
        )}
        {linkTitle && (
            <div className={cn('row')}>
                <TextLink href={linkUrl} underlineVisibility="always">
                    {linkTitle}
                </TextLink>
            </div>
        )}
    </div>
);

ButtonLinkBox.propTypes = {
    className: PropTypes.string,
    buttonTitle: PropTypes.string,
    buttonUrl: PropTypes.string,
    buttonColor: PropTypes.oneOf(['green', 'purple']),
    linkTitle: PropTypes.string,
    linkUrl: PropTypes.string,
    hAlign: PropTypes.oneOf(['center']),
};

ButtonLinkBox.defaultProps = {
    buttonColor: 'green',
};

export default ButtonLinkBox;
