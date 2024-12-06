package com.datn.backend.service;

import com.datn.backend.dao.DishRepository;
import com.datn.backend.dao.OrderDishRepository;
import com.datn.backend.dao.OrderRepository;
import com.datn.backend.dto.GetQR;
import com.datn.backend.dto.OrderDishInfor;
import com.datn.backend.dto.ResponseGetQRLinks;
import com.datn.backend.entity.OrderDish;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GetServiceImpl implements GetService{

    private OrderRepository orderRepository;

    private OrderDishRepository orderDishRepository;



    private DishRepository dishRepository;


    @Autowired
    public GetServiceImpl(OrderRepository orderRepository, OrderDishRepository orderDishRepository, DishRepository dishRepository) {
        this.orderRepository = orderRepository;
        this.orderDishRepository = orderDishRepository;
        this.dishRepository = dishRepository;
    }


    @Override
    public List<OrderDishInfor> getAllOrderDishInfor() {
        List<OrderDish> orderDishes=new ArrayList<OrderDish>();

        List<OrderDishInfor> orderDishInfors= new ArrayList<OrderDishInfor>();

        orderDishes.addAll(orderDishRepository.findAll());

        if(orderDishes.isEmpty()){
            return null;
        }

        for (OrderDish orderDish : orderDishes) {
            orderDishInfors.add(new OrderDishInfor(orderDish.getId(),orderDish.getNameOfDish(),orderDish.getImageUrl(),orderDish.getQuantity(),orderDish.getUnitPrice(),orderDish.getDishId(),orderDish.getStatus(),orderDish.getNotice(), orderDish.getTimeOrder(),orderDish.getLastUpdated(),orderDish.getOrder().getTableNum()));
        }

        if (orderDishInfors.isEmpty()){
            return null;
        }

        return orderDishInfors;
    }

    @Override
    public ResponseGetQRLinks getQr(GetQR getQR) {
        String accountName="TRAN DUC VIET";
        String description="Chuyen tien an";
        String bankId="vietinbank";
        String accountNumber="108870483158";
        String template="print";
        String totalmoney=getQR.getTotalMoney().toString().trim();
        String qrDescription=(description.trim()+" "+accountName.trim()).replace(" ","%20");
        String qrAccountName=accountName.trim().replace(" ","%20");
        String quicklinksURL="https://img.vietqr.io/image/"+bankId+"-"+accountNumber+"-"+template+".png?amount="+totalmoney+"&addInfo="+qrDescription+"&accountName="+qrAccountName;

        return new ResponseGetQRLinks(quicklinksURL);
    }

}


