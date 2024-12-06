package com.datn.backend.dto;


import lombok.Data;


public class SingUpDto {
    private String userName;

    private String userPassword;

    private boolean isActive;

    private String role;

    public SingUpDto(String userName, String userPassword,boolean isActive, String role) {
        this.userName = userName;
        this.userPassword = userPassword;
        this.role = role;
        this.isActive=isActive;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
