function start(){
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1920;
    canvas.height = 880;
    let enemies = [];
    let fuels = [];
    let planetArr = [];
    let playerArr = [];

    let score = 1000;
    let gameOver = false;
    let win = false;
    let pause = false;
    let timer = 60;
    let turbo = 0;

    class InputHandler {
        constructor(){
            this.keys = [];
            //использована стрелочная функция чтобы иметь доступ к this родителя
            window.addEventListener('keydown', e =>{
                if ((   e.code === 'KeyS'||
                        e.code === 'KeyW'||
                        e.code === 'KeyA'||
                        e.code === 'KeyD'||
                        e.code === 'ShiftLeft')
                        && this.keys.indexOf(e.code) === -1){
                    this.keys.push(e.code);
                } else if(e.code === 'Space') restartGame();
                else if(e.code === 'Escape') pauseGame();
            });
            window.addEventListener('keyup', e =>{
                if ((   e.code === 'KeyS'||
                        e.code === 'KeyW'||
                        e.code === 'KeyA'||
                        e.code === 'KeyD'||
                        e.code === 'ShiftLeft')){
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
            this.x = this.gameWidth/2;
            this.y = this.gameHeight/2;
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
            this.gravity = 5;
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
        update(input, deltaTime){
            //коллизия - просчет столкновения объектов (на основе кругов)
            enemies.forEach(enemy => {
                if (this.x + this.width > enemy.x &&
                    this.x < enemy.x + enemy.width &&
                    this.y + this.height > enemy.y &&
                    this.y < enemy.y + enemy.height){
                    gameOver = true;
                }
            })
            fuels.forEach(fuel => {
                if (this.x + this.width > fuel.x &&
                    this.x < fuel.x + fuel.width &&
                    this.y + this.height > fuel.y &&
                    this.y < fuel.y + fuel.height){
                    score += 1000;
                    fuel.flagToDelete = true;
                }
            })

            if(this.y + this.height == this.gameHeight){
               gameOver = true;
            }
            planetArr.forEach(planet => {
                if (this.x + this.width > planet.x &&
                    this.x < planet.x + planet.width &&
                    this.y + this.height > planet.y &&
                    this.y < planet.y + planet.height){
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
                this.speed = 8;
                this.vy = 0;
                if (input.keys.indexOf('KeyW') > -1){
                    this.vy = -10;
                } else if (input.keys.indexOf('KeyS') > -1){
                    this.vy = 10;
                }
            } else if (input.keys.indexOf('KeyA') > -1){
                this.speed = -8;
                this.vy = 0;
                if (input.keys.indexOf('KeyW') > -1){
                    this.vy = -10;
                } else if (input.keys.indexOf('KeyS') > -1){
                    this.vy = 10;
                }
            } else if (input.keys.indexOf('KeyW') > -1){
                this.vy = -10;
            } else if (input.keys.indexOf('KeyS') > -1){
                this.vy = 10;
            } else {
                this.speed = 0;
                this.vy = 0;
            }
            //вертикальное движение
            this.x += this.speed;
            //ограничение движения по горизонтали
            if (this.x < 0)
                this.x = 0;
            else if (this.x > this.gameWidth - this.width)
                this.x = this.gameWidth - this.width

            //горизонтальное движение
            this.y += this.vy;
            //гравитация
            this.y += this.gravity;

            //ограничение движения по вертикали
            if (this.y < 0)
                this.y = 0;
            else if (this.y > this.gameHeight - this.height)
                this.y = this.gameHeight - this.height;
        }
        restart(){
            this.x = canvas.width/2;
            this.y = canvas.height/2;
        }
    }
    function handlerPlayer(){
        player.draw(ctx);
        player.update(input);
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
            context.drawImage(this.image, this.x, this.y - this.height + this.speed, this.width, this.height);
            context.drawImage(this.image, this.x, this.y + this.height - this.speed, this.width, this.height);
        }
        update(){
            this.y += this.speed;
            if (this.y == this.height){
                this.y = 0;
            }
        }
    }

    class Planet {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('enemyImage');

            this.radius = this.gameWidth/2;
            this.width = this.gameWidth/2;
            this.height = this.gameWidth/2;

            this.x = 0;
            this.y = 0-this.height;

            this.speed = 1;
        }
        draw(context){

            context.arc(this.x + this.radius, this.y, this.radius, 0, Math.PI, false);
            context.fillStyle = "yellow";
            context.fill();

        }
        update(){
            this.y++;
        }
    }
    function handlerPlanet(){
        planet.draw(ctx);
        planet.update();
    }

    class Enemy {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('enemyImage');
            this.width = 100;
            this.height = 100;

            this.x = Math.floor(Math.floor(Math.random() * (this.gameWidth-this.width)) / 100) * 100;
            this.y = (Math.floor(Math.floor(Math.random()*(1500-0+1)+0) / 100) * 100) - 1500;

            this.speed = 8;
            this.flagToDelete = false;
        }
        draw(context){
            context.fillStyle = "red"
            context.fillRect(this.x, this.y, this.width, this.height)
        }
        update(){

            this.y += this.speed;
            //помечаем пройденных врагов
            if (this.y > 0 + this.gameHeight){
                this.flagToDelete = true;
            }
        }
    }
    class Fuel {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('enemyImage');
            this.width = 100;
            this.height = 100;

            this.randX = Math.floor(Math.floor(Math.random() * (this.gameWidth-this.width)) / 100) * 100;
            this.randY = (Math.floor((Math.floor(Math.random()*(1500-0+1)+0)) / 100) * 100) - 1500;

            enemies.forEach(enemy => {
                while(
                    this.randX + this.width > enemy.x &&
                    this.randX < enemy.x + enemy.width &&
                    this.randY + this.height > enemy.y &&
                    this.randY < enemy.y + enemy.height) {

                this.randX = Math.floor(Math.floor(Math.random() * (this.gameWidth-this.width)) / 100) * 100;
                this.randY = (Math.floor((Math.floor(Math.random()*(1500-0+1)+0)) / 100) * 100) - 1500;


            } })
            this.x = this.randX;
            this.y = this.randY;

            this.speed = 8;
            this.flagToDelete = false;
        }
        draw(context){
            context.fillStyle = "aqua"
            context.fillRect(this.x, this.y, this.width, this.height)
        }
        update(){

            this.y += this.speed;
            //помечаем пройденных врагов
            if (this.y > 0 + this.gameHeight){
                this.flagToDelete = true;
            }
        }
    }


    function handlerEnemies(deltaTime){
        if(timer > 0){
        if(enemyTimer > enemyInterval){
            //когда таймер доходит до предела,
            //создаем нового врага и сбрасываем таймер до 0
            for(let i = 0; i <  Math.floor(Math.random() * (15 - 12))+12; i++){
                enemies.push(new Enemy(canvas.width, canvas.height));
            }
            for(let i = 0; i < 3; i++){
                fuels.push(new Fuel(canvas.width, canvas.height));
            }

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
        fuels.forEach(fuel => {
            fuel.draw(ctx);
            fuel.update(deltaTime);
        });

        //оставляем в мессиве только не отмеченных врагов
        enemies = enemies.filter(enemy => !enemy.flagToDelete);
        fuels = fuels.filter(fuel => !fuel.flagToDelete);
        }else{
            handlerPlanet();
            enemies.length = 0;
            fuels.length = 0;
            planetArr.push(planet);
        }
    }

    function displayStatusText(context){
        context.fillStyle = 'black';
        context.font = '60px Leto Text Sans';

        context.textAlign = 'left';
        context.fillText('Fuel: ' + score, 20, 50);

        context.textAlign = 'center';
        context.fillText('Turbo: ' + turbo + '%',(canvas.width/2) + 20, 50);

        context.textAlign = 'right';
        context.fillText('Time: ' + timer, canvas.width - 20, 50);

        if(gameOver){
            context.fillStyle = '#333';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.textAlign = 'center';
            context.fillStyle = 'white';
            context.fillText('Game over, press Space to restart, time to win: ' + timer, canvas.width/2, 250);
        }
        if(win){
            context.fillStyle = '#333';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.textAlign = 'center';
            context.fillStyle = 'white';
            context.fillText('Victory! Congratulations!', canvas.width/2, 250);
        }else if (pause){
            context.font = '80px';
            context.fillText('Pause', (canvas.width/2)+40, 250);
        }
    }

    function pauseGame(){
        pause = true;
    }

    function restartGame(){
        player.restart();
        enemies.length = 0;
        fuels.length = 0;
        planetArr.length = 0;
        timer = 60;
        score = 1000;
        turbo = 0;
        win = false;
        animate();
    }

    let limitFuel = setInterval(() => {
        score -= 10;
        if(score <= 0){
            clearInterval(limitFuel);
            gameOver = true;
        }
    }, 0.08 * 1000);

    let timeToStop = setInterval( () =>{
        timer--;
        if (timer == 0){
            clearInterval(timeToStop);
        }
    }, 1 * 1000);

    let collectTurbo = setInterval( () =>{
        if (turbo < 100){
            turbo += 20;
        } else{
            turbo = 100;
        }
    }, 1 * 1000);

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);
    const planet = new Planet(canvas.width, canvas.height);

    let lastTime = 0;        //значение времени из предыдущего вызова цикла
    let enemyTimer = 0;      //значение нудя до предела (enemyInterval)
                             //сбрасывается до нуля при достижении предела
    let enemyInterval = 3000;//интервал добавления врага
    let randomEnemyInterval = Math.random() * 1000 + 500;

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

        handlerEnemies(deltaTime);

        if (input.keys.indexOf('ShiftLeft') > -1 && turbo == 100){
            playerArr.length = 0;
            player.y -= 200;
            turbo = 0;

        } else {
            playerArr.push(player);
            handlerPlayer();
        }

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

    ctx.fillText("Правила игры", canvas.width/2, 60 );
    ctx.fillText("Цель игры заключается в том чтобы избежать астероидов и высадится на безопасной планете", canvas.width/2, 100 );
    ctx.fillText("Чтобы долететь, попутно надо собирать баночки с топливом (синие квадратики)", canvas.width/2, 140 );
    ctx.fillText("По истечении отсчета времени (справа сверху), появится планета, куда надо долететь", canvas.width/2, 180 );

    ctx.fillStyle = 'red';
    ctx.fillText("Важно!", canvas.width/2, 260 );
    ctx.fillStyle = 'black';
    ctx.fillText("1) Чтобы использовать турбо скачок, нужно чтобы показатель турбо был равен 100%", canvas.width/2, 300 );
    ctx.fillText("2) Вы в космосе поэтому переодически добавляйте газу чтобы лететь, иначе СМЭРТЬ", canvas.width/2, 340 );
    ctx.fillText("3) Следите за уровнем топлива, иначе СМЭРТЬ", canvas.width/2, 380 );
    ctx.fillText("4) Следите также чтобы ракета не вылетела за нижнюю границу, иначе СМЭРТЬ", canvas.width/2, 420 );

    ctx.fillText("Управление", canvas.width/2, 500 );
    ctx.fillText("W - полет вперед / добавить газку", canvas.width/2, 540 );
    ctx.fillText("S - движение влево / сбавить обороты", canvas.width/2, 580 );
    ctx.fillText("A - движение влево", canvas.width/2, 620 );
    ctx.fillText("D - движение вправо", canvas.width/2, 660 );
    ctx.fillText("L Shift - пространсвенный скачек вперед", canvas.width/2, 700 );
    ctx.fillText("Space - перезапуск уровня", canvas.width/2, 740 );
    ctx.fillText("Escape - пауза", canvas.width/2, 780 );

    ctx.fillText("Удачи!", canvas.width/2, 860 );
}
