import dayjs from 'dayjs';

export const timestampToDate = (dateFormat: string, timestamp?: string) => {
    if (timestamp) {
        const dateObj = new Date();
        const date = dayjs(dateObj).format(dateFormat);
        return date;
    }
    return;
};
