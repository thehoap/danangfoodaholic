import { Tag, TagProps } from 'antd';
import { stringToColour } from 'utils/color';

interface IHashtag extends TagProps {}

const Hashtag = ({ children }: IHashtag) => {
    return <Tag color={stringToColour(String(children))}>{children}</Tag>;
};

export default Hashtag;
