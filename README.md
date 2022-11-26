# 온라인 심리 화상 게임 플랫폼 Catch-Prize 🏆

## 개발 기간
2022.07.11 ~ 2022.08.19

## 🔗 팀노션 

<hr/>

> [팀 노션 페이지](https://awesome-gardenia-42a.notion.site/3-3ffec97331794949820351b077cb72a2)

## ⚙️ **기술 스택**
### BE
- MySQL - 8.0.28
- Redis
- Spring Boot - 2.7.1
- WebRTC
- Deploy
-  AWS
- EC2
- RDS
- NginX
- Docker
- Jenkins

### FE
- Vue 3.2.37
- Vue-router 4.1.2
- Vuex 4.0.2
- Element-plus 2.2.9
- Openvidu





## 🔎 **프로젝트 소개**

<hr/>

WebRTC를 이용하여 화상채팅 보드게임을 진행하는 플랫폼

상대의 얼굴을 보며 게임을 하는 심리전 게임이 주류
다양한 아이템 사용으로 더욱 흥미진진하게 진행 가능
호불호 포커

심리전을 통해 상대 카드 종류를 맞추는 게임

<br/>

## 기획 배경 및 핵심 컨셉
![image](https://user-images.githubusercontent.com/97645988/195662771-d39210b3-4be9-4821-ac43-346658ff1e1d.png)


## 기본 탑재 게임 (호불호 포커)
![image](https://user-images.githubusercontent.com/97645988/195662421-18afbd84-0b46-4382-9dd7-9a3e5cb7e3f2.png)

## figma를 통한 화면 설계 
![image](https://user-images.githubusercontent.com/97645988/195662512-a1c6cbb9-a23c-4f58-979c-34d42e5e6355.png)
![image](https://user-images.githubusercontent.com/97645988/195662544-4a7dce8e-f67f-45b7-8eca-a91b50362ed2.png)


## 💡 **구현 기능**

### 로그인
![Animation](https://user-images.githubusercontent.com/97645988/195661747-ba2a1766-a061-482a-948b-567f2dbc3571.gif)

### 게임 플레이 화면
![게임 플레이 화면](https://user-images.githubusercontent.com/97645988/195663131-af03c014-cf45-4cbc-a8a2-4ac9376c28e2.png)


### 공지사항
![공지사항 클릭](https://user-images.githubusercontent.com/97645988/195661782-265c8238-8e7d-49a3-926c-3b79ce42bd9a.gif)

### 방생성
![방생성 목록](https://user-images.githubusercontent.com/97645988/195661797-3ca92c75-2b9f-4a3d-8ac4-0e6460d226a4.gif)

### 친구 목록

![친구 오프라인](https://user-images.githubusercontent.com/97645988/195661806-e9642ad8-bd4a-4898-95e0-32e2930fb794.gif)
![친구추가](https://user-images.githubusercontent.com/97645988/195661818-2305a949-fbe8-4f25-8e8a-6f8b224ba17b.gif)

## 도메인 설계 
![image](https://user-images.githubusercontent.com/97645988/195662269-537c8549-949d-4863-b9b4-e2bdd4bf2a19.png)



## 🌵 **컨벤션**

<hr/>

> ### Commit Message Convention

| emoji |    type    |         desc         |
| :---: | :--------: | :------------------: |
|  ⚡   |   `feat`   |   새로운 기능 추가   |
|  🛠️   |   `fix`    |      버그 수정       |
|  📝   |   `docs`   |      문서 관련       |
|  🎨   |  `style`   |     스타일 관련      |
|  ⚙️   | `refactor` |    코드 리팩토링     |
|  🚗   |   `test`   |   테스트 관련 코드   |
|  🌵   |  `chore`   |      설정 변경       |
|  🐋   |   `cicd`   | ci/cd 관련 파일 수정 |
|  ✒️   |   `comment`   | 필요한 주석 추가 및 변경 |

<br/>

> ### Git Branch Convention

- master
  - frontend-develop
    - fe/feature/login
  - backend-develop
    - be/feature/login

<br/>

- `feature/login`과 같이 자신이 맡은 기능을 나타내는 브랜치를 로컬에 생성 후 작업
- `feature/login`으로 모든 작업 후 원격 저장소에 `develop branch`에 push하여 PR
- PR에서 서로 코멘트를 남기고 리뷰 후 `develop branch`로 merge
- branch를 merge할 때 항상 -no-ff 옵션을 붙여 branch에 대한 기록을 유지한다.
- 완료되지 않은 PR은 앞에 `Draft:` 를 붙힌다.

<br/>

## 시스템 아키텍처
![image](https://user-images.githubusercontent.com/97645988/195662625-ecad268e-8126-443e-912c-4dacbe113047.png)

## 🙉 **SSAFY 2반 3팀**

<hr/>

> 👨‍💻 배인수 - **팀장**, BE

> 👨‍💻 권순석 - BE

> 👨‍💻 이상진 - BE

> 👨‍💻 김도연 - FE

> 👩‍💻 염수홍 - FE

> 👨‍💻 황태희 - FE

