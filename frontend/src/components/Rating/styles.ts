import styled from 'styled-components';

export const StyledRating = styled.div`
    .ant-form-item {
        &-row {
            flex-direction: row;
            align-items: center;
            gap: 12px;
        }

        &-label {
            text-align: right;
            width: 100px;
            padding: 6px 0 0;
        }

        &-control {
            width: fit-content !important;
        }
    }
`;
