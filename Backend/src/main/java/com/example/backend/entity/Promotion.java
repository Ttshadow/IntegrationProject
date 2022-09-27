package com.example.backend.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Table;
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "promotions")
public class Promotion extends IdBaseEntity{
    private String code;
    private String title;
    private String description;
    private Double discount;
    private boolean status;

    public Promotion(String code, String title, String description, Double discount, boolean status) {
        this.code = code;
        this.title = title;
        this.description = description;
        this.discount = discount;
        this.status = status;
    }
}
