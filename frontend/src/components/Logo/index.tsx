import { PATH } from 'constants/path';
import { ReactComponent as LogoImage } from 'assets/images/logo.svg';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks';

const Logo = () => {
    const navigate = useNavigate();
    const { role } = useAppSelector((state) => state.profile);

    return (
        <div
            className="logo"
            onClick={() =>
                role === 'USER'
                    ? navigate(PATH.HOME.path)
                    : navigate(PATH.MANAGE_USERS.path)
            }
        >
            <LogoImage />
            <span className="logo-name">Da Nang Foodaholic</span>
        </div>
    );
};

export default Logo;
