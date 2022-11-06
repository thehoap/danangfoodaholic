import { useState, useEffect } from 'react';
import { Dropdown, Menu } from 'antd';

import { useLazyGetProfileQuery } from 'services/profileAPI';
import { StyledHeader } from './styles';
import { ReactComponent as Logo } from 'assets/images/logo.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { PATH } from 'constants/path';
import { ArrowDown } from 'assets/icons';
import { IMAGE } from 'constants/data';
import { useDispatch } from 'react-redux';
import { updateProfile } from 'redux/slices/profileSlice';
import { useAppSelector } from 'redux/hooks';

interface IHeader {
    className: string;
}

const Header = ({ className }: IHeader) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [getProfile, { data: profile, isSuccess, isFetching }] =
        useLazyGetProfileQuery();
    const { image, name, email } = useAppSelector((state) => state.profile);

    useEffect(() => {
        getProfile({});
    }, []);

    useEffect(() => {
        if (isSuccess) {
            const payload = {
                image: profile?.data.image,
                name: profile?.data.name,
                email: profile?.data.email,
            };
            dispatch(updateProfile(payload));
        }
    }, [isFetching]);

    const handleLogout = () => {
        localStorage.clear();
        navigate(PATH.LOGIN.path);
    };

    const navLinks: { path: string; label: string }[] = [
        { path: PATH.HOME.path, label: 'Trang chủ' },
        { path: PATH.RESTAURANTS.path, label: 'Quán ăn' },
        { path: '/favorite', label: 'Yêu thích' },
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
                        key={path}
                        to={path}
                        className={({ isActive }) =>
                            isActive ? 'nav-link active' : 'nav-link'
                        }
                        end
                    >
                        {label}
                    </NavLink>
                ))}
            </nav>
            <Dropdown overlay={menu} trigger={['click']} className="user">
                <div className="user">
                    <img
                        src={image || IMAGE.PLACEHOLDER}
                        alt={name}
                        className="user-image"
                    />
                    <p className="user-name">{name}</p>
                    <ArrowDown />
                </div>
            </Dropdown>
        </StyledHeader>
    );
};

export default Header;
