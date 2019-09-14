// TODO: extract mutual types to separate repo as duplication/not synced with kube-ts-server
import BaseItem from './BaseItem';

export default interface Category extends BaseItem {
  readonly title: string;
  readonly slug: string;
}
