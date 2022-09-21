package com.example.backend.entity.pojo;

import com.example.backend.entity.OrderItems;
import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
public class OrderPojo {
    @NotNull(message = "You must specify dine-in or take-out")
    private Boolean takeout;
    @NotNull(message = "Please specify the order status")
    private String status;
    @NotNull(message = "Please specify the user id")
    @Min(value = 1,message = "The user id must be greater or equal than 1")
    private Long userId;
    private List<OrderItems> orderItemsList;

    private Double totalPrice;
    private Long diningTableId;
    private Long promotionId;
}
