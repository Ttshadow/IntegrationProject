package com.example.backend.repository;

import com.example.backend.entity.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.*;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByUsername(String username);

    @Query(value="select * from users where user_firstName like %:keyword% or user_laseName like %:keyword%", nativeQuery = true)
    List<User> findUsersByKeyword(@Param("keyword") String keyword);
}