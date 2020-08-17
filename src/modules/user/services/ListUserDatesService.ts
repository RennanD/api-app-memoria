import { getRepository } from 'typeorm';

import ImportantDate from '../models/ImportantDate';

interface Request {
  user_id: string;
  month: number;
}

interface Events extends ImportantDate {
  monthDay: number;
}

interface Response {
  monthDay: number;
  events: Events[];
}

class ListUserDatesService {
  public async execute({
    user_id,
    month,
  }: Request): Promise<Response[] | undefined> {
    const dateRepository = getRepository(ImportantDate);

    const dates = await dateRepository.find({
      where: {
        user_id,
        deleted_at: null,
      },
    });

    const queryDates = dates
      .filter(importantDate => importantDate.date.getMonth() + 1 === month)
      .map(queryDate => ({
        monthDay: queryDate.date.getDate(),
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

export default ListUserDatesService;
