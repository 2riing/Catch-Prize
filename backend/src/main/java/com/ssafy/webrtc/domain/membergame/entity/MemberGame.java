package com.ssafy.webrtc.domain.membergame.entity;

import com.ssafy.webrtc.domain.game.Game;
import com.ssafy.webrtc.domain.member.entity.Member;
import com.ssafy.webrtc.domain.model.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "member_game")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
// FIXME: 우선 Setter 열어두고 개발 추후 생성자로 변경 예정
@Setter
public class MemberGame extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_game_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "match_result")
    private MatchResultType matchResult;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id")
    private Game game;

    private MemberGame(MatchResultType matchResult, Member member, Game game) {
        this.matchResult = matchResult;
        this.member = member;
        this.game = game;
    }

    public static MemberGame of(MatchResultType matchResult, Member member, Game game) {
        return new MemberGame(matchResult, member, game);
    }

}
