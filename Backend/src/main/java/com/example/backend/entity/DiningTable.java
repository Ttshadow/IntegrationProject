package com.example.backend.entity;

import com.example.backend.constant.ErrorMessage;
import com.sun.istack.NotNull;
import lombok.Data;
import org.hibernate.hql.internal.ast.ErrorReporter;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Data
@Entity
@Table(name = "dining_tables")
public class DiningTable extends IdBaseEntity{
    @NotEmpty(message = ErrorMessage.CAPACITY_IS_REQUIRED_ERROR_MESSAGE)
    @Size(max = 50, min = 1, message = ErrorMessage.CAPACITY_SIZE_LIMIT_ERROR_MESSAGE)
    private Integer capacity;
    @NotEmpty
    private String status;
    @NotEmpty(message = ErrorMessage.NAME_IS_REQUIRED_ERROR_MESSAGE)
    private String name;
}
