import { Filter } from '../types';

export const defineDays = (filter: Filter) => {
  if (filter === Filter.PastWeek) return 7;
  if (filter === Filter.PastMonth) return 30;
  if (filter === Filter.Past3Months) return 90;
};
