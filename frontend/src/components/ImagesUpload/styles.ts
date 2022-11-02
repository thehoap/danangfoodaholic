import styled from 'styled-components';

const size = 100;
export const StyledImagesUpload = styled.div`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;

    .image-preview {
        position: relative;

        img {
            display: inline-block;
            width: ${size}px;
            height: ${size}px;
            object-fit: cover;
        }

        &-overlay {
            display: none;
        }

        &:hover .image-preview-overlay {
            display: flex;
            position: absolute;
            inset: 0;
            justify-content: center;
            align-items: center;
            gap: 8px;
            width: ${size}px;
            height: ${size}px;
            background-color: rgba(0, 0, 0, 0.3);

            & svg {
                cursor: pointer;
                path {
                    stroke: #fff;
                }
            }
        }
    }
    .upload {
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        gap: 12px;
        width: ${size}px;
        height: ${size}px;
        background-color: #fafafa;
        color: #333;
        text-align: center;
        border: 1px dashed #000;
        cursor: pointer;

        &:hover {
            border-color: #6cb7fd;
        }

        &-icon {
            font-size: 24px;
        }
        &-text {
        }
    }
`;
