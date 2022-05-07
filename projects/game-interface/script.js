const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const window_width = window.innerWidth;
const window_height = window.innerHeight;

canvas.width = window_width;
canvas.height = window_height;

var current = 0;
var musicPlaying = false;
var music = document.getElementById("myPlayer");
$("#myPlayer").bind("ended", function(){
    current++;
    music.src = "./audio/" + current%6 + ".mp3";
    music.load();
    music.play();
});

class Circle {
        constructor(xpoint, ypoint, radius, color) {
            this.xpoint = xpoint;
            this.ypoint = ypoint;
            this.radius = radius;
            this.color = color;
        }

        draw(ctx) {
            ctx.beginPath();
            ctx.arc(this.xpoint, this.ypoint, this.radius, 0, Math.PI * 2, false);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }

        changeColor(newcolor){
            this.color = newcolor;
            this.draw(ctx);
        }

        clickCircle(xmouse, ymouse){
            const distance =
            Math.sqrt(
            ( ( xmouse - this.xpoint ) * ( xmouse - this.xpoint ) )
            +
            ( ( ymouse - this.ypoint ) * ( ymouse - this.ypoint ) )
            );

            if(distance < this.radius) {
                this.changeColor('#f65');
                return true;
            } else {
                return false;
            }
        }

        removeClick(){
            this.changeColor('red');
            return true;
        }
    }

class Button {
    constructor(xpoint, ypoint, buttonWidth, buttonHeight, color) {
        this.xpoint = xpoint;
        this.ypoint = ypoint;
        this.buttonWidth = buttonWidth;
        this.buttonHeight = buttonHeight;
        this.color = color;
    }

    draw(context) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.xpoint, this.ypoint, this.buttonWidth, this.buttonHeight, false);
    }
}

window.addEventListener('load', menu = () => {
    ctx.fillStyle = '#555';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let circle = new Circle(canvas.width/2, canvas.height/2, 200, 'red');

    circle.draw(ctx);
    ctx.textAlign = 'center';
    ctx.fillStyle = 'Black';
    ctx.font = "40px Arial";
    ctx.fillText('Play', canvas.width/2,  canvas.height/2);

    canvas.addEventListener('mousedown', click = (event) =>{
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        circle.clickCircle(x, y);

        const distance =
            Math.sqrt(
            ( Math.pow( ( x - circle.xpoint ), 2) )
            +
            ( Math.pow( ( y - circle.ypoint ), 2) )
        );

        if(distance < circle.radius) {
            removeListeners();
            rule();
            setTimeout(()=>{
                gamestart();
            }, 10 * 1000)
        }

    });

    canvas.addEventListener('mouseup', removeClick = (event) =>{
        circle.removeClick();
    });

    canvas.addEventListener('mousemove', hover = (event) =>{
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const distance =
            Math.sqrt(
            ( Math.pow( ( x - circle.xpoint ), 2) )
            +
            ( Math.pow( ( y - circle.ypoint ), 2) )
        );
        if(distance < circle.radius) {
            circle.changeColor('yellow');
            ctx.fillStyle = "#555";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            circle.radius = 190;
            circle.draw(ctx);
            ctx.textAlign = 'center';
            ctx.fillStyle = 'Black';
            ctx.font = "40px Arial";
            ctx.fillText('Play', canvas.width/2,  canvas.height/2);
        } else {
            circle.changeColor('red');
            circle.radius = 200;
            ctx.textAlign = 'center';
            ctx.fillStyle = 'Black';
            ctx.font = "40px Arial";
            ctx.fillText('Play', canvas.width/2,  canvas.height/2);
        }
    });
});

