package com.kopo.hanaGatherBackend.core.exception;

import com.kopo.hanaGatherBackend.email.exception.*;
import com.kopo.hanaGatherBackend.security.dto.ErrorDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Date;

@RestControllerAdvice
public class CoreCustomExceptionHandler {

    @ExceptionHandler({AlreadyAcceptInvitationException.class})
    protected ResponseEntity<ErrorDto> handleAlreadyAcceptInvitationException(AlreadyAcceptInvitationException ex) {
        return new ResponseEntity<>(new ErrorDto(new Date(), 400, "C01", "already accepted invitation"), HttpStatus.BAD_REQUEST);
    }

}
