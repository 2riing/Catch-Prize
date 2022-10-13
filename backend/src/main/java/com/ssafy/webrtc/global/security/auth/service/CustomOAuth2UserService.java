package com.ssafy.webrtc.global.security.auth.service;

import com.ssafy.webrtc.domain.member.MemberRepository;
import com.ssafy.webrtc.domain.member.entity.JoinPathType;
import com.ssafy.webrtc.domain.member.entity.Member;
import com.ssafy.webrtc.domain.member.entity.RoleType;
import com.ssafy.webrtc.global.error.exception.ErrorCode;
import com.ssafy.webrtc.global.security.exception.OAuthProcessingException;
import com.ssafy.webrtc.global.security.auth.CustomUserDetails;
import com.ssafy.webrtc.global.security.auth.OAuth2UserInfo;
import com.ssafy.webrtc.global.security.auth.OAuth2UserInfoFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.bytebuddy.utility.RandomString;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * loadUser()를 오버라이드해서 OAuth2UserRequest에 있는 Access Token으로 유저정보를 얻는다.
 * 획득한 유저정보를 process()에서 Java Model과 맵핑하고 가입 되지 않은 경우와 이미 가입된 경우를 구분하여 프로세스를 진행한다.
 * 결과로 OAuth2User를 구현한 CustomUserDetails 객체를 생성한다.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;

    private static final String USER = "USER_";

    // OAuth2UserRequest에 있는 Access Token으로 유저정보 get
    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        return process(oAuth2UserRequest, oAuth2User);
    }

    // 획득한 유저정보를 Java Model과 맵핑하고 프로세스 진행
    private OAuth2User process(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        JoinPathType joinPathType = JoinPathType.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId().toUpperCase());
        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(joinPathType.name(), oAuth2User.getAttributes());
        StringBuilder sb = new StringBuilder();


        log.info("유저이름 = {}", oAuth2User.getAttributes());
        if (userInfo.getId().isEmpty()) {
            throw new OAuthProcessingException(ErrorCode.OAUTH_PROCESSING_ERROR);
        }
        Optional<Member> memberOptional = memberRepository.findMemberByTokenAndJoinPath(userInfo.getId(), joinPathType);
        Member member;

        // 이미 가입된 경우 해당 멤버로 CustomUserDetails생성
        // 가입되지 않은 경우 회원가입후 CustomUserDetails생성
        if (memberOptional.isEmpty()) {
            // 가입 안됐다 -> 닉네임 확인
            randomNickname(userInfo, sb, joinPathType);
            member = createUser(userInfo, joinPathType);
        } else {
            member = memberOptional.get();
        }
            // 가입 됐다 -> 걍 진행
        return CustomUserDetails.create(member, oAuth2User.getAttributes());
    }

    private void randomNickname(OAuth2UserInfo userInfo, StringBuilder sb, JoinPathType joinPathType) {
        sb.append(USER);
        while (true) {
            log.info("customOAUthService 유저 인포 = {}", userInfo.getName());
            Optional<Member> hasMember = memberRepository.findByNickname(userInfo.getName());
            if (hasMember.isPresent()) {
                // 랜덤 값 넣어줌
                String random = RandomStringUtils.random(15, true, true);
                if (sb.length() > 4) {
                    sb.setLength(0);
                    sb.append(USER);
                }
                sb.append(random);
                // 랜덤숫자 넣어주고
                switch (joinPathType) {
                    case KAKAO:
//                        log.info("cous attribute = {}", userInfo.getAttributes().get("properties"));
                        Map<String, Object> properties = (Map<String, Object>) userInfo.getAttributes().get("properties");
                        properties.put("nickname",sb.toString());
//                        log.info("cous attribute = {}", userInfo.getAttributes().get("properties"));
                        break;
                    case NAVER:
                        Map<String, Object> response = (Map<String, Object>) userInfo.getAttributes().get("response");
                        response.put("name", sb.toString());
                        break;
                    case GOOGLE:
                        Map<String, Object> attributes = userInfo.getAttributes();
                        HashMap<String, Object> newAttribute = new HashMap<>(attributes);
                        newAttribute.put("name", sb.toString());
                        userInfo.setAttributes(newAttribute);
//                        log.info("cous attribute Google = {}", userInfo.getAttributes().get("name"));
                        break;
                }
            } else break;
        }
    }

    private Member createUser(OAuth2UserInfo userInfo, JoinPathType joinPathType) {
        Member user = Member.builder()
                .nickname(userInfo.getName())
                .token(userInfo.getId())
                .role(RoleType.USER)
                .joinPath(joinPathType)
                .build();
        return memberRepository.save(user);
    }
}