// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x;
let y;
let xSpeed;
let ySpeed;

let count;

let frameWidth;
let frameHeight;
let frameStartX;
let frameStartY;

const audioContext = new AudioContext;
const osc = audioContext.createOscillator();
const gain = audioContext.createGain();


function setup() {
  //Audio Connections
  osc.connect(gain);
  gain.connect(audioContext.destination);

  osc.frequency.setValueAtTime(440,audioContext.currentTime);
  osc.type ="sine";
  osc.start();

  gain.gain.setValueAtTime(0, audioContext.currentTime);

  count = 0;


  windowResized();
}

function draw() {
  background(0);
  x += xSpeed;
  y += ySpeed;
  if (x >= frameStartX + frameWidth -10 || x <= frameStartX + 10){
    xSpeed *= -1;
    soundTrigger();
  }
  if (y >= frameStartY + frameHeight -10 || y <= frameStartY +10){
    ySpeed *= -1;
    soundTrigger();
  }
  noStroke();
  fill(255);
  circle(x,y,20);
  textSize(15);
  textAlign(LEFT,TOP);
  text(count,20,20);

  textAlign(CENTER,CENTER);
  textSize(100);
  text('work',width*0.5,height*0.1);

  strokeWeight(2);
  noFill();
  stroke(255);
  rect(frameStartX,frameStartY,frameWidth,frameHeight);


}


function windowResized(){
  createCanvas(windowWidth, windowHeight);
  frameWidth = width * 0.6;
  frameHeight = height * 0.6;
  frameStartX = (width - frameWidth) * 0.5;
  frameStartY = (height - frameHeight) * 0.5;
  frameStartY
  x = width * 0.5;
  y = height * 0.5;
  xSpeed = 15;
  ySpeed = 10;
}

function mousePressed(){
  audioContext.resume();


}
function soundTrigger(){
  count ++;
  gain.gain.setTargetAtTime(1.0, audioContext.currentTime, 0.005);
  gain.gain.setTargetAtTime(0, audioContext.currentTime + 0.05, 0.01);
  osc.frequency.setTargetAtTime(660,audioContext.currentTime,0.005);
  osc.frequency.setTargetAtTime(440,audioContext.currentTime+0.005,0.02);
}
