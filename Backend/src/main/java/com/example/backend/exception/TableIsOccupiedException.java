package com.example.backend.exception;

public class TableIsOccupiedException extends Exception{
    public TableIsOccupiedException(String message){
        super(message);
    }
}