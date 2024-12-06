export interface OrderDish {
  id: number;
  nameOfDish: string;
  imageUrl: string;
  quantity: number;
  unitPrice: number;
  dishId: number;
  status: string;
  notice: string;
  timeOrder: string;
  lastUpdated: string;
  _links: {
    self: { href: string };
    orderDish: { href: string };
    order: { href: string };
  };
}
