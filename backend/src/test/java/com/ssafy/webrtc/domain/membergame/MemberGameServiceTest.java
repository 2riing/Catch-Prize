package com.ssafy.webrtc.domain.membergame;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class MemberGameServiceTest {

    @Autowired
    MemberGameRepository memberGameRepository;

    @Test
    public void findAll() throws Exception {
        //given
        memberGameRepository.findAll();
        //when

        //then

    }

}