# 잔액을 지켜토! 🐰

![Logo](./src/img/Logo.png)

**"잔액을 지켜토"**는 지출을 현명하게 관리하고, 소중한 잔액을 지켜주는 **가계부 웹 서비스**입니다.
저희 팀은 **직관적인 디자인, 간편한 기능**을 통해 누구나 부담없이 사용할 수 있는 가계부를 만들었습니다.
귀엽고 똑똑한 우리의 마스코트 **Bunny**와 함께라면, 돈 관리도 더 이상 어렵지 않아요!
지금부터 **Bunny**와 함께, **당신의 잔액을 지켜보아요!**🐰💸

<br/>

## 🧩 주요 기능

🔐 **로그인 / 회원가입**  
 개인 계정을 생성하고 로그인할 수 있습니다.

📊 **월별 수입·지출 그래프 시각화**  
 월별 수입과 지출 데이터를 막대그래프로 시각화하여,
사용자가 한눈에 자신의 소비 흐름을 파악할 수 있도록 도와줍니다.

🤹‍♀️ **카테고리별 지출 분석 그래프 시각화**  
 **원형 그래프(Pie Chart)**를 통해, **카테고리별 지출 비율**을 직관적으로 확인할 수 있습니다.

📄 **거래내역 조회**  
 등록된 거래 내역을 **날짜별**, **카테고리별**로 필터링하여 필요한 항목만 선택적으로 확인할 수 있습니다.

➕ **거래내역 추가**  
 수입 또는 지출 항목을 직접 입력하여 거래내역에 등록할 수 있습니다.

✏️ **거래내역 수정**  
 이미 등록된 거래 정보를 언제든지 수정하여 최신 상태로 유지할 수 있습니다.

👤 **프로필 수정**  
 사용자 이름, 비밀번호, 이메일, 프로필 이미지 등 나만의 정보를 자유롭게 변경할 수 있습니다.

<br/>

## 🛠 사용 기술 스택

### 💻 Frontend

- **Vue.js**: 사용자 친화적인 UI를 위한 프론트엔드 프레임워크
- **Pinia**: 상태 관리 라이브러리 (Vue 공식 상태 관리 툴)
- **Chart.js**: 막대 그래프 및 원형 그래프 구현
- **Vue Router**: SPA 라우팅 관리
- **Bootstrap**: 반응형 UI 및 컴포넌트 디자인 프레임워크

### 🎨 Design

- **Figma**: UI/UX 기획 및 프로토타이핑

<br/>

## 📸 서비스 화면

### 🔐 로그인 페이지

![로그인 페이지](./images/login.png)

- 아이디와 비밀번호를 입력하여 로그인
- 로그인 정보 잘못된 입력 시 오류 안내
- 비밀번호 보기 토글 기능
- 로그인 성공 후, 메인 페이지로 이동
- 아이디 없을 경우 sign up now 버튼을 통해 회원가입 페이지로 이동

---

### 📝 회원가입 페이지

![회원가입 페이지](./images/join.png)

- 신규 사용자 계정 생성
- 입력값 유효성 검사 및 중복 ID 확인
- 필수 입력값 미입력 시, 오류 안내
- 회원가입 완료 후 로그인 페이지로 이동

---

### 🏠 메인 페이지

![메인 페이지](./images/main.png)

#### 📊 거래 분석 화면

![거래 분석 화면](./images/bar-chart.png)

- 월별 수입과 지출을 막대그래프로 비교
- 월간 소비 트렌드를 한눈에 파악 가능

- 원형 그래프를 통해 월간 소비를 카테고리 별로 비교
- 이용자의 소비 트렌드를 한눈에 파악 가능

#### 📄 최근 거래 내역 확인

- 최근 거래 내역 확인 가능
- ➕버튼을 통해 간편 거래 추가 가능

---

### ➕ 거래 추가 페이지

![거래 추가 페이지](./images/add-transaction.png)

- 수입 또는 지출 항목 선택
- 날짜, 금액, 카테고리, 내용 작성
- 저장 버튼 선택 시, 거래 내역 페이지에 항목 추가
- 취소 버튼 선택 시, 항목 추가 없이 거래 내역 페이지로 이동

---

### 📄 거래내역 페이지

![거래내역 페이지](./images/transaction-list.png)

- 등록된 거래들을 리스트 형식으로 확인
- 전체 / 카테고리별 / 수입 / 지출 필터링 기능 제공
- ➕버튼을 통해 항목 추가 가능
- 휴지통 버튼을 통해 항목 삭제 가

---

<br/>

## 🧑‍💻 **팀원 소개**

| 이름   | 역할            | 담당기능                                    | GitHub                           |
| ------ | --------------- | ------------------------------------------- | -------------------------------- |
| 이지아 | 팀장👑          | 전체 거래 목록 출력, 필터 버튼 구성         | https://github.com/iridescentzia |
| 권혁주 | 팀원            | 거래 등록 / 수정 처리, 드롭다운 포함        | https://github.com/kwon990217    |
| 오유찬 | 팀원            | 프로필 정보 출력 및 수정                    | https://github.com/yuchan628     |
| 이예인 | 팀원 - 깃관리자 | 로그인 / 회원가입 기능 구현, userStore 연동 | https://github.com/yeainlee      |
| 전혜란 | 팀원            |                                             | https://github.com/ra-ran        |
| 주수빈 | 팀원            | 수입 / 지출 차트 계산, 최근 거래 표         | https://github.com/subeen1902    |
