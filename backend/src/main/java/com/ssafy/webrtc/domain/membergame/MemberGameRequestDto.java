package com.ssafy.webrtc.domain.membergame;

import com.ssafy.webrtc.domain.membergame.entity.MatchResultType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Builder
@AllArgsConstructor
public class MemberGameRequestDto {

    private MatchResultType matchResult;

    private Long gameId;

    private UUID memberId;
}
