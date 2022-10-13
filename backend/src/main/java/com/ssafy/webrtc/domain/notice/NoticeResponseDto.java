package com.ssafy.webrtc.domain.notice;

import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NoticeResponseDto {

    private Long id;

    private String title;

    private String content;

    private LocalDateTime regDate;

    private String token;

    public static NoticeResponseDto ofNoticeDto(Notice notice) {
        return NoticeResponseDto.builder()
                .id(notice.getId())
                .title(notice.getTitle())
                .content(notice.getContent())
                .regDate(notice.getCreateDate())
                .token(notice.getMember().getToken())
                .build();
    }

}
