import dayjs from 'dayjs';
import { Review } from './types/review';

export const getFormatDate = (date: string, format: string) => dayjs(date).format(format);

export const getSortByDate = (a: Review, b: Review) => {
  const dateA = new Date(a.createAt);
  const dateB = new Date(b.createAt);
  return Number(dateB) - Number (dateA);
};
