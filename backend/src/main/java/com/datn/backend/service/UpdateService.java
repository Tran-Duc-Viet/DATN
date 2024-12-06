package com.datn.backend.service;

import com.datn.backend.dto.*;
import com.datn.backend.entity.Order;

public interface UpdateService {
    PurchaseResponse placeOrder(Purchase purchase);
    DeleteOrderDishResponse deleteOrderDish(Purchase purchase);

    ChangeNameResponse changeName(Long id,NameWantToChange nameWantToChange);

    EndOrderResponse endOrder(Purchase purchase);

    Order doneOrderForPayByCash(Long id,Order order);

    ResponseCheck checkQr(Long id, GetQR getQR);

    Order createOrder(CreateOrder createOrder);

    ResponseDeleteOrder deleteOrder(Long id);




//    List<BankInfo> getBankInfo();
}
