type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

interface ICommonParams {
    page: number;
    limit: number;
    sortBy?: string;
    sortDirection?: 'asc' | 'desc' | '';
}

interface IOption {
    id: Key;
    value: Key;
    label: Key;
}

interface ICoordinates {
    lat: number;
    long: number;
}

interface ITrendingResponse {
    restaurants: IRestaurant[];
    posts: IPost[];
    hashtags: string[];
}

type MessageType = 'success' | 'error' | 'warning' | '';
type MessageTitle = 'Success' | 'Error' | 'Warning' | '';
interface IMessage {
    title: MessageTitle;
    content: string;
    type: MessageType;
}
