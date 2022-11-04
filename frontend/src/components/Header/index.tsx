import { useState, useEffect } from 'react';
import { useLazyGetProfileQuery } from 'services/profileAPI';
import { StyledHeader } from './styles';

interface IHeader {
    className: string;
}

const Header = ({ className }: IHeader) => {
    const [getProfile, { data: profile, isFetching }] =
        useLazyGetProfileQuery();

    const [user, setUser] = useState<{
        id: string;
        name: string;
        email: string;
    }>({
        id: '',
        name: '',
        email: '',
    });

    useEffect(() => {
        getProfile({});
    }, []);

    useEffect(() => {
        setUser(profile);
    }, [isFetching]);

    return (
        <StyledHeader className={className}>
            <div className="user">
                <img src="" alt="" className="user-image" />
                <p className="user-name">{user?.name}</p>
            </div>
        </StyledHeader>
    );
};

export default Header;
