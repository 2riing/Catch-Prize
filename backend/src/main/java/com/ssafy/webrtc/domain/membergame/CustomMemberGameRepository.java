package com.ssafy.webrtc.domain.membergame;

import com.ssafy.webrtc.domain.membergame.entity.MemberGame;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface CustomMemberGameRepository {

    List<MemberGameResponseDto> findByMemberIdOrOrderByCreateDateDesc(UUID memberId, Integer size);
}
