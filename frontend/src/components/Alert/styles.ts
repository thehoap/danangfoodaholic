import styled from 'styled-components';

interface IStyledAlert {
    type: MessageType;
}

export const ALERT_COLOR = {
    '': '',
    success: '#52c41a',
    error: '#ff4d4f',
    warning: '#faad14',
};

export const StyledAlert = styled.div<IStyledAlert>`
    .ant-notification {
        top: 92px !important;

        &-notice-success {
            color: ${ALERT_COLOR.success};
        }

        &-notice-error {
            color: ${ALERT_COLOR.error};
        }

        &-notice-warning {
            color: ${ALERT_COLOR.warning};
        }

        &-notice-message {
            font-weight: 500;
            color: currentColor;
        }

        &-notice-description {
            color: initial;
        }

        &-close-icon svg {
            width: initial;
            height: initial;
        }
    }
`;
