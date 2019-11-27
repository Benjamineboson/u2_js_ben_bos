// var(s) that create three img elements for each chest.
var firstChest = document.createElement("img");
var secondChest = document.createElement("img");
var thirdChest = document.createElement("img");

// var to keep track of score, initially set to 0.
var score = 0;

// var that creates an h1 element, to display score.
var scoreBoard = document.createElement("h1");

// var to store url recieved from pexel's API. 
var pxl = "";

var first = function(){
  chestClicked(1);
};
var second = function(){
  chestClicked(2);
};
var third = function(){
  chestClicked(3);
};

addEventListener('load', function(){
  init(); 
});

function init(){
  initGameUI();
}

function initGameUI(){
  getImg();  
  initScoreBoard();
  initChests();
  initChestEventListeners();
  initRefreshButton();
}

function initChests(){
  firstChest.setAttribute("src", "images/chest-closed.png");
  firstChest.setAttribute("width", "230");
  firstChest.setAttribute("height", "180");
  firstChest.setAttribute("alt", "chest-1");
  firstChest.style.marginRight = "20px";
  secondChest.setAttribute("src", "images/chest-closed.png");
  secondChest.setAttribute("width", "230");
  secondChest.setAttribute("height", "180");
  secondChest.setAttribute("alt", "chest-2");
  thirdChest.setAttribute("src", "images/chest-closed.png");
  thirdChest.setAttribute("width", "230");
  thirdChest.setAttribute("height", "180");
  thirdChest.setAttribute("alt", "chest-3");
  thirdChest.style.marginLeft = "20px";
  document.getElementById("chests").appendChild(firstChest);
  document.getElementById("chests").appendChild(secondChest);
  document.getElementById("chests").appendChild(thirdChest);
}

function initScoreBoard(){
  scoreBoard.innerHTML = "Score: "+score;
  document.getElementById("game-wrapper").appendChild(scoreBoard);
  document.getElementById("game-wrapper").style.textAlign = "center";
  document.getElementById("game-wrapper").style.color= "white";
}

function finalScoreBoard(){
  score += 5;
  scoreBoard.innerHTML = "Score: "+score;
  document.getElementById("game-wrapper").appendChild(scoreBoard);
}

function initRefreshButton(){
  var refreshButton = document.getElementById("refresh-button");
  refreshButton.addEventListener("click",function(){
    refresh();
  });
}

function initChestEventListeners() {
  firstChest.addEventListener("click", first);
  secondChest.addEventListener("click", second);
  thirdChest.addEventListener("click", third);
}

function placeTreassure(e){
  var random = Math.floor(Math.random()*4)+1;
  if (random == 3){
    getImg();  
  }
  if (e == 1){
    if (random == 3){
    firstChest.setAttribute("src", pxl);
    finalScoreBoard();
    }else{
    firstChest.setAttribute("src", "images/chest-open.png");
    }
  }else if (e == 2){
    if (random == 3){
    secondChest.setAttribute("src", pxl);
    finalScoreBoard();
    }else{
    secondChest.setAttribute("src", "images/chest-open.png");
    }
  }else{
    if (random == 3){
    thirdChest.setAttribute("src", pxl);
    finalScoreBoard();
    }else{
    thirdChest.setAttribute("src", "images/chest-open.png");
    }
  }
}

function chestClicked(e){
  removeChestEvents();
  if (e == 1){
    placeTreassure(1);
  }else if (e == 2){
    placeTreassure(2);
  }else if (e == 3){    
    placeTreassure(3);
  }
}

function refresh(){
  firstChest.setAttribute("src", "images/chest-closed.png");
  secondChest.setAttribute("src", "images/chest-closed.png");
  thirdChest.setAttribute("src", "images/chest-closed.png");
  initChestEventListeners();
}

function removeChestEvents(){
  firstChest.removeEventListener("click",first);
  secondChest.removeEventListener("click",second);
  thirdChest.removeEventListener("click",third);
}

function getImg(){
  ranNum = Math.floor(Math.random()*100)+1;
  var str = "https://api.pexels.com/v1/search?query=coin+query&per_page=1&page="+ranNum;
  var oReq = new XMLHttpRequest();
  oReq.open("GET", str,true);
  oReq.setRequestHeader("Authorization", "563492ad6f917000010000017ac95d6a83284af7bd0fc16905b5e22d",true);
  oReq.onload = function () {
    if (oReq.readyState == 4 && oReq.status == "200") {
      pxl = JSON.parse(oReq.responseText).photos[0].src.small;
    }
  }
  oReq.send();
}