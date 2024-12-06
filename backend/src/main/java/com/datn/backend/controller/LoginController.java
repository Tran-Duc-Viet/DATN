package com.datn.backend.controller;

import com.datn.backend.dao.UserRepository;
import com.datn.backend.dto.LoginRequest;
import com.datn.backend.entity.User;
import com.datn.backend.service.jwt.UserSeviceImpl;
import com.datn.backend.utils.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/login")
@CrossOrigin({"http://localhost:4200","*"})
public class LoginController {
    private final AuthenticationManager authenticationManager;
    private final UserSeviceImpl userService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";

    @Autowired
    public LoginController(AuthenticationManager authenticationManager, UserSeviceImpl userService, JwtUtil jwtUtil, UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @PostMapping
    public void login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) throws IOException, JSONException {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUserName(), loginRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Incorrect Username or password");
        } catch (DisabledException disabledException) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "User is not created");
        }

        final UserDetails userDetails = userService.loadUserByUsername(loginRequest.getUserName());
        Optional<User> optionalUser = userRepository.findFirstByUserNameAndIsActiveTrue(userDetails.getUsername());

        String jwt = jwtUtil.generateToken(userDetails.getUsername());

        if (optionalUser.isPresent()) {
            response.getWriter().write(new JSONObject().put("userId", optionalUser.get().getId()).put("active", optionalUser.get().isActive()).put("role", optionalUser.get().getRole()).toString());
        }

        response.setHeader("Access-Control-Expose-Headers", "Authorization");
        response.setHeader("Access-Control-Allow-Headers", "Authorization, X-Pingother, Origin, X-Requested-With, Content-Type, Accept, X-Custom-header");
        response.setHeader(HEADER_STRING, TOKEN_PREFIX + jwt);
    }
}
