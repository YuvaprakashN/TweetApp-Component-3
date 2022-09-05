package com.tweetapp.customException;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import lombok.extern.slf4j.Slf4j;

@ControllerAdvice
@RestController
@Slf4j
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {



    @ExceptionHandler(UserException.class)
    public final ResponseEntity<ExceptionResponse> handleUserNotFoundException(UserException ex, WebRequest request) {
    	log.warn("User Exception: "+ex.getMessage());
        ExceptionResponse e = new ExceptionResponse(new Date(), ex.getMessage(), request.getDescription(false),
                HttpStatus.NOT_FOUND.value());
        return new ResponseEntity<>(e, HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(InvalidCredentialsException.class)
    public final ResponseEntity<ExceptionResponse> handleInvalidCredentialsException(InvalidCredentialsException ex, WebRequest request) {
    	log.warn("Invalid Credentials Exception: "+ex.getMessage());
        ExceptionResponse e = new ExceptionResponse(new Date(), ex.getMessage(), request.getDescription(false),
                HttpStatus.NOT_FOUND.value());
        return new ResponseEntity<>(e, HttpStatus.UNAUTHORIZED);
    }
}
