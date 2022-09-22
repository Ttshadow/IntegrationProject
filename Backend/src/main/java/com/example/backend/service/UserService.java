package com.example.backend.service;

import com.example.backend.entity.User;
import com.example.backend.entity.pojo.AuthCredentialsRequest;
import com.example.backend.exception.*;
import com.example.backend.repository.AuthorityRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private AuthorityRepository authorityRepo;

    public User addUser(AuthCredentialsRequest request){
        Optional<User> userFromDB = userRepo.findByUsername(request.getUsername());
        if(userFromDB.isPresent()){
            throw new RuntimeException("User already exists, please choose another username");
        }
        User newUser = new User();
        newUser.setUsername(request.getUsername());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setAuthority(authorityRepo.findByAuthority("ROLE_USER").get());
        userRepo.save(newUser);
        return newUser;
    }

    public void updateUser (User editUser) throws RecordNotFoundException {
        if(editUser.getId() ==null){
            throw new RecordNotFoundException("User does not exist!");
        }else{
            User userFromDb = userRepo.getReferenceById(editUser.getId());
            userFromDb.setFirstName(editUser.getFirstName());
            userFromDb.setLastName(editUser.getLastName());
            userFromDb.setTel(editUser.getTel());
            userFromDb.setEmail(editUser.getEmail());
            userFromDb.setImage(editUser.getImage());
            userRepo.save(userFromDb);
        }

    }
}