import { PATH } from 'constants/path';
import { ReactComponent as LogoImage } from 'assets/images/logo.svg';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
    const navigate = useNavigate();

    return (
        <div className="logo" onClick={() => navigate(PATH.HOME.path)}>
            <LogoImage />
            <span className="logo-name">Da Nang Foodaholic</span>
        </div>
    );
};

export default Logo;
