//Dang_Thanh_Sang_MSSV_21130511
let board = $(".gameBoard");
let gameContainer = $(".gameContainer");
let mainMenu = $(".mainMenu");
let menuContent=$(".menuContent");
let levelMenu=$(".levelMenu");
let gameOver=$(".gameOver");
let tryAgain=$(".tryAgain");
let guide = $(".guide");
let speed = 100;
let gameInterval;
let gridSize = 20;
let snake = [{x: gridSize / 2, y: gridSize / 2}];
snake.push({x: gridSize -1/ 2, y: gridSize / 2})
snake.push({x: gridSize -2/ 2, y: gridSize / 2})
let wall = [];
for (var col = 1; col <= gridSize; col++) {
    wall.push({x:1, y:col});
}
for (var col = 1; col <= gridSize; col++) {
    wall.push({x:gridSize, y:col});
}
for (var row = 2; row <= gridSize; row++) {
    wall.push({x:row, y:1});
}
for (var row = 2; row <= gridSize; row++) {
    wall.push({x:row, y:gridSize});
}
let direction="right";
let food={x:gridSize-5,y: gridSize-5};
let isPlaying = false;
let score=0;
let highestScore=0;
function updateScore(){
    $("#currentScore").text(score);
}
function updateHighestScore(){
    if(score > highestScore){
        highestScore=score;
        console.log("true");
    }
    $("#highestScore").text(score);
}
//cập nhật trạng thái các đối tượng của mình
function update() {
    let head ={... snake[0]};// tạo ra phần tử đầu mới dùng spread
    switch (direction){
        case("right"):{
            head.x++;
            break;
        }
        case("left"):{
            head.x--;
            break;
        }
        case("top"):{
            head.y--;
            break;
        }
        case("bottom"):{
            head.y++;
            break;
        }
    }
    snake.unshift(head);//thêm phần tử đầu mới vào mảng
    if(isFoodEaten()){// nếu không phải là thưcs ăn thì xóa phần tử cuối
        food = creatFood();
        score++;
        console.log(score);
    }else {
        snake.pop();// pop để lấy ra và xóa phần tử cuối của mảng
    }
}
function isFoodEaten(){//Kiểm tra thức ăn đc ăn chưa
    let head = snake[0];
    return (head.x === food.x && head.y===food.y)
}
function draw() {
    board.empty();
    drawSnake();
    drawFood();
}
// function draw2() {
//     board.empty();
//     drawSnake();
//     drawFood();
// }
function drawBorderWall(){// vẽ ra tường bao của trò chơi
    wall.forEach((part) =>{
        let wallElement = creatElement("wall");
        setPos(wallElement,part);
        board.append(wallElement);
    })
}
function creatElement(className){//tạo ra thẻ div có tên class là className
    return $("<div>").addClass(className);
}
function drawSnake() {
    snake.forEach((part,index) =>{
        let className = index===0?"snakeHead":"snakeBody"//lấy ra cái đầu của con rắn
        let snakeElement = creatElement(className);
        part.x>gridSize?part.x=1:part.x;
        part.y>gridSize?part.y=1:part.y;
        part.x<1?part.x=gridSize:part.x;
        part.y<1?part.y=gridSize:part.y;
        setPos(snakeElement,part);
        board.append(snakeElement);
    })
}
function creatFood(){
    let foodX = Math.ceil(Math.random()*gridSize);
    let foodY = Math.ceil(Math.random()*gridSize);
    for(let part of snake.slice(1,snake.length)){//kiểm tra đồ ăn có bị trùng với thân con rắn không nếu có thì gọi đệ quy lại
        if(part.x===foodX && part.y===foodY) {
            console.log("do an trung con ran");
            return creatFood();
        }
    }
    for(let part of wall){//kiểm tra đồ ăn có bị trùng với tường không nếu có thì gọi đệ quy lại
        if (part.x===foodX && part.y===foodY){
            console.log("do an trung tuong");
            return creatFood();
        }
    }
    return {x:foodX,y:foodY};
}
function drawFood() {
        let foodElement = creatElement("food");
        setPos(foodElement,food);
        board.append(foodElement);
}
//cài đặt vị trí cho các thành phần
function setPos(snakeElement,part){
    snakeElement.css("gridColumn",part.x);
    snakeElement.css("gridRow",part.y);
}
//kiểm tra đầu của con rắn có bị trùng với tường hay không
function isWall(){
    let isWall=false;
    let head = snake[0];
    wall.forEach((part) =>{
        if(head.x===part.x&& head.y===part.y){
            isWall=true;
        }
    })
    return isWall;
}
//goi lai lien tuc 2 ham tren
function loop() {
    clearInterval(gameInterval);
    //trong khoang thgian la speed se goi la 2 ham  update, draw
    gameInterval = setInterval(() => {
        if(isPlaying){
            updateScore();
            update();
            checkCollisions();
            draw();
        }
    }, speed)
}
function loop2(){
    gameInterval = setInterval(() => {
        if(isPlaying){
            updateScore();
            update();
            checkCollisions();
            checkCollisions2();
            draw();
            drawBorderWall();
        }
    }, speed)
}
function loop3(){
    gameInterval = setInterval(() => {
        if(isPlaying){
            updateScore();
            update();
            checkCollisions();
            checkCollisions2();
            draw();
            drawBorderWall();
        }
    }, 250)
}
// function loop4(){
//     gameInterval = setInterval(() => {
//         if(isPlaying){
//             updateScore();
//             update();
//             checkCollisions();
//             checkCollisions2();
//             draw();
//             drawBorderWall();
//             if(score%3===0 && score!==0){
//                 $(document).off("keydown", setupKeyHandler);
//                 $(document).on("keydown", setupReverseKeyHandler);
//                 console.log("choang");
//             }else{
//                 $(document).off("keydown", setupReverseKeyHandler);
//                 $(document).on("keydown", setupKeyHandler);
//             }
//         }
//     }, 250)
// }
//kiểm tra va chạm với thân con rắn
function checkCollisions(){
    let head = snake[0];
    function selfCollied(){
        for(let part of snake.slice(1,snake.length)){// lấy ra từng phần của con rắn trừ cái đầu
            if(part.x===head.x && part.y===head.y) return true;
        }
    }
    if(selfCollied()){
        stopGame();
    }
}
//kiểm tra va chạm với tường bao
function checkCollisions2(){
    let head= snake[0];
    if(isWall(head)){
        stopGame();
    }
}
function startGame(){
    guide.hide();
    tryAgain.show();
    isPlaying=true;
    if(isPlaying){
        $(document).off("keydown", setupReverseKeyHandler);
        $(document).on("keydown", setupKeyHandler);
        loop();

    }

}
function startGame2(){
    guide.hide();
    tryAgain.show();
    isPlaying=true;
    if(isPlaying){
        $(document).off("keydown", setupReverseKeyHandler);
        $(document).on("keydown", setupKeyHandler);
        loop2();

    }
}
function startGame3(){
    guide.hide();
    tryAgain.show();
    isPlaying=true;
    if(isPlaying){
        $(document).off("keydown", setupKeyHandler);
        $(document).on("keydown", setupReverseKeyHandler);
        loop3();

    }
}
// function startGame4(){
//     guide.hide();
//     tryAgain.show();
//     isPlaying=true;
//     if(isPlaying){
//         loop4();
//
//     }
// }
function stopGame(){
    isPlaying=false;
    snake = [{x: gridSize / 2, y: gridSize / 2}];
    snake.push({ x: gridSize / 2 - 1, y: gridSize / 2 });
    snake.push({ x: gridSize / 2 - 2, y: gridSize / 2 });
    direction="right";
    updateHighestScore();
    score=0;
    gameContainer.hide();
    gameOver.show();
    clearInterval(gameInterval);
    guide.show();
}
gameContainer.hide();
levelMenu.hide();
gameOver.hide();
$(document).ready(function(){
    $("#startGame").click(function(){
        menuContent.hide();
        levelMenu.show();
    });
    $("#back").click(function(){
        menuContent.show();
        levelMenu.hide();
    });
    $("#level1").click(function(){
        mainMenu.hide();
        gameContainer.show();
        startGame();
    });
    $("#level2").click(function(){
        mainMenu.hide();
        gameContainer.show();
        startGame2()
    });
    $("#level3").click(function(){
        mainMenu.hide();
        gameContainer.show();
        startGame3()
    });
    // $("#level4").click(function(){
    //     mainMenu.hide();
    //     gameContainer.show();
    //     startGame4()
    // });
    $("#tryAgain").click(function(){
        gameContainer.hide();
        gameOver.hide();
        console.log("choi lai");
        mainMenu.show();
        levelMenu.show();
    });

});
function handleKeyDown(event) {
    let eventKey = event.key;
    switch (eventKey) {
        //trái
        case "ArrowLeft":
        case "a":
            direction = direction === "right" ? direction : "left";
            break;
        //phải
        case "ArrowRight":
        case "d":
            direction = direction === "left" ? direction : "right";
            break;
        //lên
        case "ArrowUp":
        case "w":
            direction = direction === "bottom" ? direction : "top";
            break;
        //xuống
        case "ArrowDown":
        case "s":
            direction = direction === "top" ? direction : "bottom";
            break;
    }
}
function setupKeyHandler() {
    $(document).on("keydown", handleKeyDown);
}
function handleReverseKeyDown(event) {
    let eventKey = event.key;
    switch (eventKey) {
        //trái
        case "ArrowLeft":
        case "a":
            direction = direction === "left" ? direction : "right";
            break;
        //phải
        case "ArrowRight":
        case "d":
            direction = direction === "right" ? direction : "left";
            break;
        //lên
        case "ArrowUp":
        case "w":
            direction = direction === "top" ? direction : "bottom";
            break;
        //xuống
        case "ArrowDown":
        case "s":
            direction = direction === "bottom" ? direction : "top";
            break;
    }
}
function setupReverseKeyHandler() {
    $(document).on("keydown", handleReverseKeyDown);
}