package com.ssafy.webrtc.domain.game.entity;

import com.ssafy.webrtc.domain.game.Game;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

class GameTest {

    @Test
    @DisplayName("게임 생성 검증")
    public void gameCreateValid() throws Exception {
        //given
        Game game = Game.of("test", 2, 5);

        assertAll(
                () -> assertThat(game.getTitle()).isEqualTo("test"),
                () -> assertThat(game.getMinParticipant()).isEqualTo(2),
                () -> assertThat(game.getMaxParticipant()).isEqualTo(5)
        );

    }

}