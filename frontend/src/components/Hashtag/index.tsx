import { Tag, TagProps } from 'antd';

interface IHashtag extends TagProps {}

const Hashtag = ({ children }: IHashtag) => {
    return <Tag onClick={console.log}>{children}</Tag>;
};

export default Hashtag;
