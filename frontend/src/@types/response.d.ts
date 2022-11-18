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
