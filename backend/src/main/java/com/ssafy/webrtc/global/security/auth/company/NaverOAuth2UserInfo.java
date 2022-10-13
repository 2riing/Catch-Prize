package com.ssafy.webrtc.global.security.auth.company;

import com.ssafy.webrtc.domain.member.entity.JoinPathType;
import com.ssafy.webrtc.global.security.auth.OAuth2UserInfo;

import java.util.Map;

public class NaverOAuth2UserInfo extends OAuth2UserInfo {

    public NaverOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        Map<String, Object> response = getResponse();

        if (response == null) {
            return null;
        }

        return (String) response.get("id");
    }

    @Override
    public String getName() {
        Map<String, Object> response = getResponse();

        if (response == null) {
            return null;
        }

        return (String) response.get("name");
    }

    @Override
    public String getEmail() {
        Map<String, Object> response = getResponse();

        if (response == null) {
            return null;
        }

        return (String) response.get("email");
    }


    @Override
    public String getImageUrl() {
        Map<String, Object> response = getResponse();

        if (response == null) {
            return null;
        }

        return (String) response.get("profile_image");
    }

    private Map<String, Object> getResponse() {
        return (Map<String, Object>) attributes.get("response");
    }

    public String getJoinPathType() {
        return JoinPathType.NAVER.name();
    }
}
