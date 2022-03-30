function start(){
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1920;
    canvas.height = 880;
    let enemies = [];
    let score = 60;
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
                    this.keys.push(e.code)
                } else if(e.code === 'Space') restartGame();
                else if(e.code === 'Escape') {
                    pauseGame();
                }

            });
            window.addEventListener('keyup', e =>{
                if (    e.code === 'KeyS'||
                        e.code === 'KeyW'||
                        e.code === 'KeyA'||
                        e.code === 'KeyD'){
                    this.keys.splice(this.keys.indexOf(e.code), 1);
                }
            });
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
            context.drawImage(this.image, this.x, this.y, canvas.width, canvas.height);
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

    function handlerEnemies(deltaTime){
        if(enemyTimer > enemyInterval){
            //когда таймер доходит до предела,
            //создаем нового врага и сбрасываем таймер до 0
            enemies.push(new Enemy(canvas.width, canvas.height));
            enemyTimer = 0;
            score--;
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

    setTimeout((ctx)=>{
        win = true;
        enemies.length = 0;
    }, 60 * 1000);



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
            context.fillText('Game over, press Space to restart, time to win: ' + score, canvas.width/2, 250);
        }
        if(win){
            context.fillStyle = '#333';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.textAlign = 'center';
            context.fillStyle = 'white';
            context.fillRect(this.x, this.y, this.width, this.height);
            context.fillText('Victory! Congratulations!', canvas.width/2, 250);
        }else if (pause){
            context.font = '80px';
            context.fillText('Pause', canvas.width/2, 250);
        }
    }
    function restartGame(){
        player.restart();
        win = false;
        animate();
    }
    function pauseGame(){
        pause = true;
    }



    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
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
    ctx.fillStyle = 'white';
    ctx.font = '40px Leto Text Sans';

    ctx.fillText("Правила игры", canvas.width/2, 130 );
    ctx.fillText("Игра длиться 1 минуту", canvas.width/2, 170 );
    ctx.fillText("Цель игры заключается в том чтобы избежать летающих чудищ и прожить 1 минуту", canvas.width/2, 210 );
    ctx.fillText("По истечению времнни игра заканчивается", canvas.width/2, 250 );

    ctx.fillText("Важно!", canvas.width/2, 340 );
    ctx.fillText("Враг пропадает, прожив 1.3 сек. Изаначально враги летят в сторону игрока", canvas.width/2, 380 );

    ctx.fillText("Управление", canvas.width/2, 460 );
    ctx.fillText("W - прыжок", canvas.width/2, 500 );
    ctx.fillText("A - движение влево", canvas.width/2, 540 );
    ctx.fillText("S - присесть / быстро спуститься", canvas.width/2, 580 );
    ctx.fillText("D - движение вправо", canvas.width/2, 620 );
    ctx.fillText("Space - перезапуск уровня", canvas.width/2, 660 );
    ctx.fillText("Escape - пауза", canvas.width/2, 700 );

    ctx.fillText("Удачи!", canvas.width/2, 780 );
}

