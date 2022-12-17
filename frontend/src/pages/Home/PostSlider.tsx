import { Rate } from 'antd';
import { Comment, Heart } from 'assets/icons';
import { StyledPostSlider } from './styles';

interface IPostSlider {
    post: IPost;
}

const PostSlider = ({ post }: IPostSlider) => {
    return (
        <StyledPostSlider>
            <div className="image-wrapper">
                <img src={post?.user?.image} alt="" />
                <span>
                    <Rate value={1} disabled count={1} />
                    {post?.ratings?.average}
                </span>
            </div>
            <div className="information">
                <p dangerouslySetInnerHTML={{ __html: post?.content }} />
                <div>
                    <span>
                        <Heart />
                        {post?.likes?.length}
                    </span>
                    <span>
                        <Comment />
                        {post?.comments?.length}
                    </span>
                </div>
            </div>
        </StyledPostSlider>
    );
};

export default PostSlider;
