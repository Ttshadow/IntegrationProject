package com.example.backend.constant;

public class ErrorMessage {
    //Dining Table:
    public static final String NAME_IS_REQUIRED_ERROR_MESSAGE = "Please enter a name.";
    public static final String CAPACITY_SIZE_LIMIT_ERROR_MESSAGE = "Please enter a valid number. It should be between 1-50";
    public static final String CAPACITY_IS_REQUIRED_ERROR_MESSAGE = "Please enter a capacity.";
    //Category/Menu:
    public static final String NAME_SIZE_LIMIT_ERROR_MESSAGE = "Please enter a valid name. It should be less than 30 characters.";
    //Comment:
    public static final String COMMENT_IS_REQUIRED_ERROR_MESSAGE = "Comment should not be empty.";
    public static final String COMMENT_SIZE_LIMIT_ERROR_MESSAGE = "Comment should be less than 1000 characters.";
    //CartItem:
    public static final String QUANTITY_SIZE_LIMIT_ERROR_MESSAGE = "Maximum 10 items can be added.";
    //Menu:
    //User:
    public static final String FIRSTNAME_SIZE_LIMIT_ERROR_MESSAGE = "First name should be less than 30 characters.";
    public static final String LASTNAME_SIZE_LIMIT_ERROR_MESSAGE = "Last name should be less than 30 characters.";

}