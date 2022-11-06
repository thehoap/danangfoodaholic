type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

interface ICommonParams {
    page: number;
    limit: number;
    sortBy?: string;
    sortDirection?: 'asc' | 'desc' | '';
}