function gamestart(){
    let enemies = [];
    let pauseButtons = [];
    let score = 60;
    let gameOver = false;
    let win = false;
    let pause = false;

    class InputHandler {
        constructor(){
            this.keys = [];
            //использована стрелочная функция чтобы иметь доступ к this родителя
            window.addEventListener('keydown', this.keydown);
            window.addEventListener('keyup', this.keyup);
        }

        keydown = (e) => {
            if ((       e.code === 'KeyS'||
                        e.code === 'KeyW'||
                        e.code === 'KeyA'||
                        e.code === 'KeyD')
                        && this.keys.indexOf(e.code) === -1){
                    this.keys.push(e.code)
                }
                else if(e.code === 'Space') restartGame();
                else if(e.code === 'Escape') pauseGame();
                else if(e.code === 'Enter') resumeGame();
        }

        keyup = (e) => {
            if (    e.code === 'KeyS'||
                    e.code === 'KeyW'||
                    e.code === 'KeyA'||
                    e.code === 'KeyD'){
                this.keys.splice(this.keys.indexOf(e.code), 1);
            }
        }

        destroyListeners() {
            window.removeEventListener("keydown", this.keydown);
            window.removeEventListener("keydown", this.keyup);
        }
    }

    class Player {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 50;
            this.height = 50;
            //положение игрока
            this.x = canvas.width/2;
            this.y = canvas.height/2;
            //cкорость игрока
            this.speedX = 0;
            this.speedY = 0;

        }
        draw(context){
            ctx.fillStyle = "green";
            ctx.fillRect(this.x, this.y, this.width, this.height);

        }
        update(input, enemies){
            //коллизия
            enemies.forEach(enemy => {
                if (this.x + this.width > enemy.x &&
                    this.x < enemy.x + enemy.width &&
                    this.y + this.height > enemy.y &&
                    this.y < enemy.y + enemy.height){
                    gameOver = true;
                }
            })
            //движение
            if (input.keys.indexOf('KeyD') > -1){
                if (input.keys.indexOf('KeyS') > -1){
                    this.speedY = 8;
                }else if(input.keys.indexOf('KeyW') > -1){
                    this.speedY = -8;
                }else{
                    this.speedY = 0;
                }
                this.speedX = 8;
            } else if (input.keys.indexOf('KeyA') > -1){
                if (input.keys.indexOf('KeyS') > -1){
                    this.speedY = 8;
                }else if(input.keys.indexOf('KeyW') > -1){
                    this.speedY = -8;
                }else{
                    this.speedY = 0;
                }
                this.speedX = -8;
            } else if (input.keys.indexOf('KeyW') > -1){
                this.speedY = -8;
                this.speedX = 0;
            } else if (input.keys.indexOf('KeyS') > -1){
                this.speedY = 8;
                this.speedX = 0;
            }else{
                this.speedX = 0;
                this.speedY = 0;
            }
            //движение
            this.x += this.speedX;
            this.y += this.speedY;

            //ограничение движения по вертикали
            if (this.x < 0){this.x = 0;}
            else if (this.x > this.gameWidth - this.width)
            {this.x = this.gameWidth - this.width}
            //ограничение движения по горизонтали
            if (this.y < 0){this.y = 0;}
            else if (this.y > this.gameHeight - this.height)
            {this.y = this.gameHeight - this.height}

            this.secondX = this.x + this.width;
            this.secondY = this.y + this.height;
            this.centerX = (this.x + this.secondX) / 2;
            this.centerY = (this.y + this.secondY) / 2;
        }
        restart(){
            this.x = canvas.width/2;
            this.y = canvas.height/2;
        }
    }

    class Background {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('backgroundImage');
            this.width = 1920;
            this.height = 880;

            this.x = 0;
            this.y = 0;
        }
        draw(context){
//            context.drawImage(this.image, this.x, this.y, canvas.width, canvas.height);
        }
    }

    class Enemy {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 100;
            this.height = 100;

            this.randX = Math.floor(Math.random() * (this.gameWidth - this.width))
            this.randY = Math.floor(Math.random() * (this.gameHeight - this.height));

            while(
                this.randX > player.centerX - this.width - 200 &&
                this.randX < player.centerX + 200 &&
                this.randY > player.centerY - this.height - 200 &&
                this.randY < player.centerY + 200){
                    this.randX = Math.floor(Math.random() * (this.gameWidth - this.width));
                    this.randY = Math.floor(Math.random() * (this.gameHeight - this.height));
            }
            this.x = this.randX;
            this.y = this.randY;

            this.speed = 5;
            this.flagToDelete = false;
            this.secondX = this.x + this.width;
            this.secondY = this.y + this.height;
            this.centerX = (this.x + this.secondX) / 2;
            this.centerY = (this.y + this.secondY) / 2;
        }
        draw(context){
            ctx.fillStyle = "red";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        update(){
            if (this.centerX != player.centerX && this.centerY != player.centerY){
                this.angel = 180*Math.atan2(player.centerX - this.centerX, player.centerY - this.centerY)/Math.PI;
                this.x += this.speed * Math.sin(this.angel * (Math.PI/180));
                this.y += this.speed * Math.cos(this.angel * (Math.PI/180));
            }
        }
    }

    canvas.addEventListener('mousedown', click = (event) =>{
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if(x < buttonPause.xpoint + buttonPause.buttonWidth &&
           x > buttonPause.xpoint &&
           y < buttonPause.ypoint + buttonPause.buttonHeight &&
           y > buttonPause.buttonHeight) {
            pauseGame();
        }
    });

    function handlerEnemies(deltaTime){
        if(enemyTimer > enemyInterval){
            //когда таймер доходит до предела,
            //создаем нового врага и сбрасываем таймер до 0
            enemies.push(new Enemy(canvas.width, canvas.height));
            enemyTimer = 0;
            if(!pause){
                score--;
            }
            if(score <= 0){
                win = true;
                enemies.length = 0;
            }

        } else {
            //отсчет до следующего создания врага
            enemyTimer += deltaTime;
        }
        enemies.forEach(enemy => {
            enemy.draw(ctx);
            enemy.update();
        });
    }

    let newEnemey = setInterval(() => {
        enemies.shift();
    }, 1.3 * 1000);

    function callRule(){
        rule();

        let resume = new Button( (canvas.width/2) - 50, 50, 100, 50, 'blue' );

        resume.draw(ctx);
        ctx.fillStyle = 'black';
        ctx.fillText('Resume', canvas.width/2, 80 );

        canvas.addEventListener('mousedown', click = (event) =>{
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            if(x < resume.xpoint + resume.buttonWidth &&
               x > resume.xpoint &&
               y < resume.ypoint + resume.buttonHeight &&
               y > resume.ypoint) {
                callRemoveEvent();
                resumeGame();
            }
        });
    }
    function callSettings(){
        settings();

        let resume = new Button( (canvas.width/2) - 50, 200, 100, 50, 'blue' );

        resume.draw(ctx);
        ctx.fillStyle = 'black';
        ctx.fillText('Resume', canvas.width/2, 230);

        canvas.addEventListener('mousedown', click = (event) =>{
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            if(x < resume.xpoint + resume.buttonWidth &&
               x > resume.xpoint &&
               y < resume.ypoint + resume.buttonHeight &&
               y > resume.ypoint) {
                callRemoveEvent();
                resumeGame();
            }
        });
    }

    function callRemoveEvent(){
        removeListeners();
    }

    function pauseTab(){
        ctx.fillStyle = 'rgba(255, 255, 51, .5)';
        ctx.fillRect(50, 50, canvas.width - 100, canvas.height - 100);
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.fillText('Pause', canvas.width/2, 150, canvas.width - 20 );

        let resume = new Button( (canvas.width/2) - 50, 200, 100, 50, 'blue');
        let rule = new Button( (canvas.width/2) - 50, 350, 100, 50, 'green');
        let settings = new Button( (canvas.width/2) - 50, 500, 100, 50, 'green');
        let escape = new Button( (canvas.width/2) - 50, 650, 100, 50, 'pink');

        resume.draw();
        rule.draw();
        settings.draw();
        escape.draw();

        ctx.fillStyle = 'black';
        ctx.font = '30px Leto Text Sans';
        ctx.fillText('Resume', canvas.width/2, 230);
        ctx.fillText('Rule', canvas.width/2, 380);
        ctx.fillText('Settings', canvas.width/2, 530);
        ctx.fillText('Escape', canvas.width/2, 680);

        pauseButtons.push(resume, rule, settings, escape);

        canvas.addEventListener('mousedown', click = (event) =>{
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            if(x < resume.xpoint + resume.buttonWidth &&
               x > resume.xpoint &&
               y < resume.ypoint + resume.buttonHeight &&
               y > resume.ypoint) {
                callRemoveEvent();
                resumeGame();
                buttonPause.color = 'blue';
                buttonPause.draw(ctx);
            }
            if(x < rule.xpoint + rule.buttonWidth &&
               x > rule.xpoint &&
               y < rule.ypoint + rule.buttonHeight &&
               y > rule.ypoint){
                callRemoveEvent();
                callRule();
            }
            if(x < settings.xpoint + settings.buttonWidth &&
               x > settings.xpoint &&
               y < settings.ypoint + settings.buttonHeight &&
               y > settings.ypoint){
                callRemoveEvent();
                callSettings();
            }
            if(x < escape.xpoint + escape.buttonWidth &&
               x > escape.xpoint &&
               y < escape.ypoint + escape.buttonHeight &&
               y > escape.ypoint){
                callRemoveEvent();
                input.destroyListeners();
                menu();
            }
        });
    }

    function displayStatusText(context){
        context.fillStyle = 'aqua';
        context.font = '40px Leto Text Sans';
        context.textAlign = 'left';
        context.fillText('Time: ' + score, 20, 50);

        if(gameOver){
            context.fillStyle = '#333';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.textAlign = 'center';
            context.fillStyle = 'white';
            context.fillText('Game over, press Space to restart, time to win: ' + score, canvas.width/2, 250, canvas.width - 20 );
        }
        if(win){
            context.fillStyle = '#333';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.textAlign = 'center';
            context.fillStyle = 'white';
            context.fillRect(this.x, this.y, this.width, this.height);
            context.fillText('Victory! Congratulations!', canvas.width/2, 250, canvas.width - 20 );
        }
        if(pause){
            pauseTab();
        }
    }

    function pauseGame(){
        pause = true;
    }

    function restartGame(){
        player.restart();
        win = false;
        pause = false;
        enemies.length = 0;
        gamestart();
    }

    function resumeGame(){
        pause = false;
        ctx.globalAlpha = 1;
        animate(0);
    }

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const buttonPause = new Button(canvas.width - 100, 50, 50, 50, 'blue');

    const background = new Background(canvas.width, canvas.height);

    let lastTime = 0;        //значение времени из предыдущего вызова цикла
    let enemyTimer = 0;      //значение нудя до предела (enemyInterval)
                             //сбрасывается до нуля при достижении предела
    let enemyInterval = 1000;//интервал добавления врага

    function animate(timeStamp){
        //разница во времени между предыдущим циклом и текущим
        //сколько времени нужно на отрисовку одного кадра
        //timeStamp время от текущего цикла (создается автоматически)
        const deltaTime = timeStamp - lastTime;
        //меняем значение предыщего цикла на текущий
        //для использования дальше
        lastTime = timeStamp;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background.draw(ctx);

        player.draw(ctx);
        player.update(input, enemies);

        buttonPause.draw(ctx);
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.font = '22px Leto Text Sans';
        ctx.fillText('Pause', canvas.width - 75, 80);

        handlerEnemies(deltaTime);

        displayStatusText(ctx);

        if (!gameOver && !win && !pause){
            requestAnimationFrame(animate);
        }
    }
    animate(0); //т.к. timeStamp генерируется при вызове функции, то первыый раз передаем 0
    return win;
}

