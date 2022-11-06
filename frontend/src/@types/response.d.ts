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

interface ILoginResponse {
    email: string;
    id: string;
    name: string;
    token: string;
}

interface IProfileResponse {
    email: 'pthpthpth0210@gmail.com';
    id: '8c5c9a7a-359a-43ad-b79d-8fa9e7ac612b';
    name: 'phan the hoa';
}
