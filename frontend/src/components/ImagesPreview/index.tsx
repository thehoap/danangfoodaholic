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

export const ImagesPreview1 = ({ width, images }: IImagesPreview) => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <Image
                preview={{ visible: false }}
                width={width}
                src={images[0]}
                onClick={() => setVisible(true)}
            />
            <div style={{ display: 'none' }}>
                <Image.PreviewGroup
                    preview={{
                        visible,
                        onVisibleChange: (vis) => setVisible(vis),
                    }}
                >
                    {images.map((image) => (
                        <Image src={image} alt="" />
                    ))}
                </Image.PreviewGroup>
            </div>
        </>
    );
};

export default ImagesPreview;
