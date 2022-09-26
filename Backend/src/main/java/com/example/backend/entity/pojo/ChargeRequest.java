package com.example.backend.entity.pojo;

import lombok.Data;

@Data
public class ChargeRequest {
    public enum Currency {
        EUR, USD, CAD;
    }
    private String description;
    private int amount;
    private Currency currency;
    private String stripeEmail;
    private String stripeToken;
}
