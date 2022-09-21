package com.example.backend.entity;

import com.example.backend.constant.ErrorMessage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Entity
@Table(name = "menus")
public class Menu extends IdBaseEntity{
    @NotEmpty(message = ErrorMessage.NAME_IS_REQUIRED_ERROR_MESSAGE)
    @Size(max = 30, message = ErrorMessage.NAME_SIZE_LIMIT_ERROR_MESSAGE)
    private String name;
    private String description;
    private String image;
    private String status;
    private Double price;
    @ManyToOne(optional = false)
    @JoinColumn(name = "category_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Category category;
}
