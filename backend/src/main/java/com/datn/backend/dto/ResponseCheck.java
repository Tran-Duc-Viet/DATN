package com.datn.backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class ResponseCheck {
    private final boolean status;
    private final String message;

}