function rule(){
    pause = true;

    ctx.fillStyle = 'rgba(255, 255, 51, 1)';
    ctx.fillRect(50, 50, canvas.width - 100, canvas.height - 100);
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.font = '30px Leto Text Sans';

    ctx.fillText("Правила игры", canvas.width/2, 130, canvas.width-100 );
    ctx.fillText("Игра длиться 1 минуту", canvas.width/2, 170, canvas.width-100 );
    ctx.fillText("Цель игры заключается в том чтобы избежать летающих чудищ и прожить 1 минуту", canvas.width/2, 210, canvas.width-100 );
    ctx.fillText("По истечению времнни игра заканчивается", canvas.width/2, 250, canvas.width-100 );

    ctx.fillText("Важно!", canvas.width/2, 340 );
    ctx.fillText("Враг пропадает, прожив 1.3 сек. Изаначально враги летят в сторону игрока", canvas.width/2, 380, canvas.width-100 );

    ctx.fillText("Управление", canvas.width/2, 460 );
    ctx.fillText("W - движение вверх", canvas.width/2, 500 );
    ctx.fillText("A - движение влево", canvas.width/2, 540 );
    ctx.fillText("S - движение вниз", canvas.width/2, 580 );
    ctx.fillText("D - движение вправо", canvas.width/2, 620 );
    ctx.fillText("Space - перезапуск уровня", canvas.width/2, 660 );
}

