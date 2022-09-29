package com.example.backend.entity;

import com.example.backend.constant.ErrorMessage;
import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;

@Data
@Entity
@Table(name = "dining_tables")
public class DiningTable extends IdBaseEntity{
    @Max(value = 50, message = ErrorMessage.CAPACITY_SIZE_LIMIT_ERROR_MESSAGE)
    @Min(value = 1, message = ErrorMessage.CAPACITY_SIZE_LIMIT_ERROR_MESSAGE)
    private Integer capacity;
    @NotEmpty
    private String status;
    @NotEmpty(message = ErrorMessage.NAME_IS_REQUIRED_ERROR_MESSAGE)
    private String name;
}
