import dayjs from 'dayjs';

export const getFormatDate = (date: string, format: string) => dayjs(date).format(format);

