'use strict';

// var canvas= document.querySelector('canvas');
// var ctx= canvas.getContext('2d');

var canvas = document.querySelector("#myCanvas");
var ctx = canvas.getContext("2d");
var i = 0;
var motionTrailLength = 10;
const mtPositions = []; //for motion motion trail
const positions = []; //star positions
let data = {
  totalStars: 0,
  totalCurrent: 0,
  totalMPS: 0,
  starTotal: function(){return this.totalStars}
};
var y = data.totalStars;
let x = function(){
  return Math.ceil(y) * .1;
}
// var xPos = -100;
// var yPos = 170;
function shoot() {
  data.totalStars += data.totalMPS;
  data.totalCurrent += data.totalMPS;
  update();
}
function update(){
  $('#currentTotal').text(Math.floor(data.totalCurrent));
  $('#mps').text((data.totalMPS/70.4).toFixed(3));
}
$('#myCanvas').click(function (){
  data.totalStars ++;
  data.totalCurrent ++;
  update();
  console.log(x);
  console.log(Math.ceil(data.totalStars * .1));

});
$('.button').click(function(){
  var addVal = $(this).data('cost');
  if ($(this).data('cost') < data.totalCurrent){
    data.totalCurrent -= parseFloat($(this).data('cost').toPrecision(2));
    data.totalMPS += parseFloat($(this).data('val'));
    $(this).children('span').html(parseInt($(this).children('span').html()*1.5));
    $(this).data('cost', parseInt($(this).data('cost') * 1.5));
  }
  update();
  console.log(x);
})
function randomNum(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random()* (max - min)) + min;
}
//making motion trail;
function storeLastPosition(x, y, radius){
  mtPositions.push({
    x: x,
    y: y,
    radius: radius
  });
}
if (mtPositions.length > motionTrailLength){
  mtPositions.shift();
}
function drawStar(x, y, radius){
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(
    (i / 10 + x) % 700,
    (i / 10 + y) % 550,
    radius,
    0,
    2 * Math.PI,
    false
  );
  ctx.fill();
  i += 3;
  // storeLastPosition(x, y, radius);
}

console.log(data.totalStars);

//Dinh, I want the checked condition (i<10) in the following loops to take
// Math.ceil(data.totalStars * .0001),  so that it will populate the canvas
//as the number of clicks increases.  I can't get it to work even though
//data.totalStars IS a number, not a string.  This is the only thing that needs
//to be done to make this application function properly.
for (let i = 0; i < 10; i++){
  console.log('test');
  positions.push([randomNum(0, 700), randomNum(0, 550), randomNum(0, 10)])
  // mtPositions.push

}
setInterval(() =>{
  ctx.clearRect(0, 0, 700, 550);
  // for (let i = 0; i < mtPositions.length; i++){
  //   ctx.beginPath();
  //   ctx.arc(mtPositions[i].x, mtPositions[i].y, mtPositions[i].radius, 0, 2* Math.PI, false);
  //   ctx.fillStyle = "white";
  //   ctx.fill();
  // }
  shoot();
  for (let i = 0; i <10; i++){
    drawStar(positions[i][0], positions[i][1], positions[i][2])
  }
  console.log(positions[0]);

}, 10) ;
// function update() {
//   context.clearRect(0, 0, canvas.width, canvas.height);
//
//   context.beginPath();
//   context.arc(xPos, yPos, 10, 0, 2 * Math.PI, true);
//   context.fillStyle = "#FF6A6A";
//   context.fill();
//
//   // update position
//   if (xPos > canvas.width) {
//     xPos = -100;
//   }
//   xPos += 6;
//
//   requestAnimationFrame(update);
// }
// update();
