package com.example.backend.entity;

import com.example.backend.constant.ErrorMessage;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.time.*;
import java.util.*;

@Data
@Entity
@Table(name = "comments")
public class Comment extends IdBaseEntity{
    @NotEmpty(message = ErrorMessage.COMMENT_IS_REQUIRED_ERROR_MESSAGE)
    @Size(max=1000, message = ErrorMessage.COMMENT_SIZE_LIMIT_ERROR_MESSAGE)
    private String content;
    //@Temporal(TemporalType.TIMESTAMP)
    private Date createDate;
    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;
}