import Button from 'components/Button';
import { PATH } from 'constants/path';
import { useNavigate } from 'react-router-dom';
import { StyledError } from './styles';

const Error = () => {
    const navigate = useNavigate();
    return (
        <StyledError>
            <Button type="primary" onClick={() => navigate(PATH.HOME.path)}>
                Go Home
            </Button>
        </StyledError>
    );
};

export default Error;
