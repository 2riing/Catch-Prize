package com.ssafy.webrtc.global.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    // Entity 변환용 ModelMapper 추가
    // Dto -> Setter, AllArgs, NoArgs & Entity -> Getter
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

}
