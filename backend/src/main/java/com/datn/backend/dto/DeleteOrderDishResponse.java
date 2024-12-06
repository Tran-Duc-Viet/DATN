package com.datn.backend.dto;

import lombok.Data;

@Data
public class DeleteOrderDishResponse {
    private final boolean status;
    private final String message;
}
