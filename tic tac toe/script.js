console.log("Welcome to Tic Tac Toe");

const music = new Audio("music.mp3");
const audioTurn = new Audio("ting.mp3");
const gameover = new Audio("gameover.mp3");
let turn = "X";
let isgameover = false;

const changeTurn = () => (turn === "X" ? "O" : "X");

const checkWin = () => {
  const boxtext = document.getElementsByClassName("boxtext");
  const wins = [
    [0, 1, 2, 5, 5, 0],
    [3, 4, 5, 5, 15, 0],
    [6, 7, 8, 5, 25, 0],
    [0, 3, 6, -5, 15, 90],
    [1, 4, 7, 5, 15, 90],
    [2, 5, 8, 15, 15, 90],
    [0, 4, 8, 5, 15, 45],
    [2, 4, 6, 5, 15, 135],
  ];

  wins.forEach(e => {
    const [a, b, c] = e;
    if (
      boxtext[a].innerText &&
      boxtext[a].innerText === boxtext[b].innerText &&
      boxtext[a].innerText === boxtext[c].innerText
    ) {
      document.querySelector(".info").innerText = `${boxtext[a].innerText} Won 🎉`;
      isgameover = true;
      document.querySelector(".imgbox img").style.width = "200px";
      document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
      document.querySelector(".line").style.width = "20vw";
      [a, b, c].forEach(i => boxtext[i].parentElement.style.backgroundColor = "#d1c4e9");
      gameover.play();
    }
  });
};

const boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(box => {
  const boxtext = box.querySelector(".boxtext");
  box.addEventListener("click", () => {
    if (boxtext.innerText === "" && !isgameover) {
      boxtext.innerText = turn;
      audioTurn.play();
      checkWin();
      if (!isgameover) {
        turn = changeTurn();
        document.querySelector(".info").innerText = "Turn for " + turn;
      }
    }
  });
});

document.getElementById("reset").addEventListener("click", () => {
  const boxtexts = document.querySelectorAll(".boxtext");
  boxtexts.forEach(box => (box.innerText = ""));
  turn = "X";
  isgameover = false;
  document.querySelector(".line").style.width = "0vw";
  document.querySelector(".info").innerText = "Turn for X";
  document.querySelector(".imgbox img").style.width = "0px";
  Array.from(boxes).forEach(box => (box.style.backgroundColor = "white"));
});
