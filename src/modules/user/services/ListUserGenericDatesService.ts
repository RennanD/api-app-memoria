import { getRepository } from 'typeorm';

import UserGenericDate from '../models/UserGenericDate';

interface Request {
  user_id: string;
  month: number;
}

interface Events extends UserGenericDate {
  monthDay: number;
  type: string;
}

interface Response {
  monthDay: number;
  events: Events[];
}

class ListUserGenericDatesService {
  public async execute({
    user_id,
    month,
  }: Request): Promise<Response[] | undefined> {
    const userGenericDateRepository = getRepository(UserGenericDate);

    const userGenericDates = await userGenericDateRepository.find({
      where: {
        user_id,
      },
    });

    const queryDates = userGenericDates
      .filter(importantDate => importantDate.date.getMonth() + 1 === month)
      .map(queryDate => ({
        monthDay: queryDate.date.getDate(),
        type: 'user-generic-date',
        ...queryDate,
      }));

    const reducedDates = queryDates.filter(
      (selectItem, index, array) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        array.map(mapItem => mapItem.monthDay).indexOf(selectItem.monthDay) ===
        index,
    );

    const finalDates = reducedDates.map(reducedDate => {
      const dayMap = queryDates.filter(queryDate => {
        if (queryDate.monthDay === reducedDate.monthDay) {
          return queryDate;
        }

        return null;
      });

      return {
        monthDay: reducedDate.monthDay,
        events: [...dayMap],
      };
    });

    return finalDates;
  }
}

export default ListUserGenericDatesService;
