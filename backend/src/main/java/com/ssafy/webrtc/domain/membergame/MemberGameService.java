package com.ssafy.webrtc.domain.membergame;

import com.ssafy.webrtc.domain.game.Game;
import com.ssafy.webrtc.domain.game.GameRepository;
import com.ssafy.webrtc.domain.member.MemberRepository;
import com.ssafy.webrtc.domain.member.entity.Member;
import com.ssafy.webrtc.domain.membergame.entity.MemberGame;
import com.ssafy.webrtc.global.security.auth.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberGameService {
    private final MemberRepository memberRepository;

    private final GameRepository gameRepository;

    private final MemberGameRepository memberGameRepository;

    // 특정 유저의 최근전적 size 개수만큼 받기
    public List<MemberGameResponseDto> findRecentMatchResult(Integer size) {
        // 어떤 유저인지 식별해야함
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        CustomUserDetails userDetails = (CustomUserDetails) principal;

        UUID memberId = userDetails.getId();
        log.info("service memberId = {}",memberId);



//        log.info("service byMemberIdOrOrderByCreateDateDesc = {}", byMemberIdOrOrderByCreateDateDesc);

        return memberGameRepository.findByMemberIdOrOrderByCreateDateDesc(memberId, size);

    }

    // 특정 유저의 전적 추가
    public Long create(MemberGameRequestDto memberGameRequestDto) {
        // 어떤 유저인지 식별해야함
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        CustomUserDetails userDetails = (CustomUserDetails) principal;

        UUID memberId = userDetails.getId();

        Member member = getMember(memberId);

        Game game = getGame(memberGameRequestDto);

        MemberGame memberGame = MemberGame.of(memberGameRequestDto.getMatchResult(), member, game);

        return memberGameRepository.save(memberGame).getId();
    }

    private Game getGame(MemberGameRequestDto memberGameRequestDto) {
        Optional<Game> optionalGame = gameRepository.findById(memberGameRequestDto.getGameId());

        Game game = null;
        if (optionalGame.isPresent()) {
            game = optionalGame.get();
        }
        return game;
    }

    private Member getMember(UUID memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member member =null;
        if(optionalMember.isPresent()) {
            member = optionalMember.get();
        }
        return member;
    }

}
