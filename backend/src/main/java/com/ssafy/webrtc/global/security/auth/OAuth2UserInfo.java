package com.ssafy.webrtc.global.security.auth;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

/**
 * JoinPathType마다 다른 정보를 return해야 하기 때문에 다르게 매핑위한 추상화 클래스
 */
@Getter
@Setter
public abstract class OAuth2UserInfo {

    protected Map<String, Object> attributes;

    public OAuth2UserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public Map<String, Object> getAttributes() {
        return attributes;
    }

    public abstract String getId();

    public abstract String getName();

    public abstract String getEmail();

    public abstract String getImageUrl();

}
