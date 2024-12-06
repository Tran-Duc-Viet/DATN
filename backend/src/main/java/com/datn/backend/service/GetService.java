package com.datn.backend.service;

import com.datn.backend.dto.GetQR;
import com.datn.backend.dto.OrderDishInfor;
import com.datn.backend.dto.ResponseGetQRLinks;

import java.util.List;

public interface GetService {


    List<OrderDishInfor> getAllOrderDishInfor();

    ResponseGetQRLinks getQr(GetQR getQR);




}
