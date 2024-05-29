//  just begin with sorting of 10 numbers
let container = document.querySelector(".container");
// let range = document.querySelector("#val").value;
const n = prompt("How Many Bars Wanna Sorted");
const array = [];
init();

// lets work on audio
let audioctx = null;
function playNote(freq){
    if(audioctx == null){
        audioctx = new(
             AudioContext ||
             webkitAudioContext ||
             window.webkitAudioContext
        )();
    }
    const dur = 0.1;
    const osc = audioctx.createOscillator();
    osc.frequency.value = freq;
    osc.start();
    osc.stop(audioctx.currentTime+dur);
    const node = audioctx.createGain();
    node.gain.value = 0.1;
    node.gain.linearRampToValueAtTime(
        0,audioctx.currentTime+dur
    );
    osc.connect(node);
    node.connect(audioctx.destination);
}


// generating random numbers
function init() {
  for (let i = 0; i < n; i++) {
    array[i] = Math.random();
  }
  showbars();
}
function play() {
  const copy = [...array];
  const moves = bubbleSort(copy);
  animate(moves);
}

function animate(moves) {
  if (moves.length == 0) {
    showbars();
    return;
  }
  const move = moves.shift();
  const [i, j] = move.indices;
  if (move.type == "swap") {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  playNote(200+array[i]*500);
  playNote(200+array[j]*500);
  showbars(move);
  setTimeout(function () {
    animate(moves);
  }, 100);
}
// bubble sort
let swapped;
function bubbleSort(array) {
  const moves = [];
  do {
    swapped = false;
    for (let i = 1; i < array.length; i++) {
    //   moves.push({ indices: [i - 1, i], type: "comp" });
      if (array[i - 1] > array[i]) {
        swapped = true;
        moves.push({ indices: [i - 1, i], type: "swap" });
        let temp = array[i];
        array[i] = array[i - 1];
        array[i - 1] = temp;
      }
    }
  } while (swapped);
  return moves;
}

// creating bars
function showbars(move) {
  // we did below line because every time we press button of play and init bars appended to previous one so to avoid this ....
  container.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.style.height = array[i] * 100 + "%";
    bar.classList.add("bar");

    if (move && move.indices.includes(i)) {
        bar.style.backgroundColor = move.type == "comp" ?"white":"green";
    }
    container.appendChild(bar);
  }
}
