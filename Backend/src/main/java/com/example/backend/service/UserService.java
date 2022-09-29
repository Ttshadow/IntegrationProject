package com.example.backend.service;

import com.example.backend.entity.*;
import com.example.backend.entity.pojo.AuthCredentialsRequest;
import com.example.backend.exception.*;
import com.example.backend.repository.AuthorityRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
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
        }else {
            User userFromDb = userRepo.getReferenceById(editUser.getId());
            userFromDb.setFirstName(editUser.getFirstName());
            userFromDb.setLastName(editUser.getLastName());
            userFromDb.setTel(editUser.getTel());
            userFromDb.setEmail(editUser.getEmail());
            //userFromDb.setPassword(passwordEncoder.encode(editUser.getPassword()));
            userFromDb.setImage(editUser.getImage());
            userRepo.save(userFromDb);
        }
    }
    public User getUserById(Long id) throws RecordNotFoundException{
        Optional<User> user = userRepo.findById(id);
        if(user.isPresent()){
            return user.get();
        }
        throw new RecordNotFoundException("User not found.");
    }

    public void updateUserPass(User updateUser) throws RecordNotFoundException{
        if(updateUser.getId() ==null){
            throw new RecordNotFoundException("User does not exist!");
        }else{
            User userFromDb = userRepo.getReferenceById(updateUser.getId());
            userFromDb.setPassword(passwordEncoder.encode(updateUser.getPassword()));
            userRepo.save(userFromDb);
        }
    }

    public List<User> getAllUsers(){
        return userRepo.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }
}