import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isBetween from 'dayjs/plugin/isBetween';

export const timestampToDate = (dateFormat: string, timestamp?: string) => {
    if (timestamp) {
        dayjs.extend(relativeTime);
        const dateObj = new Date(timestamp);
        const date = dayjs(dateObj).fromNow();
        return date;
    }
    return;
};

const convertToMinutues = (time: string) => {
    const [hours, minutes] = time.split(':');
    return Number(hours) * 60 + Number(minutes);
};

export const checkTimeBetween = (timeNow: string, duration?: string) => {
    let isOnline: boolean = false;
    const openDurations = duration?.split('|');
    openDurations?.forEach((openDuration) => {
        const [open, close] = openDuration?.split(' - ') || '00:00 - 00:00';
        if (
            convertToMinutues(timeNow) > convertToMinutues(open) &&
            convertToMinutues(timeNow) < convertToMinutues(close)
        )
            isOnline = true;
    });
    return isOnline;
};
