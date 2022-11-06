import { useState, useEffect } from 'react';
import { Dropdown, Menu } from 'antd';

import { useLazyGetProfileQuery } from 'services/profileAPI';
import { StyledHeader } from './styles';
import { ReactComponent as Logo } from 'assets/images/logo.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { PATH } from 'constants/path';
import { ArrowDown } from 'assets/icons';
import { IMAGE } from 'constants/data';

interface IHeader {
    className: string;
}

const Header = ({ className }: IHeader) => {
    const navigate = useNavigate();

    const [getProfile, { data: profile, isFetching }] =
        useLazyGetProfileQuery();

    const [user, setUser] = useState<{
        id: string;
        name: string;
        email: string;
    }>();

    useEffect(() => {
        getProfile({});
    }, []);

    useEffect(() => {
        setUser(profile?.data);
    }, [isFetching]);

    const handleLogout = () => {
        localStorage.clear();
        navigate(PATH.LOGIN.path);
    };

    const navLinks: { path: string; label: string }[] = [
        { path: PATH.HOME.path, label: 'Trang chủ' },
        { path: '/restaurants', label: 'Quán ăn' },
        { path: '/favorites', label: 'Yêu thích' },
    ];

    const menu = (
        <Menu
            items={[
                {
                    label: <NavLink to={PATH.HOME.path}>Trang cá nhân</NavLink>,
                    key: 'profile',
                },
                {
                    label: <p onClick={handleLogout}>Đăng xuất</p>,
                    key: 'logout',
                },
            ]}
        />
    );

    return (
        <StyledHeader className={className}>
            <NavLink to={PATH.HOME.path}>
                <div className="logo">
                    <Logo />
                    <span className="logo-name">Đà Nẵng Đây Nè</span>
                </div>
            </NavLink>
            <nav className="nav">
                {navLinks.map(({ path, label }) => (
                    <NavLink
                        key={label}
                        to={path}
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        {label}
                    </NavLink>
                ))}
            </nav>
            <Dropdown overlay={menu} trigger={['click']} className="user">
                <div className="user">
                    <img
                        src={
                            'https://cdn.dribbble.com/users/808435/screenshots/14859668/media/8b47f6d091f152e2ec212afe8df87296.png?compress=1&resize=400x300&vertical=top' ||
                            IMAGE.PLACEHOLDER
                        }
                        alt=""
                        className="user-image"
                    />
                    <p className="user-name">{user?.name}</p>
                    <ArrowDown />
                </div>
            </Dropdown>
        </StyledHeader>
    );
};

export default Header;
