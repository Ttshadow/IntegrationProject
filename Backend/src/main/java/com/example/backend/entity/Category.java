package com.example.backend.entity;

import lombok.Data;

import javax.persistence.*;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "categories")
public class Category extends IdBaseEntity{
    private String name;
}
