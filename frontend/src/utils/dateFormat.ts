import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export const timestampToDate = (dateFormat: string, timestamp?: string) => {
    if (timestamp) {
        dayjs.extend(relativeTime);
        const dateObj = new Date(timestamp);
        const date = dayjs(dateObj).fromNow();
        return date;
    }
    return;
};
