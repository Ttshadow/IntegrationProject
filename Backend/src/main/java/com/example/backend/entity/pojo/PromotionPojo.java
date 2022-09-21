package com.example.backend.entity.pojo;

import lombok.Data;

@Data
public class PromotionPojo {
    private Double discount;
    private Boolean isValid;
    private String description;
}
