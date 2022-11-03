interface IError {
    status: number;
    data: {
        message: string;
        stack: string;
    };
}

interface ILoginResponse {
    email: string;
    id: string;
    name: string;
    token: string;
}
