import { Image } from 'antd';
import { useState } from 'react';

interface IImagesPreview {
    image: string;
    images: string[];
}

const ImagesPreview = ({ image, images }: IImagesPreview) => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <Image
                preview={{ visible: false }}
                width={150}
                src={image}
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
                        <Image src={image} key={image} />
                    ))}
                </Image.PreviewGroup>
            </div>
        </>
    );
};

export default ImagesPreview;
