package com.datn.backend.service;


import com.datn.backend.dao.UserRepository;
import com.datn.backend.dto.SingUpDto;
import com.datn.backend.entity.User;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService{

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public boolean createUser(SingUpDto singUpDto) {
        if (!checkUserNameStatus(singUpDto.getUserName())){
            return false;
        }
        User user=new User();
        BeanUtils.copyProperties(singUpDto,user);
        //Hash the Password
        String hashPassWord= passwordEncoder.encode(singUpDto.getUserPassword());

        user.setUserPassword(hashPassWord);
        userRepository.save(user);
        return true;

    }

    public boolean checkUserNameStatus(String userName) {
        if (userRepository.existsByUserName(userName)) {
            return !userRepository.existsByUserNameAndIsActiveTrue(userName);
        }
        return true;
    }
}
