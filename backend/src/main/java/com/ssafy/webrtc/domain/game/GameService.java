package com.ssafy.webrtc.domain.game;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GameService {

    private final GameRepository gameRepository;

    private final ModelMapper modelMapper;

    // 게임 이름으로 게임 정보 조회
    public GameDto findByTitle(String gameTitle) {
        Game game = gameRepository.findByTitle(gameTitle);
        GameDto gameDto = modelMapper.map(game, GameDto.class);
        return gameDto;
    }

    // 게임 아이디로 게임 정보 조회
    public GameDto findById(Long gameId) {
        Game game = gameRepository.findById(gameId).get();
        GameDto gameDto = modelMapper.map(game, GameDto.class);
        return gameDto;
    }

}
