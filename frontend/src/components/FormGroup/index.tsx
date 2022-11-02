import { FormItemProps } from 'antd';
import { StyledFormGroup } from './styles';

const FormGroup = ({ label, ...props }: FormItemProps) => {
    return <StyledFormGroup label={label}>{props.children}</StyledFormGroup>;
};

export default FormGroup;
