package com.example.backend.entity.pojo;

import lombok.Data;

@Data
public class PaymentRequest {

    private Long amount;
    private String id;
    private String currency;
}
