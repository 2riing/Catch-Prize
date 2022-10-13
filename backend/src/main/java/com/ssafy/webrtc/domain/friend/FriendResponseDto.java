package com.ssafy.webrtc.domain.friend;

import lombok.*;

import java.util.UUID;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FriendResponseDto {

    private Long id;

    private String friendNickname;

    private boolean pending;

    private boolean isFriend;

    public static FriendResponseDto of(Friend friend) {
        return FriendResponseDto.builder()
                .id(friend.getId())
                .friendNickname(friend.getFromMember().getNickname())
                .pending(friend.isPending())
                .isFriend(friend.isFriend())
                .build();
    }

}
