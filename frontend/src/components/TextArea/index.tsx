import { Input as AntInput, Typography } from 'antd';
import { TextAreaProps } from 'antd/lib/input';
import FormGroup from 'components/FormGroup';

const { TextArea: AntTextArea } = AntInput;
const { Text } = Typography;

interface ITextArea extends TextAreaProps {
    label: string;
    name: string;
    formik: any;
}

const TextArea = ({ label, name, formik, ...props }: ITextArea) => {
    return (
        <FormGroup label={label}>
            <AntTextArea {...props} draggable={false} />
            {formik.errors[name] && formik.touched[name] && (
                <Text type="danger">{formik.errors[name]}</Text>
            )}
        </FormGroup>
    );
};

export default TextArea;
