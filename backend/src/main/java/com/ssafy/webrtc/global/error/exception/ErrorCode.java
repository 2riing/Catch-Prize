package com.ssafy.webrtc.global.error.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    // * * BASIC * *
    // 400 : BAD REQUEST
    BAD_REQUEST(HttpStatus.BAD_REQUEST, "잘못된 요청입니다."),

    // 404 : PAGE NOT FOUND
    NOT_FOUND(HttpStatus.NOT_FOUND, "페이지를 찾을 수 없습니다."),

    // 500 : INTERNAL SERVER ERROR
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "내부 서버 에러입니다."),


    // * * CUSTOM * *
    // 400 : OAUTH PROCESSING ERROR
    OAUTH_PROCESSING_ERROR(HttpStatus.BAD_REQUEST, "잘못된 인증입니다."),

    // 400 : OAUTH REDIRECT ERROR
    OAUTH_REDIRECT_ERROR(HttpStatus.BAD_REQUEST, "잘못된 REDIRECT URI 입니다.");

    // Properties
    private final HttpStatus status;
    private final String message;

}
