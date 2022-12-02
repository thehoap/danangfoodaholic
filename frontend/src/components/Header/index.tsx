import { useState, useEffect, useRef } from 'react';
import { Dropdown, Menu } from 'antd';

import { useLazyGetProfileQuery } from 'services/profileAPI';
import { StyledHeader } from './styles';
import { NavLink, useNavigate } from 'react-router-dom';
import { PATH } from 'constants/path';
import { ArrowDown, Logout, User } from 'assets/icons';
import { IMAGE } from 'constants/data';
import { useDispatch } from 'react-redux';
import { updateProfile } from 'redux/slices/profileSlice';
import { useAppSelector } from 'redux/hooks';
import Logo from 'components/Logo';

interface IHeader {
    className: string;
}

const Header = ({ className }: IHeader) => {
    const dispatch = useDispatch();
    const { userId } = useAppSelector((state) => state.profile);

    const [getProfile, { data: profile, isSuccess, isFetching }] =
        useLazyGetProfileQuery();
    const { image, name, email } = useAppSelector((state) => state.profile);
    const userRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        getProfile({});
    }, []);

    useEffect(() => {
        if (isSuccess) {
            const payload = {
                image: profile?.data?.image,
                name: profile?.data?.name,
                email: profile?.data?.email,
                userId: profile?.data?.id,
            };
            dispatch(updateProfile(payload));
        }
    }, [isFetching]);

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    };

    const navLinks: { path: string; label: string }[] = [
        { path: PATH.HOME.path, label: 'Home' },
        { path: PATH.RESTAURANTS.path, label: 'Restaurants' },
        { path: PATH.POSTS.path, label: 'Posts' },
    ];

    const menu = (
        <Menu
            items={[
                {
                    label: (
                        <NavLink to={PATH.PROFILE.path.replace(':id', userId)}>
                            <User />
                            <span>My profile</span>
                        </NavLink>
                    ),
                    key: 'profile',
                },
                {
                    label: (
                        <p onClick={handleLogout}>
                            <Logout />
                            <span>Log out</span>
                        </p>
                    ),
                    key: 'logout',
                },
            ]}
        />
    );

    return (
        <StyledHeader className={className}>
            <Logo />
            <nav className="nav">
                {navLinks.map(({ path, label }) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) =>
                            isActive ? 'nav-link active' : 'nav-link'
                        }
                        end={path === PATH.HOME.path ? true : false}
                    >
                        {label}
                    </NavLink>
                ))}
            </nav>
            <div className="user" ref={userRef}>
                <img
                    src={image || IMAGE.PLACEHOLDER}
                    alt={name}
                    className="user-image"
                />
                <p className="user-name">{name}</p>
                <Dropdown
                    overlay={menu}
                    trigger={['click']}
                    getPopupContainer={() => userRef.current as HTMLElement}
                    className="user-dropdown"
                >
                    <div className="user-arrow">
                        <ArrowDown />
                    </div>
                </Dropdown>
            </div>
        </StyledHeader>
    );
};

export default Header;
