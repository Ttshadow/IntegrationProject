package com.example.backend.exception;

public class RecordNotFoundException extends Exception{
    public RecordNotFoundException(String message){
        super(message);
    }
}
