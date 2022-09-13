package com.example.backend.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Table;
@Data
@Entity
@Table(name = "promotions")
public class Promotion extends IdBaseEntity{
    private String code;
    private String title;
    private String description;
    private Double discount;
    private boolean status;
}
