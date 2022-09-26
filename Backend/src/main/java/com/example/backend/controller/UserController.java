package com.example.backend.controller;

import com.example.backend.entity.*;
import com.example.backend.entity.pojo.*;
import com.example.backend.exception.*;
import com.example.backend.service.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/admindashboard/filter")
    public List<User> getUserByName(@RequestParam("keyword") String keyword){
        List<User> foundUsers;
        if(keyword != null){
            foundUsers = userService.getUserByName(keyword);
        }else{
            foundUsers = userService.getAllUsers();
        }
        return foundUsers;
    }
}