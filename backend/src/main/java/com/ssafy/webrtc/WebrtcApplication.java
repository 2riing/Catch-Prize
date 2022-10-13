package com.ssafy.webrtc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class WebrtcApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebrtcApplication.class, args);
	}

}
