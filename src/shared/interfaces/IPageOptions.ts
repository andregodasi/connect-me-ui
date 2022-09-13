import { Order } from '../enums/order.enum';

export class PageOptions {
  order?: Order = Order.ASC;
  page: number = 1;
  take?: number = 10;
}
