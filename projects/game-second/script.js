function start(){
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1920;
    canvas.height = 880;
    let enemies = [];
    let gates = [];
    let score = 0;
    let gameOver = false;
    let win = false;
    let pause = false;

    class InputHandler {
        constructor(){
            this.keys = [];
            //использована стрелочная функция чтобы иметь доступ к this родителя
            window.addEventListener('keydown', e =>{
                if ((   e.code === 'KeyS'||
                        e.code === 'KeyW'||
                        e.code === 'KeyA'||
                        e.code === 'KeyD')
                        && this.keys.indexOf(e.code) === -1){
                    this.keys.push(e.code);
                } else if(e.code === 'Escape') pauseGame();
            });
            window.addEventListener('keyup', e =>{
                if ((   e.code === 'KeyS'||
                        e.code === 'KeyW'||
                        e.code === 'KeyA'||
                        e.code === 'KeyD')){
                    this.keys.splice(this.keys.indexOf(e.code), 1);
                }
            });
        }
    }

    class Player {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 200;
            this.height = 200;
            //положение игрока
            this.x = 0;
            this.y = this.gameHeight - this.height;
            //добавление изображения
            this.image = document.getElementById('playerImage');
            //координаты фреймов
            this.frameX = 0;
            this.frameY = 0;
            this.maxFrame = 8
            this.fps = 20;       //колличество кадров в секунду
            this.frameTimer = 0; //значение от 0 до интервала кадра в сек
            this.frameInterval = 1000/this.fps; //длительность кадра
            //скорость игрока
            // speed - горизонтальная
            // vy - вертикальная
            this.speed = 0;
            this.vy = 0;
            //коэфициент гравитации
            this.gravity = 1;
        }
        draw(context){
            ctx.fillStyle = "green";
            ctx.fillRect(this.x, this.y, this.width, this.height);

            //полное изображение this.image, this.x, this.y, this.width, this.height
            //обрезаем изображение по фрейму this.image, sx, sy, this.width, this.height, this.x, this.y, this.width, this.height
//            context.drawImage(this.image,
//                              this.frameX * this.width,
//                              this.frameY * this.height,
//                              this.width, this.height,
//                              this.x, this.y, this.width, this.height);
        }
        update(input, deltaTime, enemies, gate){
            //коллизия - просчет столкновения объектов (на основе кругов)
            enemies.forEach(enemy => {
                if (this.x + this.width > enemy.x &&
                    this.x < enemy.x + enemy.width &&
                    this.y + this.height > enemy.y &&
                    this.y < enemy.y + enemy.height){
                    gameOver = true;
                }
            })
//            enemies.forEach(enemy => {
//                let dx = (enemy.x + enemy.width/2) - (this.x + this.width/2);
//                let dy = (enemy.y + enemy.height/2) - (this.y + this.width/2);
//                let dist = (Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2))) + 20;
//                if (dist < enemy.width/2 + this.width/2){
//                    gameOver = true;
//                }
//            })
            gates.forEach(gate => {
                let dx = (gate.x + gate.width/2) - (this.x + this.width/2);
                let dy = (gate.y + gate.height/2) - (this.y + this.width/2);
                let dist = (Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2)));
                if (dist < gate.width/2 + this.width/2){
                    win = true;
                }
            })
            //анимация по кадрам
