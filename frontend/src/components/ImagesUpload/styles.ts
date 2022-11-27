import styled from 'styled-components';

const size = 112;
export const StyledImagesUpload = styled.div`
    display: flex;
    gap: 8px;
    width: 100%;
    overflow-x: auto;
    padding: 0 8px;

    .image-preview {
        position: relative;

        img {
            display: inline-block;
            width: ${size}px;
            height: ${size}px;
            object-fit: cover;
            user-select: none;
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
        display: flex;
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
        user-select: none;

        &:hover {
            border-color: #6cb7fd;
        }

        &-icon {
            font-size: 24px;
            width: ${size}px;
        }
    }
`;
