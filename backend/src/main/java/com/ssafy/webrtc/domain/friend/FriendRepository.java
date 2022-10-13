package com.ssafy.webrtc.domain.friend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface FriendRepository extends JpaRepository<Friend,Long> {

    @Query("select f from Friend f where f.toMember.id = :myId")
    List<Friend> findAllFriends(UUID myId);

    @Query("select f from Friend f where f.fromMember.id=:myId and f.toMember.id=:friendId")
    Optional<Friend> findDuplicatePending(UUID myId, UUID friendId);

}
