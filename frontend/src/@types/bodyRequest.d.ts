interface ILogin {
    email: string;
    password: string;
}

interface IRegister {
    image: string;
    name: string;
    email: string;
    password: string;
}

interface IPost {
    restaurantId: string;
    userId: string;
    title: string;
    compliment: string;
    need_improve: string;
    ratings: {
        space: number;
        food: number;
        hygiene: number;
        service: number;
        price: number;
    };
    is_recommend: boolean;
    total: {
        people: number;
        bill: number;
    };
    images: string[];
    hashtags: string[];
}
