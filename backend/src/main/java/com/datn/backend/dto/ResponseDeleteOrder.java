package com.datn.backend.dto;

import lombok.Data;

@Data
public class ResponseDeleteOrder {

    private final boolean status;
    private final String message;
}
