package com.example.backend.exception;
public class RecordAlreadyExistsException extends Exception{
    public RecordAlreadyExistsException(String message){
        super(message);
    }
}
