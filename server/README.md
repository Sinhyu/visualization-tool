# UNIQ-VIS 가시화 서버

UNIQ-VIS 가시화 서버는 교통 시뮬레이터 및 신호최적화 모듈과 연계하여 UNIQ-VIS 웹 클라이언트에서 그 결과를 시각화 할 수 있도록 필요한 기능을 제공한다.

## 사전 환경

가시화 서버는 사전 환경 조건만 맞으면 운영체제에 상관없이 실행이 가능하지만 편의를 위해 Ubuntu 18.04 LTS 버전을 기준으로 설명한다. 가시화 서버 실행을 위해서 Node.js 런타임이 설치되어야 하며 시뮬레이션 결과 관리 및 지도(Link, Cell, 신호정보) 데이터 관리를 위해서 MongoDB 가 설치되어야 한다. 또한 시뮬레이션 구동을 위해서 도커(Docker)가 설치되어 있어야 한다.

- Docker 설치
  - [여기](https://docs.docker.com/engine/install/ubuntu/)에 기술된 설치 절차에 따라 설치
- Node.js 설치
  - [여기](https://nodejs.org/en/) 에 기술된 설치 절차에 따라 시스템에 적합한 최신 버전의 Node.js 를 설치한다.
- MongoDB 설치
  - [여기](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-enterprise-with-docker/) 에 기술된 설치 절차에 따라 최신 버전의 MongoDB를 설치한다.
  - 편의를 위해서 도커로 설치하도록 한다.
- 데이터베이스 설정
  - MongoDB 설치가 완료되면 지도(Link, Cell, 신호) 데이터를 등록한다.
- 공유 디렉토리 생성
  - 교통 시뮬레이터 또는 신호 최적화 서브시스템 모듈과의 데이터 공유를 위해서 공유 디렉토리를 설정한다.

### 데이터베이스 설정

다음 절차에 따라 사용할 데이터를 임포트 한다.

1. MongoDB 접속
2. 데이터베이스 생성 (map 이란 이름으로 데이터베이스 생성)
   - ulinks, ucells, signlas 를 위한 collection 을 생성
   - 개별 콜렉션에 임포트

> ([MonboDB Compass](https://www.mongodb.com/products/compass)를 이용하면 GUI를 통해서 해당 데이터를 손쉽게 임포트 할 수 있다.)

사용할 파일은 아래 링크에서 다운로드 할 수 있다.

- [ulinks.zip](https://github.com/kusubang/visualization-tool/files/10064450/ulinks.zip)
- [ucells.zip](https://github.com/kusubang/visualization-tool/files/10064452/ucells.zip)
- [signals.zip](https://github.com/kusubang/visualization-tool/files/10064454/signals.zip)

다운로드 받은 파일을 압축해제 하면 다음과 같은 JSON 파일을 확인할 수 있다.

- signals.json
- ucells.json
- ulinks.json

### 공유 디렉토리 설정

가시화 서버는 교통 시뮬레이터 및 신호 최적화 모듈과 파일 시스템을 이용해서 데이터를 공유한다. [uniq-sim.zip](https://github.com/kusubang/visualization-tool/files/10064471/uniq-sim.zip) 파일을 다운로드 하여 사용하고자 하는 디렉토리에 압축해제 한다. 디렉토리 구조는 다음과 같다.

```
uniq-sim/
  ├── data (교통 시뮬레이션 설정, 신호 최적화 설정, 신호 최적화 결과)
  ├── output (교통 시뮬레이션 결과)
  └── routes
```

공유 디렉토리에는 `data/`, `output/`, `routes/` 디렉토리가 반드시 있어야 하며 `routes/` 에는 시나리오 파일 및 수요 파일이 있어야 한다. 웹 클라이언트에서 시뮬레이션 등록 시 **routes** 에 존재하는 데이터에 대한 시뮬레이션만 실행이 가능하다.

> 공유 디렉토리는 server/config.js 파일을 수정하여 설정한다.

uniq-sim.zip 파일에는 교통시뮬레이션 및 신호 최적화 시 필요한 설정 파일이 각 1개씩 포함된다.

1. uniq-sim/routes/scenario_cdd3.zip -> 신호 최적화 시 사용
2. uniq-sim/routes/scenario_dj_doan.zip -> 교통 시뮬레이션 시 사용

교통 시뮬레이션 또는 신호 최적화 실험을 등록하면 `/uniq-sim/data/{simulation_id}` 디렉토리에 필요한 설정 정보들이 생성된다. 교통 시뮬레이션 결과는 `/uniq-sim/data/{simulation_id}/output` 에 생성되고 신호 최적화 결과는 `/uniq-sim/data/{simulation_id}/output` 디렉토리에 생성된다.

**data** 디렉토리 구조는 다음과 같다.

```
/uniq-sim/data/
  ├── OPTI_202208_00012
  │   ├── data
  │   ├── logs
  │   ├── model
  │   ├── output
  │   └── scenario
  └── SIMU_202211_00828
      ├── busstops.xml
      ├── connection.xml
      ├── edge.xml
      ├── node.xml
      ├── salt.scenario.json
      └── tss.xml
```

**output** 디렉토리 구조는 다음과 같다.

```
/uniq-sim/output/
  ├── SIMU_202011_00700
  │   ├── 2020_dj_sample-PeriodicOutput.csv
  │   ├── OPTI_202011_00653-PeriodicOutput.csv
  │   ├── bar-data.json
  │   ├── grid-data.json
  │   ├── histogram-data.json
  │   └── pie-data.json
  ├── SIMU_202211_00184
  │   ├── SIMU_202211_00184_PeriodicOutput.csv
  │   ├── bar-data.json
  │   ├── grid-data.json
  │   ├── histogram-data.json
  │   ├── log.txt
  │   ├── pie-data.json
  │   └── progress.txt
  ├── SIMU_202211_00828
  └── grid.geojson
```

### 시나리오 파일(시뮬레이션용)

/uniq-sim/routes 디렉토리에는 시뮬레이션에 사용할 사니리오 파일이 있는지 확인한다.

- scenario_dj_doan.zip (도안)(샘플제공)
- scenario_dj_seogu.zip (서구)
- scenario_dj_youseonggu.zip (유성규)
- scenario_dj_dg.zip (동구)
- scenario_dj_ddg.zip (대덕구)
- scenario_dj_jg.zip (중구)

### 시나리오 파일(신호최적화용)

/uniq-sim/routes 디렉토리에 신호최적화에 사용할 시나리오 파일이 있는지 확인한다.

- scenario_cdd3.zip (연구단지)(샘플제공)
- scenario_doan.zip (도안)

### 수요파일 목록

/uniq-sim/routes 디렉토리에 수요파일이 있는지 확인한다.

- doan.rou.xml (도안)
- seogu.rou.xml (서구)
- youseonggu.rou.xml (유성구)
- dg.rou.xml (동구)
- ddg.rou.xml (대덕구)
- jg.rou.xml (중구)

## 빌드

별도의 빌드 과정은 필요하지 않으며 아래 명령을 통해서 필요한 패키지를 설치한다.

```bash
npm install
```

## 도커 이미지 준비

교통 시뮬레이션 또는 신호최적화 모듈은 도커 컨테이너 형태로 실행됨으로 UNIQ-VIS가 설치된 서버에 해당 도커 이미지가 다운로드 되어 있어야 한다.

### 교통시뮬레이션 이미지 다운로드

아래 명령을 통해서 교통시뮬레이션을 위한 도커 이미지를 다운로드 한다.

```bash
docker pull images4uniq/salt:v2.1a.221019
```

### 신호최적화용 이미지 다운로드

아래 명령을 통해서 신호최적화를 위한 도커 이미지를 다운로드 한다.

```bash
docker pull images4uniq/optimizer:v2.1a.20221012
```

## 실행

아래 명령을 통해서 가시화 서버를 실행한다.

```bash
node ./bin/www
```

가시화 서버의 기본 포트 변경을 위해서는 `/server/config.json` 파일을 수정한다.
