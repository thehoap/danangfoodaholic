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
                <img src={post?.user.image} alt="" />
                <span>
                    <Rate value={1} disabled count={1} />
                    {post?.ratings.average || 3}
                </span>
            </div>
            <div className="information">
                <p>
                    {post?.content ||
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem maiores labore soluta aut, corporis itaque vero quae culpa facilis? Cumque assumenda odio nemo quae blanditiis dolore cum aperiam eaque harum'}
                </p>
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
