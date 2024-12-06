package com.datn.backend.dto;

import com.datn.backend.entity.Order;
import com.datn.backend.entity.OrderDish;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {
    private Order order;
    private Set<OrderDish> orderDishes;

}
