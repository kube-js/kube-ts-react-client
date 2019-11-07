// TODO: extract mutual types to separate repo as duplication/not synced with kube-ts-server
import BaseItem from './BaseItem';

export default interface Section extends BaseItem {
  readonly courseId: string;
  readonly order: number;
  readonly title: string;
  readonly isPublished?: boolean;
  // TODO: replace it with Unit model
  readonly units: any[];
}
