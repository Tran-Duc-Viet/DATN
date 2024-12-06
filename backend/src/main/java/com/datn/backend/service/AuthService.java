package com.datn.backend.service;

import com.datn.backend.dto.SingUpDto;

public interface AuthService {

    boolean createUser(SingUpDto singUpDto);
}
