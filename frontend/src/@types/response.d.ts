interface IError {
    status: number;
    data: {
        meta: {
            success: boolean;
            message: string;
        };
        data: {};
    };
}
interface IResponseFormat<T> {
    meta: {
        success: boolean;
        message?: string;
    };
    data: T;
}

interface IPagination<T> {
    docs: T[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}

interface ILoginResponse {
    email: string;
    id: string;
    name: string;
    token: string;
}

interface IRegisterResponse {
    image: string;
    email: string;
    id: string;
    name: string;
    token: string;
}

interface IProfileResponse {
    email: string;
    id: string;
    name: string;
    image: string;
}

interface IRestaurant {
    _id: string;
    link: string;
    image: string;
    name: string;
    type: string;
    address: string;
    id: string;
    districtId: number;
    wardId: number;
    menuId: string;
    time: string;
    priceRange: string;
}

interface IMenu {
    currentPrice: string;
    id: string;
    image: string;
    name: string;
    originalPrice: string;
    _id: string;
}

interface IRestaurantDetail extends IRestaurant {
    menu: IMenu[];
}