//            if (this.frameTimer > this.frameInterval){
//                if(this.frameX >= this.maxFrame){
//                    this.frameX = 0;
//                } else {
//                    this.frameX++;
//                }
//                this.frameTimer = 0;
//            } else {
//                this.frameTimer += deltaTime;
//            }
            //движение
            if (input.keys.indexOf('KeyD') > -1){
                this.speed = 5;
                if (input.keys.indexOf('KeyW') > -1 && this.onGround()){
                    this.vy -= 30;
                }
            } else if (input.keys.indexOf('KeyA') > -1){
                this.speed = -5;
                if (input.keys.indexOf('KeyW') > -1 && this.onGround()){
                    this.vy -= 30;
                }
            } else if (input.keys.indexOf('KeyW') > -1 && this.onGround()){
                this.vy -= 30;
            } else if (input.keys.indexOf('KeyS') > -1 && !this.onGround()){
                this.vy += this.gravity * 10;
            } else if (input.keys.indexOf('KeyS') > -1 && this.onGround()){
                this.height = 120;
                this.speed = 0;
                this.frameX = 0;
                this.frameY = 0;
            } else {
                this.height = 200;
                this.speed = 0;
            }
            //вертикальное движение
            this.x += this.speed;
            //ограничение движения по вертикали
            if (this.x < 0){this.x = 0;}
            else if (this.x > this.gameWidth - this.width)
            {this.x = this.gameWidth - this.width}

            //горизонтальное движение
            this.y += this.vy;
            //гравитация
            if (!this.onGround()){
                this.vy += this.gravity;
                this.maxFrame =  5;
                this.frameY = 1;
            } else {
                this.vy = 0;
                this.maxFrame =  8;
                this.frameY = 0;
            }
            //ограничение движения по горизонтали
            //создание "земли"
            if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height
        }
        onGround(){
            return this.y >= this.gameHeight - this.height
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
            this.speed = 20;
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height);
        }
        update(){
            this.x -= this.speed;
            if (this.x < 0 - this.width){
                this.x = 0;
            }
        }
    }

    class Enemy {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('enemyImage');
            this.width = 160;
            this.height = 119;

            this.randY = Math.floor(Math.random() * ((this.gameHeight - this.height)-(this.gameHeight/2)) + (this.gameHeight/2));

            while(
                this.randY > canvas.height *(3/4) - this.height- 50 &&
                this.randY < canvas.height *(3/4) + 50){
                    this.randY = Math.floor(Math.random() * ((this.gameHeight - this.height)-(this.gameHeight/2)) + (this.gameHeight/2));
            }
            this.x = this.gameWidth;
            this.y = this.randY;

            this.frameX = 0;
            this.frameY = 0;
            this.maxFrame = 5;   //колличесво кадров в изображении
            this.fps = 20;       //колличество кадров в секунду
            this.frameTimer = 0; //значение от 0 до интервала кадра в сек
            this.frameInterval = 1000/this.fps; //длительность кадра
            this.speed = 8;
            this.flagToDelete = false;
        }
        draw(context){
//            ctx.fillStyle = "pink";
//            ctx.fillRect(0, canvas.height/2, canvas.width, canvas.height);
//
//            ctx.fillStyle = "yellow";
//            ctx.fillRect(0, (canvas.height *(3/4)) - 50, canvas.width, 100);
//            canvas.x + (canvas.height *(3/4)) + 50

            ctx.fillStyle = "red";
            ctx.fillRect(this.x, this.y, this.width, this.height);
            //полное изображение this.image, this.x, this.y, this.width, this.height
            //обрезаем изображение по фрейму this.image, sx, sy, this.width, this.height, this.x, this.y, this.width, this.height
//            context.drawImage(this.image,
//                              this.frameX * this.width,
//                              0,
//                              this.width, this.height,
//                              this.x, this.y, this.width, this.height);
        }
        update(deltaTime){
            //переключение кадров
            if (this.frameTimer > this.frameInterval){
                if(this.frameX >= this.maxFrame){
                    this.frameX = 0;
                } else {
                    this.frameX++;
                }
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }
            this.x -= this.speed;
            //помечаем пройденных врагов
            if (this.x < 0 - this.width){
                this.flagToDelete = true;
                score++;
            }
        }
    }

    function handlerEnemies(deltaTime){
        if (score <= 99){
        if(enemyTimer > enemyInterval + randomEnemyInterval){
            //когда таймер доходит до предела,
            //создаем нового врага и сбрасываем таймер до 0
            enemies.push(new Enemy(canvas.width, canvas.height));

            randomEnemyInterval = Math.random() * 1000 + 500;
            enemyTimer = 0;
        } else {
            //отсчет до следующего создания врага
            enemyTimer += deltaTime;
        }
        enemies.forEach(enemy => {
            enemy.draw(ctx);
            enemy.update(deltaTime);
        });
        //оставляем в массиве только не отмеченных врагов
        enemies = enemies.filter(enemy => !enemy.flagToDelete)
        } else {
            enemies = enemies.filter(enemy => enemy.flagToDelete)
            handlerGate();
        }
    }

    class Gate {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('gateImage');
            this.width = 160;
            this.height = 119;

            this.x = this.gameWidth;
            this.y = this.gameHeight - this.height;
            this.frameX = 0;
            this.frameY = 0;
            this.maxFrame = 5;   //колличесво кадров в изображении
            this.fps = 20;       //колличество кадров в секунду
            this.frameTimer = 0; //значение от 0 до интервала кадра в сек
            this.frameInterval = 1000/this.fps; //длительность кадра
        }
        draw(context){
            //полное изображение this.image, this.x, this.y, this.width, this.height
            //обрезаем изображение по фрейму this.image, sx, sy, this.width, this.height, this.x, this.y, this.width, this.height
            context.drawImage(this.image,
                              this.frameX * this.width,
                              0,
                              this.width, this.height,
                              this.x, this.y, this.width, this.height);
        }
        update(deltaTime){
            //переключение кадров
            if (this.frameTimer > this.frameInterval){
                if(this.frameX >= this.maxFrame){
                    this.frameX = 0;
                } else {
                    this.frameX++;
                }
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }
            this.x --;
        }
    }

    function handlerGate(deltaTime){
        gate.draw(ctx);
        gate.update(deltaTime);
    }

    function displayStatusText(context){
        context.textAlign = 'left';
        context.fillStyle = 'black';
        context.font = '40px Leto Text Sans';
        context.fillText('Score: ' + score, 20, 50);
        if(gameOver){
            context.textAlign = 'center';
            context.fillStyle = 'black';
            context.fillText('Game over, press Space to restart, your score: ' + score, canvas.width/2, 250);
        }
        if(win){
            context.textAlign = 'center';
            context.fillStyle = 'black';
            context.fillText('Victory! Congratulations!', canvas.width/2, 250);
        }else if (pause){
            context.font = '80px';
            context.fillText('Pause', canvas.width/2, 250);
        }
    }

    function pauseGame(){
        pause = true;
    }

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);
    const gate = new Gate(canvas.width, canvas.height);
    gates.push(gate);

    let lastTime = 0;        //значение времени из предыдущего вызова цикла
    let enemyTimer = 0;      //значение нудя до предела (enemyInterval)
                             //сбрасывается до нуля при достижении предела
    let enemyInterval = 600;//интервал добавления врага
    let randomEnemyInterval = Math.random() * 1000 + 700;

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
        background.update();

        player.draw(ctx);
        player.update(input, deltaTime, enemies);

        handlerEnemies(deltaTime);

        displayStatusText(ctx);

        if (!gameOver && !win && !pause){
            requestAnimationFrame(animate);
        }
    }
    animate(0); //т.к. timeStamp генерируется при вызове функции, то первыый раз передаем 0
}

