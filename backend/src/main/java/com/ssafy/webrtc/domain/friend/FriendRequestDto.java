package com.ssafy.webrtc.domain.friend;

import lombok.*;

import java.util.UUID;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FriendRequestDto {

    private String friendNickname;

    public static FriendRequestDto of(Friend friend) {
        return FriendRequestDto.builder()
                .friendNickname(friend.getToMember().getNickname())
                .build();
    }
}
