package com.datn.backend.dto;

import lombok.Data;

@Data
public class EndOrderResponse {
    private final boolean status;
    private final String message;
}
