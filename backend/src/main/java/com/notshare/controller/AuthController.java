package com.notshare.controller;

import com.notshare.dto.UserDTO;
import com.notshare.dto.LoginRequest;
import com.notshare.model.User;
import com.notshare.security.JwtUtils;
import com.notshare.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    // public AuthController(UserService userService) {
    //     this.userService = userService;
    // }

    // REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserDTO userDTO) {

        User savedUser = userService.registerUser(userDTO);

        return ResponseEntity.ok(
                "User registered successfully with ID: " + savedUser.getId()
        );
    }
@GetMapping("/test")
public String securedTest() {
    return "You are authenticated!";
}
private final JwtUtils jwtUtils;

public AuthController(UserService userService, JwtUtils jwtUtils) {
    this.userService = userService;
    this.jwtUtils = jwtUtils;
}

@PostMapping("/login")
public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {

    User user = userService.login(loginRequest);

    String token = jwtUtils.generateToken(user.getEmail());

    return ResponseEntity.ok().body(
            Map.of("token", token)
    );
}
}