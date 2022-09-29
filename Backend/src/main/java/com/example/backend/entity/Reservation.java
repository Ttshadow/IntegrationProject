package com.example.backend.entity;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "reservations")
public class Reservation extends IdBaseEntity{
    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;
    private Integer numberOfParty;
    private Date startTime;
    private Date endTime;
    private String status;
    @ManyToOne(optional = false)
    @JoinColumn(name = "dining_table_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private DiningTable diningTable;
}
