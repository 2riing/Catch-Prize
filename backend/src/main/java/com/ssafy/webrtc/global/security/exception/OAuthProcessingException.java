package com.ssafy.webrtc.global.security.exception;

import com.ssafy.webrtc.global.error.exception.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class OAuthProcessingException extends RuntimeException {

    private ErrorCode errorCode;

}