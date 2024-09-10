import { sub } from 'date-fns';
import { Filter } from '../types';
import { defineDays } from './define.days';

export const buildDateFilter = (
  filter?: Filter,
  startAt?: string,
  endAt?: string
) => {
  if (!filter && !startAt && !endAt) return undefined;

  if (filter) {
    return {
      gte: sub(new Date(), { days: defineDays(filter) }),
    };
  }

  let date: any = {};
  if (startAt) {
    date.gte = new Date(startAt);
  }
  if (endAt) {
    date.lte = new Date(endAt);
  }
  return date;
};
