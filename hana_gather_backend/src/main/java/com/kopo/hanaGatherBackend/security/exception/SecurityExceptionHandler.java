package com.kopo.hanaGatherBackend.security.exception;

import com.kopo.hanaGatherBackend.security.dto.ErrorDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Date;

@RestControllerAdvice
public class SecurityExceptionHandler {

    @ExceptionHandler(TokenExpiredException.class)
    protected ResponseEntity<ErrorDto> handleTokenExpiredException(TokenExpiredException ex ) {
        return new ResponseEntity<>(new ErrorDto(new Date(), 400, "U08", "tokens expired"), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidTokenException.class)
    protected ResponseEntity<ErrorDto> handleInvalidTokenException(InvalidTokenException ex ) {
        return new ResponseEntity<>(new ErrorDto(new Date(), 400, "U03", "invalid token"), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EmptyTokenException.class)
    protected ResponseEntity<ErrorDto> handleEmptyTokenException(EmptyTokenException ex ) {
        return new ResponseEntity<>(new ErrorDto(new Date(), 400, "U03", "header is empty"), HttpStatus.BAD_REQUEST);
    }
}
