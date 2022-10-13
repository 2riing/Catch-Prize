package com.ssafy.webrtc.domain.member;

import com.ssafy.webrtc.domain.member.entity.Member;
import com.ssafy.webrtc.global.security.auth.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;


/**
 * Test Class
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class MemberController {

    private final MemberRepository memberRepository;

    @GetMapping("/me")
    @PreAuthorize("hasRole('USER')")
    public MemberDto getCurrentUser(@AuthenticationPrincipal CustomUserDetails user) {
        Member member = memberRepository.findById(user.getId()).orElseThrow(() -> new IllegalStateException("not found user"));

        return MemberDto.builder()
                .username(member.getNickname())
                .build();
    }
    
    @GetMapping("/check")
    public ResponseEntity<?> checkDuplicateNickname(String nickname) {
        Optional<Member> optionalMember = memberRepository.findByNickname(nickname);
        if (optionalMember.isPresent()) {
            // 중복
            return new ResponseEntity<>(1, HttpStatus.OK);
        } else {
            // 중복 아님
            return new ResponseEntity<>(0, HttpStatus.OK);
        }
    }
}