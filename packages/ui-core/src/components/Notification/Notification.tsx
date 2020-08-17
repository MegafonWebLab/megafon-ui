import React from 'react';
import * as PropTypes from 'prop-types';
import './Notification.less';
import Paragraph from 'components/Paragraph/Paragraph';
import cnCreate from 'utils/cnCreate';
import AttentionIcon from 'icons/System/24/Info_24.svg';
import AttentionInvertIcon from 'icons/System/24/Info_invert_24.svg';
import CheckedIcon from 'icons/System/24/Checked_24.svg';

export type Props = {
    /** Types of notification */
    type?: 'success' | 'error' | 'warning';
    /** Short size of notification */
    isShort?: boolean;
    children: React.ReactNode;
};

const cn = cnCreate('mfui-notification');
const Notification: React.FC<Props> = ({ type, isShort, children }) => {
    function renderIcon(): JSX.Element {
        if (type !== 'success' && isShort) {
            return <AttentionInvertIcon className={cn('icon')} />;
        }
        if (type !== 'success' && !isShort) {
            return <AttentionIcon className={cn('icon')} />;
        }

        return <CheckedIcon className={cn('icon')} />;
    }

    return (
        <div
            className={cn('', {
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
    type: PropTypes.oneOf(['success', 'error', 'warning']),
    isShort: PropTypes.bool,
    children: PropTypes.node,
};

export default Notification;
