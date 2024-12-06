package com.datn.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigDecimal;
import java.util.Date;

public class OrderDishInfor {
    private Long id;
    private String nameOfDish;
    private String imageUrl;
    private int quantity;
    private BigDecimal unitPrice;
    private Long dishId;
    private String status;
    private String notice;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss")
    private Date timeOrder;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss")
    private Date lastUpdated;
    private String tableNum;

    public OrderDishInfor(Long id, String nameOfDish, String imageUrl, int quantity, BigDecimal unitPrice, Long dishId, String status, String notice, Date timeOrder, Date lastUpdated, String tableNum) {
        this.id = id;
        this.nameOfDish = nameOfDish;
        this.imageUrl = imageUrl;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.dishId = dishId;
        this.status = status;
        this.notice = notice;
        this.timeOrder = timeOrder;
        this.lastUpdated = lastUpdated;
        this.tableNum = tableNum;
    }

    public Long getId() {
        return id;
    }

    public String getNameOfDish() {
        return nameOfDish;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public int getQuantity() {
        return quantity;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public Long getDishId() {
        return dishId;
    }

    public String getStatus() {
        return status;
    }

    public String getNotice() {
        return notice;
    }

    public Date getTimeOrder() {
        return timeOrder;
    }

    public Date getLastUpdated() {
        return lastUpdated;
    }

    public String getTableNum() {
        return tableNum;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNameOfDish(String nameOfDish) {
        this.nameOfDish = nameOfDish;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public void setDishId(Long dishId) {
        this.dishId = dishId;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setNotice(String notice) {
        this.notice = notice;
    }

    public void setTimeOrder(Date timeOrder) {
        this.timeOrder = timeOrder;
    }

    public void setLastUpdated(Date lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public void setTableNum(String tableNum) {
        this.tableNum = tableNum;
    }
}
