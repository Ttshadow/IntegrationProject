package com.example.backend.entity;

import com.example.backend.constant.ErrorMessage;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Data
@Entity
@Table(name = "cart_items")
public class CartItem extends IdBaseEntity{
    @ManyToOne
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @ManyToOne
    @JoinColumn(name = "dining_table_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private DiningTable table;

    private boolean takeout;
    @ManyToOne
    @JoinColumn(name = "menu_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Menu menu;
    //@Size(max = 10, message = ErrorMessage.QUANTITY_SIZE_LIMIT_ERROR_MESSAGE)
    private Integer quantity;
}
