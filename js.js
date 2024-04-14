let board = $(".gameBoard");
let guide = $(".guide");
let speed = 100;
let gameInterval;
let gridSize = 20;
let snake = [{x: gridSize / 2, y: gridSize / 2}];
let direction="bottom";
let food=creatFood();
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
    let head ={... snake[0]};
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
    snake.unshift(head);//them phan tu head moi vao mang snake
    if(isFoodEaten()){
        food = creatFood();
        score++;
        console.log(score);
    }else {
        snake.pop();
    }
}
function isFoodEaten(){
    let head = snake[0];
    return (head.x === food.x && head.y===food.y)
}
//ve tat ca cac thanh phan
function draw() {
    board.empty();
    drawSnake();
    drawFood();
}
function creatElement(className){
    return $("<div>").addClass(className);
}
function drawSnake() {
    snake.forEach((part,index) =>{
        let className = index===0?"snakeHead":"snakeBody"
        let snakeElement = creatElement(className);
        setPos(snakeElement,part);
        board.append(snakeElement);
    })
}
function creatFood(){
    let foodX = Math.ceil(Math.random()*20);
    let foodY = Math.ceil(Math.random()*20);
    return {x:foodX,y:foodY};
}
function drawFood() {
        let foodElement = creatElement("food");
        setPos(foodElement,food);
        board.append(foodElement);
}
function setPos(snakeElement,part){
    snakeElement.css("gridColumn",part.x);
    snakeElement.css("gridRow",part.y);
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
function checkCollisions(){
    let head = snake[0];
    function selfCollied(){
        for(let part of snake.slice(1,snake.length)){
            if(part.x===head.x && part.y===head.y) return true;
        }
    }

    let isWallCollied=(head.x > gridSize || head.x <0 || head.y > gridSize || head.y <0);
    if(isWallCollied || selfCollied()){
        stopGame();
    }
}
function startGame(){
    guide.hide();
    isPlaying=true;
    if(isPlaying){
        loop();
    }
}
function stopGame(){
    isPlaying=false;
    food=creatFood();
    snake = [{x: gridSize / 2, y: gridSize / 2}];
    direction="right";
    updateHighestScore();
    score=0;
    clearInterval(gameInterval);
    guide.show();
}
$(document).on("keydown", (event) =>{
    let eventKey= event.key;
    switch (eventKey){
        case (" "):
            startGame();
            break;
        //trái
        case ("ArrowLeft"):
        case ("a"):
            direction= direction ==="right"?direction:"left";
            break;
        //phải
        case ("ArrowRight"):
        case ("d"):
            direction= direction ==="left"?direction:"right";
            break;
        //lên
        case ("ArrowUp"):
        case ("w"):
            direction= direction ==="bottom"?direction:"top";
            break;
        //xuống
        case ("ArrowDown"):
        case ("s"):
            direction= direction ==="top"?direction:"bottom";
            break;
    }
})