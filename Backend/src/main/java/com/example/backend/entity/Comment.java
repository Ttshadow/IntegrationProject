package com.example.backend.entity;

import com.example.backend.constant.ErrorMessage;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Data
@Entity
@Table(name = "comments")
public class Comment extends IdBaseEntity{
    @NotEmpty(message = ErrorMessage.COMMENT_IS_REQUIRED_ERROR_MESSAGE)
    private String content;
    @ManyToOne(fetch = FetchType.LAZY,optional = false)
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;
}