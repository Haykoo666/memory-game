
const start_button = document.getElementById("start-button")
const boxes = document.querySelectorAll(".grid-item")
const level_title = document.getElementById("count-level")
const hidden_block = document.getElementsByClassName("hidden")[0]
const loader = document.getElementById("loader")
const cong_block = document.getElementsByClassName("congratulations")[0];
boxes[6].parentElement.style.display = "none";

let score = 0;
let  green_box_count = 0
let  level = 0;
let player_computer = new Set();
const player_user = [];

boxes.forEach((val) => val.addEventListener("click", (event) => {
  let clicked_index = +event.target.attributes.id.nodeValue;
  if (player_user.length >= player_computer.length) {
    let snackbar = document.getElementById("snackbar");
      snackbar.className = "show";
      setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
  } else {
    player_user.push(clicked_index);
    boxes[clicked_index].style.backgroundColor = "#333983";
  }
}));

start_button.onclick = function () {

  hidden_block.style.display = "block";
  hidden_block.style.height = "100%";

  hidden_block.style.height == "82%" ? hidden_block.style.height = "100%" : null;

  boxes.forEach((val, i) => {
    boxes[i].style.backgroundColor = "#d04546";
  })
  if (level >= 10) {
    cong_block.style.display = "flex";
    document.getElementsByClassName("cong-text")[0].innerText = `Congratulations your score is ${score}/10`
  } else {
    ++level;
  }
  level_title.style.visibility = "visible";
  level_title.innerHTML = `Level ${level}/10`
  start_button.innerText = "Next Level"
  score += player_user.length != 0 ? +compare(player_computer, player_user) : 0;
  console.log("🚀 ~ score", score)
  player_user.length = 0;

  player_computer = new Set();
  let maxSize = green_box_count = green_box_count === 6 ? 6 : ++green_box_count;
  for (let i = 0; i < maxSize; ++i) {
    while (player_computer.size != maxSize) {
      let index = Math.trunc(Math.random() * 12);
      player_computer.add(index);
    }
  }
  player_computer = [...player_computer];
  print_boxes();
}

async function print_boxes() {
  for (let i = 0; i < player_computer.length; ++i) {
    let x = await wait_some_sec(player_computer[i]);
    boxes[x].style.backgroundColor = "#048b3b";
    setTimeout(() => {
      boxes[x].style.backgroundColor = "#d04546";
    }, 570);

  }
  setTimeout(() => {
      hidden_block.style.display = "none";
  }, 900);

}

async function wait_some_sec(i) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(i);
    }, 560);
  })
}

function compare(arr_1, arr_2) {
  // arr_1.sort((a, b) => a - b);
  // arr_2.sort((a, b) => a - b);
  return JSON.stringify(arr_1) === JSON.stringify(arr_2);
}

setTimeout(() => {
  loader.style.display = "none";
  boxes[6].parentElement.style.display = "grid";
}, 3900);