package com.example.backend.controller;

import com.example.backend.constant.*;
import com.example.backend.entity.*;
import com.example.backend.exception.*;
import com.example.backend.service.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import javax.validation.*;
import java.io.*;
import java.util.*;

@RestController
public class UserController {
    public final UserService userService;

    public UserController(UserService userService){this.userService = userService;}

    @PutMapping ("/userdashboard/edituser")
    public ResponseEntity updateUser(@RequestBody User user) throws RecordNotFoundException{
        userService.updateUser(user);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/userdashboard/{id}")
    public User findUserById(@PathVariable Long id) throws RecordNotFoundException{
        return userService.getUserById(id);
    }

    @GetMapping("/admindashboard/users")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }
}