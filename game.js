// ================== 게임 상태 ==================
let scene = 0;

// 점수 (기본 20점)
let publicSupport = 20;   // 민심
let economy = 20;         // 경제
let environment = 20;     // 환경

const gameDiv = document.getElementById("game");

// ================== 상황 데이터 ==================
const scenes = [
  null, // index 맞추기용

  {
    text: "우리나라는 탄소 배출의 큰 원인인 석탄 발전소를 줄이기로 했다. 그러나 전력 공급이 줄면 전기 요금 인상과 지역 일자리 감소 문제가 생긴다. 석탄 발전소를 감소시킬까?",
    yes: { p: -10, e: -10, env: +10 },
    no:  { p:  0,  e: +10, env: -15 }
  },

  {
    text: "정부는 재생에너지 비율을 빠르게 높이기 위해 태양광과 풍력 발전 단지를 확대하려 한다. 하지만 일부 지역 주민들은 경관 훼손과 생활 불편을 이유로 반대하고 있다. 태양광과 풍력 발전 단지를 확대시킬까?",
    yes: { p: +5, e: -5, env: +15 },
    no:  { p: +5, e: +10, env: -10 }
  },

  {
    text: "정부는 기업의 탄소 감축을 위해 배출권 규제를 강화하려 한다. 기업들은 생산 비용 증가로 경쟁력이 떨어질 것을 우려한다. 배출권 거래제를 강화할 것인가?",
    yes: { p: +10, e: -15, env: +10 },
    no:  { p: -5, e: +5,  env: -10 }
  },

  {
    text: "정부는 친환경 교통을 위해 전기차와 수소차 보조금을 확대하려 한다. 하지만 막대한 예산이 들고, 차를 사지 못하는 국민의 불만도 커진다. 전기차와 수소차의 보조금을 확대해야 할까?",
    yes: { p: -10, e: -10, env: +15 },
    no:  { p: +5,  e:  0,  env:  0 }
  }
];

// ================== 화면 렌더링 ==================
function renderScene() {

  // 시작 화면
  if (scene === 0) {
    gameDiv.innerHTML = `
      <h1>탄소중립 나라 키우기</h1>
      <p class="start-info">기본점수 20점으로 시작합니다.</p>
      <img src="images/cover.png" class="cover">
      <button onclick="startGame()">시작하기</button>
    `;
  }

  // 상황 화면
  else if (scene >= 1 && scene <= 4) {
    gameDiv.innerHTML = `
      <h1>상황 ${scene}</h1>
      <p>${scenes[scene].text}</p>

      <button onclick="choose('yes')">YES</button>
      <button onclick="choose('no')">NO</button>
    `;
  }

  // 결과 화면
  else if (scene === 5) {
    showResult();
  }
}

// ================== 선택 처리 ==================
function choose(answer) {
  const choice = scenes[scene][answer];

  publicSupport += choice.p;
  economy += choice.e;
  environment += choice.env;

  scene++;
  renderScene();
}

// ================== 게임 흐름 ==================
function startGame() {
  resetGame();
  scene = 1;
  renderScene();
}

// ================== 결과 화면 ==================
function showResult() {

  // 최대 점수 계산 (기본 20점 + 각 상황에서 가능한 최고 선택)
  const maxPublic = 20 + (0 + 5 + 10 + 5);      // 40
  const maxEconomy = 20 + (10 + 10 + 5 + 0);    // 45
  const maxEnvironment = 20 + (10 + 15 + 10 + 15); // 70

  const total = publicSupport + economy + environment;
  const maxTotal = maxPublic + maxEconomy + maxEnvironment;

  gameDiv.innerHTML = `
    <h1>최종 결과</h1>

    <div class="result">민심 점수: ${publicSupport}</div>
    <div class="result">경제 점수: ${economy}</div>
    <div class="result">환경 점수: ${environment}</div>

    

    <div class="max-score">
      <strong>최대 점수</strong><br>
      민심: ${maxPublic}<br>
      경제: ${maxEconomy}<br>
      환경: ${maxEnvironment}<br>
      
    </div>

    <button onclick="goToStart()">처음으로 돌아가기</button>
  `;
}

// ================== 초기화 ==================
function resetGame() {
  scene = 0;
  publicSupport = 20;
  economy = 20;
  environment = 20;
}

function goToStart() {
  resetGame();
  renderScene();
}

// ================== 시작 ==================
renderScene();
