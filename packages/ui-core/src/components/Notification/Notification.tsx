import React from 'react';
import * as PropTypes from 'prop-types';
import './Notification.less';
import Paragraph from 'components/Paragraph/Paragraph';
import cnCreate from 'utils/cnCreate';
import AttentionIcon from 'icons/System/24/Info_24.svg';
import AttentionInvertIcon from 'icons/System/24/Info_invert_24.svg';
import CheckedIcon from 'icons/System/24/Checked_24.svg';

export enum Types {
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
}

export type Props = {
    /** Types of notification */
    type?: Types;
    /** Short size of notification */
    isShort?: boolean;
};

const cn = cnCreate('mfui-beta-notification');
const Notification: React.FC<Props> = ({ type = Types.SUCCESS, isShort = false, children }) => {
    const renderIcon = (): JSX.Element => {
        if (type === Types.SUCCESS) {
            return <CheckedIcon className={cn('icon')} />;
        }

        return isShort
        ? <AttentionInvertIcon className={cn('icon')} />
        : <AttentionIcon className={cn('icon')} />;
    };

    return (
        <div
            className={cn({
                type,
                short: isShort,
            })}
        >
            <div className={cn('container')}>
                {renderIcon()}
                <Paragraph
                    className={cn('text')}
                    hasMargin={false}
                >
                    {children}
                </Paragraph>
            </div>
        </div>
    );
};

Notification.propTypes = {
    type: PropTypes.oneOf(Object.values(Types)),
    isShort: PropTypes.bool,
};

export default Notification;
