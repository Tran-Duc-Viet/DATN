package com.datn.backend.dto;

import lombok.Data;

@Data
public class ChangeNameResponse {
    private final boolean status;
    private final String message;
}
