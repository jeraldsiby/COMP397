
//Jerald_Siby(300983572)
//Mid_Term
//function called when the page is getting loaded
function init() {
    // stage created for create js
    var mainStage;  
    // queue defined
    var queue;
    //creating the image array to hold the dice images
    var ImageArray = [
        { id: "1", src: "../dice-1.png" },
        { id: "2", src: "../dice-2.png" },
        { id: "3", src: "../dice-3.png" },
        { id: "4", src: "../dice-4.png" },
        { id: "5", src: "../dice-5.png" },
        { id: "6", src: "../dice-6.png" },
        { id: "startImage", src: "../StartBtn.png" },
        { id: "gameOver", src: "../img5.png" }]
    preload();
    // bitmap image created for dice1
    var Dice1;  
    // bitmap image created for dice2
    var Dice2;  
     // textblock created for dice 1
    var txtBoxDice1; 
    // textblock created for dice 2
    var txtBoxDice2; 
    //game over image
    var gameoverImage;
    
    //preload function
    function preload() {
        queue = new createjs.LoadQueue();
        queue.on("complete", begin, this);
        queue.loadManifest(ImageArray);
    }
    
    //update and the next dice roll
    function showNewRoll() {
        // select the nect random dice
        var random1 = (Math.floor(Math.random() * 6) + 1);
        var random2 = (Math.floor(Math.random() * 6) + 1);
        var randomImg1 = queue.getResult(random1);
        var randomImg2 = queue.getResult(random2);
        // create the dice images using the random number
        Dice1 = new createjs.Bitmap(randomImg1);
        Dice2 = new createjs.Bitmap(randomImg2);
        Dice1.x = 640 - (Dice1.getBounds().width * 2) - 50;
        Dice2.x = 640 - (Dice1.getBounds().width) - 30;
        Dice1.y = 100;
        Dice2.y = 100;
        // create the text element and show the dice number
        txtBoxDice1 = new createjs.Text(random1);
        txtBoxDice2 = new createjs.Text(random2);
        txtBoxDice1.x = Dice1.x + (Dice1.getBounds().width * 0.4);
        txtBoxDice2.x = Dice2.x + (Dice2.getBounds().width * 0.4);
        txtBoxDice1.y = 100 + Dice1.getBounds().height + 10;
        txtBoxDice2.y = 100 + Dice2.getBounds().height + 10;
        // add the text element and dice to stage
        mainStage.addChild(Dice1);
        mainStage.addChild(Dice2);
        mainStage.addChild(txtBoxDice1);
        mainStage.addChild(txtBoxDice2);
        if (random1 == random2) {
            gameOver();
        }
    }

    //this function starts the game
    //creates the canvas element
    function begin() {
        mainStage = new createjs.Stage(document.getElementById("gameCanvas"));
        createjs.Ticker.setFPS(60);
        // the update event listener count the number of frames
        createjs.Ticker.on("tick", updateListener, this);
        // setting up the start button and adding to the stage
        var startImage = queue.getResult("startImage");
        var startBtn = new createjs.Bitmap(startImage);
        startBtn.addEventListener("click", showNewRoll);
        startBtn.x = 320;
        startBtn.y = 430;
        mainStage.addChild(startBtn);
    }

    // Game over handler
    function gameOver() {
        var gameoverImage = queue.getResult("gameOver");
        var gameover = new createjs.Bitmap(gameoverImage);
        gameover.x = 320;
        gameover.y = 430;
        mainStage.addChild(gameover);
    }
    // ticker handler
    function updateListener() {
        mainStage.update();
    }
};

