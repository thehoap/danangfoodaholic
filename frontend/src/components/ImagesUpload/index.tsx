import { Delete, View } from 'assets/icons';
import { useEffect, useState } from 'react';
import { StyledImagesUpload } from './styles';
import { v4 as uuidv4 } from 'uuid';

const ImagesUpload = () => {
    const [images, setImages] = useState<FileList | null>(null);

    const handlePreviewImages = (e: ChangeEventType<HTMLInputElement>) => {
        setImages((current) => {
            const choosen = e.target.files;
            const addition = {};
            //@ts-ignore
            for (let [key, value] of Object.entries(choosen)) {
                const id = uuidv4();
                //@ts-ignore
                addition[id] = value;
            }
            return current ? { ...current, ...addition } : choosen;
        });
    };

    const handleView = (id: string) => () => {
        console.log(id);
    };

    const handleDelete = (id: string) => () => {
        //@ts-ignore
        setImages((current) => {
            const rest = {};
            //@ts-ignore
            for (let [key, value] of Object.entries(current)) {
                if (key !== id) {
                    const _id = uuidv4();
                    //@ts-ignore
                    rest[_id] = value;
                }
            }
            return rest;
        });
    };

    return (
        <StyledImagesUpload>
            {images && Object.keys(images).length > 0 ? (
                Object.keys(images).map((id) => (
                    <div className="image-preview" key={id}>
                        <img
                            //@ts-ignore
                            src={images[id] && URL.createObjectURL(images[id])}
                        />
                        <div className="image-preview-overlay">
                            <div onClick={handleView(id)}>
                                <View />
                            </div>
                            <div onClick={handleDelete(id)}>
                                <Delete />
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <></>
            )}
            <label htmlFor="upload" className="upload">
                <span className="upload-icon">+</span>
                <span className="upload-text">Tai anh len</span>
            </label>
            <input
                type="file"
                alt=""
                id="upload"
                hidden
                onChange={handlePreviewImages}
                multiple
            />
        </StyledImagesUpload>
    );
};

export default ImagesUpload;
