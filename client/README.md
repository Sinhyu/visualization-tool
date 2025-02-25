# UNIQ-VIS 웹 클라이언트

> UNIQ-VIS 웹 클라이언트는 교통 시뮬레이션 및 다중 교차로 신호최적화 설정 및 결과 가시화 기능을 제공한다. 클라이언트 모듈은 단독으로 실행될 수 없으며 서버 모듈의 `public/` 디렉토리에 복사되어 제공된다.

## 사전 환경

클라이언트 모듈 빌드를 위해서는 Node.js 가 설치되어 있어야 한다.

- [Node.js v18.12.1 LTS 설치](https://nodejs.org/en/)

## 빌드

아래 명령을 통해서 필요한 패키지를 설치하고 배포를 위한 결과물을 생성한다. `npm run build` 명령을 실행하면 `../server/public` 디렉토리에 결과물이 생성된다.

```bash
# 의존성 라이브러리 설치
npm install

# 배포를 위한 빌드
npm run build
```

## 개발서버 실행

개발 시에는 개발 서버를 실행한다. 아래 명령을 실행하면 웹 클라이언트 개발을 위한 개벌서버가 구동된다.

```
npm run dev
```
