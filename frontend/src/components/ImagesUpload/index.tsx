import { Delete, View } from 'assets/icons';
import { useEffect, useState } from 'react';
import { StyledImagesUpload } from './styles';
import { v4 as uuidv4 } from 'uuid';

interface IImagesUpload {
    setImages: SetStateType<FormData | undefined>;
}

const ImagesUpload = ({ setImages }: IImagesUpload) => {
    const [previewImages, setPreviewImages] = useState<FileList | null>(null);
    const formdata = new FormData();

    const handlePreviewImages = (e: ChangeEventType<HTMLInputElement>) => {
        setPreviewImages((current) => {
            const choosen = e.target.files;
            const addition = {};
            //@ts-ignore
            for (let [key, value] of Object.entries(choosen)) {
                const id = uuidv4();
                //@ts-ignore
                addition[id] = value;
            }
            const result = current ? { ...current, ...addition } : choosen;

            //@ts-ignore
            Object.keys(result).forEach((id) => {
                //@ts-ignore
                formdata.append('images', result[id]);
                setImages(formdata);
            });

            return result;
        });
    };

    const handleView = (id: string) => () => {
        console.log(id);
    };

    const handleDelete = (id: string) => () => {
        //@ts-ignore
        setPreviewImages((current) => {
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
            {previewImages && Object.keys(previewImages).length > 0 ? (
                Object.keys(previewImages).map((id) => (
                    <div className="image-preview" key={id}>
                        <img
                            src={
                                //@ts-ignore
                                previewImages[id] &&
                                //@ts-ignore
                                URL.createObjectURL(previewImages[id])
                            }
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
                <span className="upload-text">Tải ảnh lên</span>
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