function settings(){
    pause = true;

    ctx.fillStyle = 'rgba(255, 255, 51, 1)';
    ctx.fillRect(50, 50, canvas.width - 100, canvas.height - 100);

    const playMusicButton = new Button( (canvas.width/2) - 50, 300, 100, 50, 'green');
    const plusButton = new Button( (canvas.width/2) - 100, 600, 50, 50, 'red');
    const minuseButton = new Button( (canvas.width/2) + 50, 600, 50, 50, 'red');

    playMusicButton.draw(ctx);
    plusButton.draw(ctx);
    minuseButton.draw(ctx);

    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.font = '30px Leto Text Sans';

    ctx.fillText('Settings', canvas.width/2, 150, canvas.width - 20 );
    ctx.fillText('Music', canvas.width/2, 330, canvas.width);
    ctx.fillText('Music Volume', canvas.width/2, 530);
    ctx.fillText('+', (canvas.width/2) - 75, 630);
    ctx.fillText('-', (canvas.width/2) + 75, 630);

    canvas.addEventListener('mousedown', click = (event) =>{
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if(x < playMusicButton.xpoint + playMusicButton.buttonWidth &&
           x > playMusicButton.xpoint &&
           y < playMusicButton.ypoint + playMusicButton.buttonHeight &&
           y > playMusicButton.ypoint) {
            music.play();
        }
        if(x < plusButton.xpoint + plusButton.buttonWidth &&
           x > plusButton.xpoint &&
           y < plusButton.ypoint + plusButton.buttonHeight &&
           y > plusButton.ypoint) {
            music.volume += 0.1;
        }
        if(x < minuseButton.xpoint + minuseButton.buttonWidth &&
           x > minuseButton.xpoint &&
           y < minuseButton.ypoint + minuseButton.buttonHeight &&
           y > minuseButton.ypoint) {
            music.volume -= 0.1;
        }
    });
}

function removeListeners(){
    canvas.removeEventListener('mouseup', removeClick, false);
    canvas.removeEventListener('mousedown', click, false);
    canvas.removeEventListener('mousemove', hover, false);
}
