package com.ssafy.webrtc.global.security.auth;

import com.ssafy.webrtc.domain.member.entity.JoinPathType;
import com.ssafy.webrtc.global.security.auth.company.GoogleOAuth2UserInfo;
import com.ssafy.webrtc.global.security.auth.company.KakaoOAuth2UserInfo;
import com.ssafy.webrtc.global.security.auth.company.NaverOAuth2UserInfo;

import java.util.Map;

public class OAuth2UserInfoFactory {
    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
        if(registrationId.equalsIgnoreCase(JoinPathType.GOOGLE.name())) {
            return new GoogleOAuth2UserInfo(attributes);
        } else if (registrationId.equalsIgnoreCase(JoinPathType.NAVER.name())) {
            return new NaverOAuth2UserInfo(attributes);
        } else if (registrationId.equalsIgnoreCase(JoinPathType.KAKAO.name())) {
            return new KakaoOAuth2UserInfo(attributes);
        } else {
            throw new IllegalArgumentException("해당 oauth2 기능은 지원하지 않습니다.");
        }
    }
}
