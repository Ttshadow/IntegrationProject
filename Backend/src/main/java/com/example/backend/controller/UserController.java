package com.example.backend.controller;

import com.example.backend.entity.*;
import com.example.backend.entity.pojo.*;
import com.example.backend.exception.*;
import com.example.backend.service.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    public final UserService userService;

    public UserController(UserService userService){this.userService = userService;}

    @PostMapping("/userdashboard/edituser")
    public ResponseEntity updateUser(@RequestBody User user) throws RecordNotFoundException{
        userService.updateUser(user);
        return ResponseEntity.ok(user);
    }
}