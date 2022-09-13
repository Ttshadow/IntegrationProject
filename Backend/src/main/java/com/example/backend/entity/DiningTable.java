package com.example.backend.entity;

import lombok.Data;

import javax.persistence.Entity;

@Data
@Entity
@javax.persistence.Table(name = "dining_tables")
public class DiningTable extends IdBaseEntity{
    private Integer capacity;
    private String status;
    private String name;
}
