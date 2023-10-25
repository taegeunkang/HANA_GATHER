package com.kopo.hanaGatherBackend.user.exception;


import com.kopo.hanaGatherBackend.security.dto.ErrorDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Date;

@RestControllerAdvice
public class UserExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    protected ResponseEntity<ErrorDto> handleUserNotFoundException(UserNotFoundException ex ) {
        return new ResponseEntity<>(new ErrorDto(new Date(), 400, "U01", "user not found"), HttpStatus.NOT_FOUND);
    }


    @ExceptionHandler(PasswordNotCorrectException.class)
    protected ResponseEntity<ErrorDto> handlePasswordNotCorrectException(PasswordNotCorrectException ex ) {
        return new ResponseEntity<>(new ErrorDto(new Date(), 400, "U02", "password not correct"), HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(TokenNotMatchException.class)
    protected ResponseEntity<ErrorDto> handleTokenNotMatchException(TokenNotMatchException ex ) {
        return new ResponseEntity<>(new ErrorDto(new Date(), 400, "U04", "tokens not match"), HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(InvalidDataException.class)
    protected ResponseEntity<ErrorDto> handleInvalidDataException( InvalidDataException ex) {
        return new ResponseEntity<>(new ErrorDto(new Date(), 400, "U05", "id, password required"), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserExistsException.class)
    protected ResponseEntity<ErrorDto> handleUserExistsException( UserExistsException ex) {
        return new ResponseEntity<>(new ErrorDto(new Date(), 400, "U06", "user exists"), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NicknameExistsException.class)
    protected ResponseEntity<ErrorDto> handleNicknameExistsException( NicknameExistsException ex) {
        return new ResponseEntity<>(new ErrorDto(new Date(), 400, "U07", "nickname exists"), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EmailAndTokenNotMatchException.class)
    protected ResponseEntity<ErrorDto> handleEmailAndTokenNotMatchException( EmailAndTokenNotMatchException ex) {
        return new ResponseEntity<>(new ErrorDto(new Date(), 400, "U10", "email not match with token"), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ConnectionErrorException.class)
    protected ResponseEntity<ErrorDto> handleConnectionErrorException(ConnectionErrorException ex) {
        return new ResponseEntity<>(new ErrorDto(new Date(), 500, "U11", "error occured connectiong with provider"), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(SocialRegisteredException.class)
    protected ResponseEntity<ErrorDto> handleSocialRegisteredException( SocialRegisteredException ex) {
        return new ResponseEntity<>(new ErrorDto(new Date(), 400, "U12", "registered by social auth"), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NonceEmptyException.class)
    protected ResponseEntity<ErrorDto> handleNonceEmptyException( NonceEmptyException ex) {
        return new ResponseEntity<>(new ErrorDto(new Date(), 400, "U13", "nonce required"), HttpStatus.BAD_REQUEST);
    }





}
