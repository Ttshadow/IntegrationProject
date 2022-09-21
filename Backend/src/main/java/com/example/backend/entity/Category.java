package com.example.backend.entity;

import com.example.backend.constant.ErrorMessage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Entity
@Table(name = "categories")
public class Category extends IdBaseEntity{
    @NotEmpty(message = ErrorMessage.NAME_IS_REQUIRED_ERROR_MESSAGE)
    @Size(max = 30, message = ErrorMessage.NAME_SIZE_LIMIT_ERROR_MESSAGE)
    private String name;
}
