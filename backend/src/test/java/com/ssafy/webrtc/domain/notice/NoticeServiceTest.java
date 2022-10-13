package com.ssafy.webrtc.domain.notice;

import com.ssafy.webrtc.domain.member.entity.JoinPathType;
import com.ssafy.webrtc.domain.member.entity.Member;
import com.ssafy.webrtc.domain.member.entity.RoleType;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class NoticeServiceTest {

    @Autowired
    EntityManager em;

    @Autowired
    NoticeService noticeService;

//    @Test
//    @Transactional
//    @Rollback(value = false)
//    void 공지사항_하나_조회() {
//        Member member = Member.of("test", "ef", JoinPathType.GOOGLE, RoleType.USER);
//        member.createMemberUniqueId();
//        System.out.println(member.getId());
//        em.persist(member);
//
//        Notice notice = Notice.of("test", "content");
//        notice.setMember(member);
//
//        em.persist(notice);
//
//        NoticeDto one = noticeService.findById(notice.getId());
//
//        assertThat(one.getContent()).isEqualTo("content");
//    }

//
//    @Test
//    @Transactional
//    @Rollback(value = false)
//    void 공지사항_수정() {
//        Member member = Member.of("test", "ef", JoinPathType.GOOGLE, RoleType.USER);
//        member.createMemberUniqueId();
//        System.out.println(member.getId());
//        em.persist(member);
//
//        Notice notice = Notice.of("test", "content");
//        notice.setMember(member);
//
//        em.persist(notice);
//
//        NoticeDto one = noticeService.findById(notice.getId());
//
//        assertThat(one.getContent()).isEqualTo("content");
//    }

}