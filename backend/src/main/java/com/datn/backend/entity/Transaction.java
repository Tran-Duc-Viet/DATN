package com.datn.backend.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Transaction {
    @JsonProperty("Mã GD")
    private long transactionId;

    @JsonProperty("Mô tả")
    private String description;

    @JsonProperty("Giá trị")
    private double amount;

    @JsonProperty("Ngày diễn ra")
    private String dateOccurred;

    @JsonProperty("Số tài khoản")
    private String accountNumber;

    // getters and setters
    public long getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(long transactionId) {
        this.transactionId = transactionId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getDateOccurred() {
        return dateOccurred;
    }

    public void setDateOccurred(String dateOccurred) {
        this.dateOccurred = dateOccurred;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }
}
