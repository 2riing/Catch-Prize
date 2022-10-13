package com.ssafy.webrtc.global.error.exception;

import com.ssafy.webrtc.global.security.exception.OAuthProcessingException;
import com.ssafy.webrtc.global.security.exception.OAuthRedirectException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    // * * BASIC * *
    // 500
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception e) {
        log.error("handleException : {}", e.getMessage());
        return ResponseEntity
                .status(ErrorCode.INTERNAL_SERVER_ERROR.getStatus().value())
                .body(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR));
    }

    // 404
    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFoundException(Exception e) {
        log.error("notFoundException : {}", e.getMessage());
        return ResponseEntity
                .status(ErrorCode.NOT_FOUND.getStatus().value())
                .body(new ErrorResponse(ErrorCode.NOT_FOUND));
    }

    // 400
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ErrorResponse> handleBadRequestException(Exception e) {
        log.error("badRequestException : {}", e.getMessage());
        return ResponseEntity
                .status(ErrorCode.BAD_REQUEST.getStatus().value())
                .body(new ErrorResponse(ErrorCode.BAD_REQUEST));
    }

    // * * CUSTOM * *
    @ExceptionHandler(OAuthProcessingException.class)
    public ResponseEntity<ErrorResponse> handleOauthProcessingException(OAuthProcessingException e) {
        log.error("handleOauthProcessingException : {}", e.getErrorCode());
        return ResponseEntity
                .status(e.getErrorCode().getStatus().value())
                .body(new ErrorResponse(e.getErrorCode()));
    }

    @ExceptionHandler(OAuthRedirectException.class)
    public ResponseEntity<ErrorResponse> handleOauthRedirectException(OAuthProcessingException e) {
        log.error("handleOauthRedirectException : {}", e.getErrorCode());
        return ResponseEntity
                .status(e.getErrorCode().getStatus().value())
                .body(new ErrorResponse(e.getErrorCode()));
    }

}
