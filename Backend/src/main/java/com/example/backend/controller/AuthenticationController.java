package com.example.backend.controller;

import com.example.backend.entity.User;
import com.example.backend.entity.pojo.AuthCredentialsRequest;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.UserService;
import com.example.backend.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(path = "/user")
public class AuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    public AuthenticationController(AuthenticationManager authenticationManager,
                                    JwtTokenUtil jwtTokenUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody AuthCredentialsRequest request) {
        try {
            Authentication authenticate = authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    request.getUsername(), request.getPassword()
                            )
                    );
            User user = (User) authenticate.getPrincipal();
            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.AUTHORIZATION,
                            jwtTokenUtil.generateToken(user)
                    )
                    .body(user);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthCredentialsRequest request) {
        try {
            User user = userService.addUser(request);
            return ResponseEntity.ok(user);
        } catch (RuntimeException ex) {
            System.out.println(ex.getMessage());
            return new ResponseEntity<>(ex.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestParam String token){
        if(token.trim().length() == 0) return ResponseEntity.ok(false);
        Optional<User> user = userRepository.findByUsername(jwtTokenUtil.getUsernameFromToken(token));
        Boolean isTokenValid = jwtTokenUtil.validateToken(token, user.get());
        return ResponseEntity.ok(isTokenValid);
    }
}

