type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

interface ICommonParams {
    page: number;
    limit: number;
    sortBy?: string;
    sortDirection?: 'asc' | 'desc' | '';
}

interface IRestaurantFilter {
    districtId: number | undefined;
    type: string | undefined;
    searchTerm: string | undefined;
}

interface IOption {
    id: Key;
    value: Key;
    label: Key;
}
