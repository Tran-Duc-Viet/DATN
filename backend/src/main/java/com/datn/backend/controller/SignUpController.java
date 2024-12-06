package com.datn.backend.controller;

import com.datn.backend.dto.SingUpDto;
import com.datn.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/signUp")
@CrossOrigin({"http://localhost:4200","*"})
public class SignUpController {

    private final AuthService authService;

    @Autowired
    public SignUpController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping
    public ResponseEntity<String> signUp(@RequestBody SingUpDto singUpDto){
        boolean isUserCreated=authService.createUser(singUpDto);

        if(isUserCreated){
            return new  ResponseEntity<>("success",HttpStatus.OK);

        }else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to create user");
        }

    }
}
