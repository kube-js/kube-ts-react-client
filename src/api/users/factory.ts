import factory from '@js-items/ky/dist/factory';
import ky, { Options as KyConfig } from 'ky';
import User from '../../types/items/User';

export interface Options {
  readonly kyConfig: KyConfig;
}

const usersFactory = ({ kyConfig }: Options) =>
  factory<User>({
    itemName: 'User',
    itemUrl: 'users',
    ky: () => Promise.resolve(ky.create(kyConfig)),
  });

export default usersFactory;
