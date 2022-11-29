interface IPost {
    id: string;
    restaurantId: string;
    user: IUser;
    content: string;
    ratings: {
        space: number;
        food: number;
        hygiene: number;
        service: number;
        price: number;
        average: number;
    };
    is_recommend: boolean;
    total: {
        people: number;
        bill: number;
    };
    images: string[];
    hashtags: string[];
    comments: string | IComment[];
    likes: string[];
    createdAt?: string;
    updatedAt?: string;
}

interface IPostParams extends ICommonParams {
    restaurantId?: string;
    hashtag?: string;
}

interface IComment {
    postId: string;
    user: { id: string; name: string; image: string };
    content: string;
    createdAt?: string;
    updatedAt?: string;
    _id?: string;
}
