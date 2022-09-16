package com.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
public class Order extends IdBaseEntity{
    private boolean takeout;

    @ManyToOne(optional = false)
    @JoinColumn(name = "dining_table_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private DiningTable diningTable;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    private String status;

    @ManyToOne(optional = false)
    @JoinColumn(name = "promotion_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Promotion promotion;

    private Double totalPrice;

    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL,mappedBy = "order")
    @JsonManagedReference
    private List<OrderItems> orderItemsList;

}
