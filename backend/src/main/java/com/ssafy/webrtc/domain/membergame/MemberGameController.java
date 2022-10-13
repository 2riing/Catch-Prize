package com.ssafy.webrtc.domain.membergame;

import com.ssafy.webrtc.domain.membergame.entity.MemberGame;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/membergame")
public class MemberGameController {

    private final MemberGameService memberGameService;

    // 특정 유저의 최근 전적 조회
    @GetMapping("")
    public ResponseEntity<List<MemberGameResponseDto>> findRecentMatchResult(@RequestParam("size") Integer size) {
        log.info("controller size = {}", size);
        return new ResponseEntity<List<MemberGameResponseDto>>(memberGameService.findRecentMatchResult(size) ,HttpStatus.OK);
    }

    // 특정 유저의 최근 전적에 추가
    @PostMapping("")
    public ResponseEntity<Long> createMemberGame(@RequestBody MemberGameRequestDto memberGameRequestDto) {
        return new ResponseEntity<Long>(memberGameService.create(memberGameRequestDto) , HttpStatus.OK);
    }

}
