// 랜덤 번호 지정
// 유저가  번호를 입력한다. 그리고 .go라는 버튼을 누름
// 만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
// 랜덤번호가 < 유저번호 Down
// 랜덤번호가 > 유저번호 up
// reset버튼을 누르면 게임이 리셋된다.
// 3번의 기회를 다쓰면 게임이 끝난다. (더이상 추측 불가, 버튼이 disable)
// 유저가 1~50 범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다.
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회를 깍지 않는다.

let randomNumber = 0;
let inputNum = document.getElementById("inputNumber");
let startBtn = document.getElementById("startButton");
let result = document.getElementById("result");
let resetBtn = document.getElementById("resetButton");
let chanceArea = document.getElementById("chance");
let inputHistory = document.getElementById("inputHistory");
let chance = 3;
let gameEnd = false;
let inputNumList = [];
let change = document.getElementById("changeImg");

startBtn.style.cursor="pointer";

function computerNum(){
    randomNumber = Math.floor(Math.random() * 50) + 1;    // 범위를 1 ~ 50으로 수정
    console.log(randomNumber);
}

startBtn.addEventListener("click", start);
resetBtn.addEventListener("click", reset);

// input 창에 포커스를 두면 바로 그전에 입력한 값이 지워지기
inputNum.addEventListener("focus", function(){
    inputNum.value="";
})

// startbutton을 눌렀을 때 반응
function start(){

  if (gameEnd) return;

  let inputNumValue = parseInt(inputNum.value);  // 문자열을 숫자로 변환
  console.log(inputNumValue);

  if(inputNumValue > 50 || inputNumValue < 1){
      result.textContent = "1부터 50사이의 숫자만 입력해주세요."
      return;
  }

  if(inputNumList.includes(inputNumValue)){
      result.textContent = "이미 입력한 숫자입니다."
      return;
  }

  inputNumList.push(inputNumValue);
  console.log(inputNumList);
  inputHistory.style.display = 'block';  // 입력한 숫자가 있을 때 보이도록 설정
  inputHistory.textContent = `입력한 숫자들: ${inputNumList.join(", ")}`;  // 입력한 숫자들 표시

  chance--;

  chanceArea.textContent =`남은 기회 : ${chance}`;

  if(inputNumValue < randomNumber){
      change.src="image/up.gif"
      result.textContent = "UP!!";
      
  } else if(inputNumValue > randomNumber){
      result.textContent = "DOWN!!";
      change.src="image/down.gif"
  } else {
      result.textContent = "정답입니다!!!";
      change.src="image/success.gif"
      gameEnd=true;
  }

  if (chance === 0 && inputNumValue !== randomNumber) {
    change.src="image/dying.gif"
    gameEnd = true;
    result.textContent = `기회를 모두 소진했습니다. 정답은 ${randomNumber}였습니다.`;
  }

  if(gameEnd){
    startBtn.disabled = true;
    startBtn.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
    startBtn.style.cursor = "default";
  }
};
 
function reset(){
    inputNumValue="";
    computerNum();
    gameEnd = false;
    chance = 3;
    startBtn.disabled = false;
    startBtn.style.backgroundColor = "rgba(0, 0, 0, 1)";
    startBtn.style.cursor = "pointer";
    chanceArea.textContent =`남은 기회 : ${chance}`;
    inputNumList = [];
    inputHistory.textContent = "입력한 숫자들: ";
    inputHistory.style.display = 'none';  // 리셋 시 숨김
    result.textContent = "도전해봐~🙌";
    change.src="https://media1.giphy.com/media/9DinPR8bzFsmf74j9W/giphy.gif";
};

computerNum();