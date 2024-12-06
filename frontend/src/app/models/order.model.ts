export interface Order {
  id: number;
  tableNum: string;
  orderTrackingNumber: string;
  totalQuantity: number;
  totalPrice: number;
  status: string;
  payByCash: boolean;
  customerPay:number;
  returnMoney:number;
  timeCreated: string;
  lastUpdated: string;
  orderDone: boolean;
  _links: {
    self: {
      href: string;
    };
    order: {
      href: string;
    };
    orderDishes: {
      href: string;
    };
    user:{
      href:string;
    }
  };
}
