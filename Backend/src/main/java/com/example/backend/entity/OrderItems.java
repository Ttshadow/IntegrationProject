package com.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Data
@Entity
@Table(name = "order_items")
public class OrderItems extends IdBaseEntity{
    @ManyToOne(optional = false)
    @JoinColumn(name = "order_id")
//    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonBackReference
    private Order order;

    @ManyToOne(optional = false)
    @JoinColumn(name = "menu_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Menu menu;

    private Integer quantity;
}
