import factory from '@js-items/ky/dist/factory';
import ky, { Options as KyConfig } from 'ky';
import Course from '../../types/items/Course';

export interface Options {
  readonly kyConfig: KyConfig;
}

const coursesCategory = ({ kyConfig }: Options) =>
  factory<Course>({
    itemName: 'Course',
    itemUrl: 'courses',
    ky: () => Promise.resolve(ky.create(kyConfig)),
  });

export default coursesCategory;
