package com.ssafy.webrtc.domain.friend;

import com.ssafy.webrtc.domain.member.MemberRepository;
import com.ssafy.webrtc.domain.member.entity.Member;
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
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class FriendService {

    private final FriendRepository friendRepository;

    private final MemberRepository memberRepository;

    //    1. 친구 목록 전체 조회
//    (select * from friend where tomemberid=나 and isFriend=true)
//    3. 나한테 친구 요청한 리스트 가져오기
//    (select * from friend where tomemberid=나 and pending=true)
    @Transactional(readOnly = true)
    public List<FriendResponseDto> findAllFriends() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        CustomUserDetails userDetails = (CustomUserDetails) principal;

        UUID myId = ((CustomUserDetails) principal).getId();

        List<Friend> friends = friendRepository.findAllFriends(myId);
        List<FriendResponseDto> friendResponseDtos = friends.stream().map(friend -> {
            FriendResponseDto friendResponseDto = FriendResponseDto.of(friend);

            return friendResponseDto;
        }).collect(Collectors.toList());

        return friendResponseDtos;
    }

    //    2. 친구 추가 요청하기 post("/{친구닉네임}")
//    (insert into friend values (id_auto, frommemberid="나", tomemberid="너", pending=true, isFriend=False)
    public Long addFriend(String friendNickname) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        CustomUserDetails userDetails = (CustomUserDetails) principal;

        UUID myId = ((CustomUserDetails) principal).getId();

        Optional<Member> fromMember = memberRepository.findById(myId);

        Optional<Member> toMember = memberRepository.findByNickname(friendNickname);

        log.info("addFriend {} -> {}", friendNickname, toMember.get().getId());

        Optional<Friend> duplicatePending = friendRepository.findDuplicatePending(fromMember.get().getId(), toMember.get().getId());
        //

        // null + 존재할때 isFriend가 False ->
        if (duplicatePending.isPresent()) {
            // 이미 친구상태인데 친구 요청 보낼 경우?
            // 존재
            return -1L; // 이미 친구상태인 경우 -1L 보내기
        }

        Friend friend = Friend.of(fromMember.get(), toMember.get(), true, false);
        // 친구상태가 아니거나, 요청이 이미 가있는 경우는 상관 없음
        return friendRepository.save(friend).getId();
    }


    // 친구 수락하여 친구 추가됨
    public Long acceptFriend(String friendNickname) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        CustomUserDetails userDetails = (CustomUserDetails) principal;

        UUID myId = ((CustomUserDetails) principal).getId();

        Optional<Member> fromMember = memberRepository.findById(myId);

        Optional<Member> toMember = memberRepository.findByNickname(friendNickname);

        // 이 부분 제대로 동작할지? 기존꺼 update 안하고 새로 insert 해버리는건 아닐지

        Optional<Friend> fromMeOptional = friendRepository.findDuplicatePending(myId, toMember.get().getId());
        Optional<Friend> toMeOptional = friendRepository.findDuplicatePending(toMember.get().getId(), myId);


        Friend toMe = toMeOptional.get();
        log.info("friendService tome : {}", toMe.getId());
        toMe.allowFriend();

        friendRepository.save(toMe);

        Friend fromMe;
        if (fromMeOptional.isPresent()) {
            fromMe = fromMeOptional.get();
            fromMe.allowFriend();
        } else {
            fromMe = Friend.of(fromMember.get(), toMember.get(), false, true);
        }
        return friendRepository.save(fromMe).getId(); // 마지막에 update된 record id 반환

    }


    /*
    4-1. 친구 거절하기
    // 쌍방 삭제로 합쳐두기
    delete("/{친구닉네임}")
    (delete from friend where tomemberid=나 and frommemberid=너 and pending=true)
    5. 친구 삭제하기 (쌍방향 record 제거)
    (delete from friend where frommemberid=나 and tomemberid=너)
    (delete from friend where frommemberid=너 and tomemberid=나)
     */
    public Long deleteFriend(String friendNickname) {

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        CustomUserDetails userDetails = (CustomUserDetails) principal;

        UUID myId = ((CustomUserDetails) principal).getId();

        Optional<Member> toMember = memberRepository.findByNickname(friendNickname);

        Optional<Friend> fromMeOptional = friendRepository.findDuplicatePending(myId, toMember.get().getId());
        Optional<Friend> toMeOptional = friendRepository.findDuplicatePending(toMember.get().getId(), myId);

        fromMeOptional.ifPresent(friendRepository::delete);
        toMeOptional.ifPresent(friendRepository::delete);

        return 1L;

    }


}
