import { Input as AntInput, InputProps, Typography } from 'antd';
import FormGroup from 'components/FormGroup';

const { Text } = Typography;

interface IInput extends InputProps {
    label?: string;
    name: string;
    formik: any;
}

const Input = ({ label, name, formik, ...props }: IInput) => {
    return (
        <FormGroup label={label}>
            <AntInput name={name} {...props} />
            {formik.errors[name] && formik.touched[name] && (
                <Text type="danger">{formik.errors[name]}</Text>
            )}
        </FormGroup>
    );
};

export default Input;
