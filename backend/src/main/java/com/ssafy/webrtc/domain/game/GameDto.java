package com.ssafy.webrtc.domain.game;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GameDto {

    private Long id;

    private String title;

    private int minParticipant;

    private int maxParticipant;

    public static GameDto ofGameDto(Game game) {
        return GameDto.builder()
                .id(game.getId())
                .title(game.getTitle())
                .minParticipant(game.getMinParticipant())
                .maxParticipant(game.getMaxParticipant())
                .build();
    }

}
