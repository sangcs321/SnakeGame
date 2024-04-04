let board = $(".gameBoard");
let speed = 100;
let gameInterval;
let gridSize = 20;
let snake = [{x: gridSize / 2, y: gridSize / 2}];
let direction="bottom";
let food=creatFood();

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
    snake.pop();//xoa phan tu cuoi cung cua mang snake
}

//ve con ran
function draw() {
    board.empty();
    drawSnake();
    drawFood();
}
function creatElement(className){
    return $("<div>").addClass(className);
}
function drawSnake() {
    snake.forEach(part =>{
        let snakeElement = creatElement("snake");
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
loop();
function setPos(snakeElement,part){
    snakeElement.css("gridColumn",part.x);
    snakeElement.css("gridRow",part.y);
}
//goi lai lien tuc 2 ham tren
function loop() {
    //trong khoang thgian la speed se goi la 2 ham  update, draw
    gameInterval = setInterval(() => {
        update();
        draw();
    }, speed)
}
$(document).on("keydown", (event) =>{
    let eventKey= event.key;
    switch (eventKey){
        //trái
        case ("ArrowLeft"):
        case ("a"):
            direction="left";
            break;
        //phải
        case ("ArrowRight"):
        case ("d"):
            direction="right";
            break;
        //lên
        case ("ArrowUp"):
        case ("w"):
            direction="top";
            break;
        //xuống
        case ("ArrowDown"):
        case ("s"):
            direction="bottom";
            break;
    }
})