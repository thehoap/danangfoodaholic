import { InputNumber as AntInputNumber, InputNumberProps } from 'antd';
import FormGroup from 'components/FormGroup';

interface IInputNumber extends InputNumberProps {
    label?: string;
}

const InputNumber = ({ label, ...props }: IInputNumber) => {
    return (
        <FormGroup label={label}>
            <AntInputNumber {...props} />
        </FormGroup>
    );
};

export default InputNumber;
