interface IPost {
    id: string;
    restaurantId: string | IRestaurant;
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
    limit?: number;
    page?: number;
}

interface IComment {
    postId: string;
    user: { id: string; name: string; image: string };
    content: string;
    createdAt?: string;
    updatedAt?: string;
    _id?: string;
}

interface IPostFormInput {
    id: string;
    restaurantId: string;
    user: string;
    content: string;
    ratings_space: number;
    ratings_food: number;
    ratings_hygiene: number;
    ratings_service: number;
    ratings_price: number;
    ratings_average: number;
    is_recommend: true;
    total_people: number;
    total_bill: number;
    images: [];
    hashtags: [];
    comments: [];
    likes: [];
}

interface IPostRequest {
    id: string;
    restaurantId: string | IRestaurant;
    user: string;
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
