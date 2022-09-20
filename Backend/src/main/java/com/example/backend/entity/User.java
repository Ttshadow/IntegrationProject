package com.example.backend.entity;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "users")
public class User extends IdBaseEntity{
    private String email;
    private String tel;
    private String firstName;
    private String lastName;
    private String image;
    private String password;
    @ManyToOne(/*fetch = FetchType.LAZY,*/optional = false)
    @JoinColumn(name = "role_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Role role;
}
