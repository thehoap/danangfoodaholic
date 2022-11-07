import { ButtonProps as AntButtonProps } from 'antd';
import { StyledButton } from './styles';

interface IButton extends AntButtonProps {}

const Button = ({ children, ...props }: IButton) => {
    return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;
