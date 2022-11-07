import { NavLink } from 'react-router-dom';
import { PATH } from 'constants/path';
import { ReactComponent as LogoImage } from 'assets/images/logo.svg';

const Logo = () => {
    return (
        <NavLink to={PATH.HOME.path}>
            <div className="logo">
                <LogoImage />
                <span className="logo-name">Đà Nẵng Đây Nè</span>
            </div>
        </NavLink>
    );
};

export default Logo;
