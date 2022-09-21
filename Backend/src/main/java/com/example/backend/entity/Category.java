package com.example.backend.entity;

import com.example.backend.constant.ErrorMessage;
import lombok.Data;

import javax.persistence.*;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@Entity
@Table(name = "categories")
public class Category extends IdBaseEntity{
    @NotEmpty(message = ErrorMessage.NAME_IS_REQUIRED_ERROR_MESSAGE)
    @Size(max = 30, message = ErrorMessage.NAME_SIZE_LIMIT_ERROR_MESSAGE)
    private String name;
}
