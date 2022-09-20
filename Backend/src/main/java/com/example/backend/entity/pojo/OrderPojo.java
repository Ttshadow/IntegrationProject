package com.example.backend.entity.pojo;

import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Data
public class OrderPojo {
    @NotNull(message = "You must specify dine-in or take-out")
    private Boolean takeout;
    @NotNull(message = "Please specify the order status")
    private String status;
    @NotNull(message = "Please specify the total price")
    private Double totalPrice;

    @NotNull(message = "Please specify the table id")
    @Min(value = 1,message = "The table id must be greater or equal than 1")
    private Long diningTableId;
    @NotNull(message = "Please specify the user id")
    @Min(value = 1,message = "The user id must be greater or equal than 1")
    private Long userId;
    @NotNull(message = "Please specify the promotion id")
    @Min(value = 1,message = "The promotion id must be greater or equal than 1")
    private Long promotionId;
}
