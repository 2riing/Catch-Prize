package com.ssafy.webrtc.domain.notice;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class NoticeRequestDto {

    private String title;

    private String content;
}
