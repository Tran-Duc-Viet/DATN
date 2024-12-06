package com.datn.backend.controller;

import com.datn.backend.dto.*;
import com.datn.backend.service.GetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/get")
@CrossOrigin({"http://localhost:4200","*"})
public class GetController {
    private GetService getService;

    @Autowired
    public GetController(GetService getService) {
        this.getService = getService;
    }



    @PostMapping("/getAllOrderDishInfor")
    public List<OrderDishInfor> getAllOrderDishInfors(){
        List<OrderDishInfor> orderDishInfors=getService.getAllOrderDishInfor();
        return orderDishInfors;
    }



    @PostMapping("/getQr")
    public ResponseGetQRLinks getQrLink(@RequestBody GetQR getQR){
        ResponseGetQRLinks responseGetQRLinks=getService.getQr(getQR);
        return responseGetQRLinks;
    }



}
