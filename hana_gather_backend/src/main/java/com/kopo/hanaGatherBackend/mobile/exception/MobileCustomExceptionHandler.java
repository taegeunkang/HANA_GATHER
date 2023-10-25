package com.kopo.hanaGatherBackend.mobile.exception;

import com.kopo.hanaGatherBackend.security.dto.ErrorDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Date;

@RestControllerAdvice
public class MobileCustomExceptionHandler {

    @ExceptionHandler({SendMessageFailedException.class})
    protected ResponseEntity<ErrorDto> handleSendMessageFailedException(SendMessageFailedException ex) {
        return new ResponseEntity<>(new ErrorDto(new Date(), 500, "M01", "sending message failed"), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler({InvalidMobileNumberException.class})
    protected ResponseEntity<ErrorDto> handleInvalidMobileNumberException(InvalidMobileNumberException ex) {
        return new ResponseEntity<>(new ErrorDto(new Date(), 400, "M02", "invalid mobile number"), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({KeyExpiredException.class})
    protected ResponseEntity<ErrorDto> handleInvalidKeyException(KeyExpiredException ex) {
        return new ResponseEntity<>(new ErrorDto(new Date(), 400, "M03", "expired key"), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({NotVerifiedMobileNumberException.class})
    protected ResponseEntity<ErrorDto> handleNotVerifiedMobileNumberException(NotVerifiedMobileNumberException ex) {
        return new ResponseEntity<>(new ErrorDto(new Date(), 400, "M04", "mobile number not verified"), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({AlreadyVerifiedMobileNumberException.class})
    protected ResponseEntity<ErrorDto> handleAlreadyVerifiedMobileNumberException(AlreadyVerifiedMobileNumberException ex) {
        return new ResponseEntity<>(new ErrorDto(new Date(), 400, "M05", "already verified mobile number"), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({MessageSentRecentlyException.class})
    protected ResponseEntity<ErrorDto> handleMessageSentRecentlyException(MessageSentRecentlyException ex) {
        return new ResponseEntity<>(new ErrorDto(new Date(), 400, "M06", "message sent recently"), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({InvalidCodeException.class})
    protected ResponseEntity<ErrorDto> handleInvalidCodeException(InvalidCodeException ex) {
        return new ResponseEntity<>(new ErrorDto(new Date(), 400, "M07", "invalid code"), HttpStatus.BAD_REQUEST);
    }

}
