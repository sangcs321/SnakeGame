let board = $(".gameBoard");
let speed = 100;
let gameInterval;
let gridSize = 20;
let snake = [{x: gridSize / 2, y: gridSize / 2}];
let direction="bottom";
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
        case ("ArrowLeft"):
            direction="left";
            break;
        case ("a"):
            direction="left";
            break;
        case ("ArrowRight"):
            direction="right";
            break;
        case ("d"):
            direction="right";
            break;
        case ("ArrowUp"):
            direction="top";
            break;
        case ("w"):
            direction="top";
            break;
        case ("ArrowDown"):
            direction="bottom";
            break;
        case ("s"):
            direction="bottom";
            break;
    }
})