package com.datn.backend.service.jwt;

import com.datn.backend.dao.UserRepository;
import com.datn.backend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Optional;

@Service
public class UserSeviceImpl  implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserSeviceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        User user = userRepository.findByUserNameAndIsActiveTrue(userName).orElseThrow(() -> new UsernameNotFoundException("User not found with userName: "+ userName));
        return new org.springframework.security.core.userdetails.User(user.getUserName(),user.getUserPassword(), new ArrayList<>());
    }

    public String getUserRole(String userName){
        User user=userRepository.findByUserNameAndIsActiveTrue(userName).get();
        return user.getRole();
    }

}