function faq(){
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let image = document.getElementById('backgroundImage');

    canvas.width = 1920;
    canvas.height = 880;

    ctx.drawImage(image, 0, 0, 1920, 880);

    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.font = '40px Leto Text Sans';

    ctx.fillText("Правила игры", canvas.width/2, 130 );
    ctx.fillText("Игра длиться до 100 очков", canvas.width/2, 170 );
    ctx.fillText("Цель игры заключается в том чтобы избежать летающих чудищ и добраться до врат", canvas.width/2, 210 );
    ctx.fillText("По достижении отметки в 100 очков, появляются врата окончания игры", canvas.width/2, 250 );

    ctx.fillText("Важно!", canvas.width/2, 340 );
    ctx.fillText("Очки зачисляются лишь тогда, когда враг ушел за пределы карты", canvas.width/2, 380 );

    ctx.fillText("Управление", canvas.width/2, 460 );
    ctx.fillText("W - прыжок", canvas.width/2, 500 );
    ctx.fillText("A - движение влево", canvas.width/2, 540 );
    ctx.fillText("S - присесть / быстро спуститься", canvas.width/2, 580 );
    ctx.fillText("D - движение вправо", canvas.width/2, 620 );
    ctx.fillText("Space - перезапуск уровня", canvas.width/2, 660 );
    ctx.fillText("Escape - пауза", canvas.width/2, 700 );

    ctx.fillText("Удачи!", canvas.width/2, 780 );
}
