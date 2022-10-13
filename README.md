# 온라인 심리 화상 게임 플랫폼 Catch-Prize 🏆

## 개발 기간
2022.07.11 ~ 2022.08.19

## 기획 배경 및 핵심 컨셉
![image](https://user-images.githubusercontent.com/97645988/195662771-d39210b3-4be9-4821-ac43-346658ff1e1d.png)


## 기본 탑재 게임 (호불호 포커)
![image](https://user-images.githubusercontent.com/97645988/195662421-18afbd84-0b46-4382-9dd7-9a3e5cb7e3f2.png)

## figma를 통한 화면 설계 
![image](https://user-images.githubusercontent.com/97645988/195662512-a1c6cbb9-a23c-4f58-979c-34d42e5e6355.png)
![image](https://user-images.githubusercontent.com/97645988/195662544-4a7dce8e-f67f-45b7-8eca-a91b50362ed2.png)



## 화면

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

## 사용 기술 스택
### BE
- Java 11
- application.yml
    - local
    - dev
    - prod
- logback-spring.xml [logging]
- Spring Framework
    - **Exception Handling**
        - Ajax를 동한 API가 있다면 `**@RestControllerAdvice**`, `**@ExceptionHandler**`를 사용해서 처리하자
        - Custom Exception을 적극 사용해보자.
- Spring Boot
- Spring Security [인증/인가]
- Spring Data JPA
- Querydsl
- Spring REST Docs
    - Junit 5
- DB (MySQL)
### FE
- vue 3.2.37
    - vue-router 4.1.2
    - vuex 4.0.2
    - axios 0.27.2
    - vue-axios 3.4.1
    - lodash 4.17.21
- core-js 3.23.4
- element-plus 2.2.9

## 서비스 아키텍처
![image](https://user-images.githubusercontent.com/97645988/195662625-ecad268e-8126-443e-912c-4dacbe113047.png)
