import { Image } from 'antd';
import { useState } from 'react';

interface IImagesPreview {
    width: number;
    images: string[];
}

const ImagesPreview = ({ width, images }: IImagesPreview) => {
    return (
        <Image.PreviewGroup>
            {images.map((image, index) => (
                <Image
                    src={image}
                    key={image}
                    width={width}
                    hidden={index > 4}
                />
            ))}
        </Image.PreviewGroup>
    );
};

export default ImagesPreview;
