package com.ssafy.webrtc.domain.member;

import com.ssafy.webrtc.domain.member.entity.JoinPathType;
import com.ssafy.webrtc.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.Optional;
import java.util.UUID;

public interface MemberRepository extends JpaRepository<Member, UUID> {
    @Query("SELECT m.refreshToken FROM Member m WHERE m.id=:id")
    String getRefreshTokenById(@Param("id") UUID id);

    @Transactional
    @Modifying
    @Query("UPDATE Member m SET m.refreshToken=:token WHERE m.id=:id")
    void updateRefreshToken(@Param("id") UUID id, @Param("token") String token);

    Optional<Member> findMemberByTokenAndJoinPath(String token, JoinPathType joinPath);

    Optional<Member> findByNickname(String nickname);
}
