import { getRepository } from 'typeorm';

import GenericDate from '../../admin/models/GenericDate';

interface Request {
  month: number;
}

interface Events extends GenericDate {
  monthDay: number;
  type: string;
}

interface Response {
  monthDay: number;
  events: Events[];
}

class ListGenericDatesService {
  public async execute({ month }: Request): Promise<Response[] | undefined> {
    const genericDateRepository = getRepository(GenericDate);

    const genericDates = await genericDateRepository.find();

    const queryDates = genericDates
      .filter(importantDate => importantDate.date.getMonth() + 1 === month)
      .map(queryDate => ({
        monthDay: queryDate.date.getDate(),
        type: 'generic-date',
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

export default ListGenericDatesService;
