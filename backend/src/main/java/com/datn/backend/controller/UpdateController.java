package com.datn.backend.controller;

import com.datn.backend.dto.*;
import com.datn.backend.entity.Order;
import com.datn.backend.service.UpdateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/update")
@CrossOrigin({"http://localhost:4200","*"})
public class UpdateController {
    private UpdateService updateService;

    @Autowired
    public UpdateController(UpdateService updateService){
        this.updateService=updateService;
    }

    @PostMapping("/updatePurchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase){
        PurchaseResponse purchaseResponse=updateService.placeOrder(purchase);
        return purchaseResponse;
    }

    @PostMapping("/deleteOrderDish")
    public DeleteOrderDishResponse deleteDishInOrder(@RequestBody Purchase purchase){
         DeleteOrderDishResponse deleteOrderDishResponse=updateService.deleteOrderDish(purchase);
         return deleteOrderDishResponse;

    }

    @PostMapping("/endOrder")
    public EndOrderResponse endOrdering(@RequestBody Purchase purchase){
        EndOrderResponse endOrderResponse =updateService.endOrder(purchase);
        return endOrderResponse;
    }

    @PostMapping("/changeName/{id}")
    public ChangeNameResponse changeName(@PathVariable("id") Long id , @RequestBody NameWantToChange nameWantToChange){

            ChangeNameResponse orderAfterChangeName=updateService.changeName(id,nameWantToChange);
            return orderAfterChangeName;
    }

    @PostMapping("/doneOrderForPayByCash/{id}")
    public ResponseEntity<?> doneOrderForPayByCash(@PathVariable("id") Long id, @RequestBody Order order){
        try {
            Order orderAfterDoneForPayment = updateService.doneOrderForPayByCash(id, order);
            return new ResponseEntity<>(orderAfterDoneForPayment, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Internal Server Error");
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/checkQR/{id}")
    public ResponseCheck checkForTransaction(@PathVariable("id") Long id,@RequestBody GetQR getQR){
        ResponseCheck responseCheck=updateService.checkQr(id,getQR);
        return responseCheck;
    }

    @PostMapping("/createOrder")
    public Order createOrder(@RequestBody CreateOrder createOrder){
        Order order=updateService.createOrder(createOrder);
        return order;
    };

    @DeleteMapping("/deleteOrder/{id}")
    public ResponseDeleteOrder deleteOrder(@PathVariable("id") Long id){
        ResponseDeleteOrder responseDeleteOrder=updateService.deleteOrder(id);
        return responseDeleteOrder;
    }







}

