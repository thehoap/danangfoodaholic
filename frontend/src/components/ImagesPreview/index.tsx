import { Image } from 'antd';
import { useState } from 'react';

interface IPreviewImages {
    image: string;
    images: string[];
}

const PreviewImages = ({ image, images }: IPreviewImages) => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <Image
                preview={{ visible: false }}
                width={200}
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

export default PreviewImages;
