package com.datn.backend.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class TransactionResponse {
    @JsonProperty("data")
    private List<Transaction> data;

    @JsonProperty("error")
    private boolean error;

    // getters and setters
    public List<Transaction> getData() {
        return data;
    }

    public void setData(List<Transaction> data) {
        this.data = data;
    }

    public boolean isError() {
        return error;
    }

    public void setError(boolean error) {
        this.error = error;
    }

}
