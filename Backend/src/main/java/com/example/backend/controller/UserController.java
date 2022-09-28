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
        if(user.getFirstName().length() > 30){
            return ResponseEntity.internalServerError().body(ErrorMessage.FIRSTNAME_SIZE_LIMIT_ERROR_MESSAGE);
        }else if(user.getLastName().length() > 30){
            return ResponseEntity.internalServerError().body(ErrorMessage.LASTNAME_SIZE_LIMIT_ERROR_MESSAGE);
        }
        else if(!user.getFirstName().matches("^[\\p{L} .'-]+$")){
            return ResponseEntity.internalServerError().body("first name should only contain letters");
        }else if(!user.getLastName().matches("^[\\p{L} .'-]+$")){
            return ResponseEntity.internalServerError().body("last name should only contain letters");
        }else if(!user.getEmail().matches("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$")){
            return ResponseEntity.internalServerError().body("invalid email format.");
        }else{
            userService.updateUser(user);
            return ResponseEntity.ok(user);
        }
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