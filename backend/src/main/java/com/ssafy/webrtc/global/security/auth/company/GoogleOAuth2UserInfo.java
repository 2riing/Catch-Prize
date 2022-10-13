package com.ssafy.webrtc.global.security.auth.company;

import com.ssafy.webrtc.domain.member.entity.JoinPathType;
import com.ssafy.webrtc.global.security.auth.OAuth2UserInfo;

import java.util.Map;

public class GoogleOAuth2UserInfo extends OAuth2UserInfo {

    public GoogleOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return (String) attributes.get("sub");
    }

    @Override
    public String getName() {
        return (String) attributes.get("name");
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public String getImageUrl() {
        return (String) attributes.get("picture");
    }

    public String getJoinPathType() {
        return JoinPathType.GOOGLE.name();
    }
}
