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

interface IUser {
    _id: string;
    id: string;
    email: string;
    password: string;
    name: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}
