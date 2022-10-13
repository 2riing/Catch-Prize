package com.ssafy.webrtc.domain.membergame;

import com.ssafy.webrtc.domain.game.Game;
import com.ssafy.webrtc.domain.member.entity.Member;
import com.ssafy.webrtc.domain.membergame.entity.MatchResultType;
import com.ssafy.webrtc.domain.membergame.entity.MemberGame;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberGameResponseDto {

    private Long id;

    private MatchResultType matchResult;

    private LocalDateTime matchDate;

    private String gameTitle;

    public static MemberGameResponseDto ofMemberGameDto(MemberGame memberGame) {
        return MemberGameResponseDto.builder()
                .id(memberGame.getId())
                .matchResult(memberGame.getMatchResult())
                .matchDate(memberGame.getCreateDate())
                .gameTitle(memberGame.getGame().getTitle())
                .build();
    }

}
