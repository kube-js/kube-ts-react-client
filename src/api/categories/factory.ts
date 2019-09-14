import factory from '@js-items/ky/dist/factory';
import ky, { Options as KyConfig } from 'ky';
import Category from '../../types/items/Category';

export interface Options {
  readonly kyConfig: KyConfig;
}

const categoriesFactory = ({ kyConfig }: Options) =>
  factory<Category>({
    itemName: 'Category',
    itemUrl: 'categories',
    ky: () => Promise.resolve(ky.create(kyConfig)),
  });

export default categoriesFactory;
