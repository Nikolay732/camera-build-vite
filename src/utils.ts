import dayjs from 'dayjs';
import { Review } from './types/review';
import 'dayjs/locale/ru';

export const getFormatDate = (date: string, format: string) => dayjs(date).locale('ru').format(format);

export const getSortByDate = (a: Review, b: Review) => {
  const dateA = new Date(a.createAt);
  const dateB = new Date(b.createAt);
  return Number(dateB) - Number (dateA);
};
