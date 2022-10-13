package com.ssafy.webrtc.domain.membergame;

import com.ssafy.webrtc.domain.membergame.entity.MemberGame;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.UUID;

@Slf4j
public class CustomMemberGameRepositoryImpl implements CustomMemberGameRepository {

    @Autowired
    EntityManager em;

    @Override
    public List<MemberGameResponseDto> findByMemberIdOrOrderByCreateDateDesc(UUID memberId, Integer size) {

        return em.createQuery("select new com.ssafy.webrtc.domain.membergame.MemberGameResponseDto(mg.id, mg.matchResult, mg.createDate, mg.game.title) from MemberGame mg where mg.member.id = :memberId", MemberGameResponseDto.class)
                .setParameter("memberId", memberId)
                .setMaxResults(size)
                .getResultList();
    }
}
