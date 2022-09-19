package com.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "reservations")
public class Reservation extends IdBaseEntity{
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY,optional = false)
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;
    private Integer numberOfParty;
    private Date startTime;
    private Date endTime;
    private String status;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY,optional = false)
    @JoinColumn(name = "dining_table_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private DiningTable diningTable;
}
