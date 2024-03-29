import Button from 'components/Button';
import FormGroup from 'components/FormGroup';
import { IMAGE } from 'constants/data';
import { useRef, useState } from 'react';
import { StyledImageUpload } from './styles';

interface IImageUpload {
    label: string;
    setImages: SetStateType<FormData | undefined>;
    imageUrl?: string;
}

const ImageUpload = ({ label, setImages, imageUrl }: IImageUpload) => {
    const [image, setImage] = useState<File | null>(null);
    const uploadRef = useRef<HTMLLabelElement | null>(null);
    const formdata = new FormData();

    const handlePreviewImages = (e: ChangeEventType<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
            formdata.append('images', e.target.files[0]);
            setImages(formdata);
        }
    };

    const handleChooseImage = () => {
        if (uploadRef && uploadRef.current) {
            uploadRef.current.click();
        }
    };

    return (
        <StyledImageUpload>
            <FormGroup label={label}>
                <img
                    src={
                        image
                            ? image && URL.createObjectURL(image)
                            : imageUrl
                            ? imageUrl
                            : IMAGE.PLACEHOLDER
                    }
                    width={100}
                    onClick={handleChooseImage}
                />
                <label
                    htmlFor="upload"
                    className="upload"
                    ref={uploadRef}
                    hidden
                ></label>
                <input
                    type="file"
                    alt=""
                    id="upload"
                    hidden
                    onChange={handlePreviewImages}
                />
            </FormGroup>
        </StyledImageUpload>
    );
};

export default ImageUpload;
