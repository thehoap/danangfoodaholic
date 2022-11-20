import { StyledProfile } from './styles';

interface IProfile {
    image: string;
    title: any;
    description?: string;
}

const Profile = ({ image, title, description }: IProfile) => {
    return (
        <StyledProfile className="profile">
            <img src={image} alt="" className="profile-image" />
            <div className="profile-information">
                <h3 className="profile-title">{title}</h3>
                <p className="profile-description">{description}</p>
            </div>
        </StyledProfile>
    );
};

export default Profile;
