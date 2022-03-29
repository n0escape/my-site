'use strict';
function start(){
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1920;
    canvas.height = 880;
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
                else if(e.code === 'Escape') pauseGame();
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
            this.width = 10;
            this.height = 10;
            //положение игрока
            this.x = 10;
            this.y = this.gameHeight - this.height - 10;

            //скорость игрока
            // speed - горизонтальная
            // vy - вертикальная
            this.speed = 0;
            this.vy = 0;
            //коэфициент гравитации
            this.gravity = 1;

            this.secondX = this.x + this.width;
            this.secondY = this.y + this.height;
        }
        restart(){
            this.x = 10;
            this.y = this.gameHeight - this.height - 10;
        }
        draw(context){
            ctx.fillStyle = "green";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        update(input){
            //движение
            if (input.keys.indexOf('KeyD') > -1){
                this.vy = 0;
                this.speed = 3;
            } else if (input.keys.indexOf('KeyA') > -1){
                this.vy = 0;
                this.speed = -3;
            } else if (input.keys.indexOf('KeyW') > -1){
                this.vy = -3;
                this.speed = 0;
            } else if (input.keys.indexOf('KeyS') > -1){
                this.vy = 3;
                this.speed = 0;
            } else {
                this.speed = 0;
                this.vy = 0;
            }
            mouseHandler();

            this.secondX = this.x + this.width;
            this.secondY = this.y + this.height;
            this.centerX = (this.x + this.secondX) / 2;
            this.centerY = (this.y + this.secondY) / 2;

            //движение
            this.x += this.speed;
            this.y += this.vy;

            if (checkForCollision()){
                this.x -= this.speed;
                this.y -= this.vy;
            }
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
            ctx.fillStyle="#333";
            ctx.fillRect(0,0,canvas.width,canvas.height);
        }
    }
    function mouseHandler(e){
        ctx.save();
        ctx.beginPath();
        ctx.arc(player.centerX,player.centerY,200,0,Math.PI/180*360);
        ctx.clip();
        ctx.drawImage(background.image,0,0,canvas.width,canvas.height);
        player.draw(ctx);
        ctx.restore();
    }
    //коллизия стен лабиринта
    function checkForCollision() {
        // Перебираем все пиксели лабиринта и инвертируем их цвет
        let imgData = ctx.getImageData(player.x-1, player.y-1, 10+2, 10+2);
        let pixels = imgData.data;

        // Получаем данные для одного пикселя
        for (let i = 0; i < pixels.length; i += 4) {
          let red = pixels[i];
          let green = pixels[i+1];
          let blue = pixels[i+2];
          let alpha = pixels[i+3];

          // Смотрим на наличие черного цвета стены,
          // что указывает на столкновение
          if (red == 0 && green == 0 && blue == 0) {
            return true;
          }

          // Смотрим на наличие red цвета краев,
          // что указывает на столкновение
          if (red == 255 && green == 0 && blue == 0) {
              win = true;
          }
        }
        return false;
    }
    //текст победы
    function displayStatusText(context){
        context.textAlign = 'center';
        context.fillStyle = 'black';
        context.font = '40px Leto Text Sans';
        context.fillRect(0, 0, canvas.width, canvas.height);
        if(win){
            context.fillStyle = 'white';
            context.fillText('Victory! Congratulations!', canvas.width/2, 250);
        } else if (pause){
            context.fillStyle = 'white';
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

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        background.draw(ctx);

        player.draw(ctx);
        player.update(input);

        if(!win && !pause){
            requestAnimationFrame(animate);
        } else {
            displayStatusText(ctx);
        }
    }
    animate();
}

function faq(){
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let image = document.getElementById('winImage');

    canvas.width = 1920;
    canvas.height = 880;

    ctx.drawImage(image, 0, 0, 1920, 880);

    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.font = '40px Leto Text Sans';

    ctx.fillText("Правила игры", canvas.width/2, 130 );
    ctx.fillText("Игра длиться до нахождения портала", canvas.width/2, 170 );
    ctx.fillText("Цель игры заключается в том чтобы найти правильный путь в лабиринте", canvas.width/2, 210 );
    ctx.fillText("Подсказка: он предположительно справа снизу", canvas.width/2, 250 );

    ctx.fillText("Важно!", canvas.width/2, 340 );
    ctx.fillText("Портал в начале тестовый, так что не считается ;3", canvas.width/2, 380 );

    ctx.fillText("Управление", canvas.width/2, 460 );
    ctx.fillText("W - вперед", canvas.width/2, 500 );
    ctx.fillText("A - влево", canvas.width/2, 540 );
    ctx.fillText("S - вниз", canvas.width/2, 580 );
    ctx.fillText("D - вправо", canvas.width/2, 620 );
    ctx.fillText("Space - перезапуск уровня", canvas.width/2, 660 );
    ctx.fillText("Escape - пауза", canvas.width/2, 700 );

    ctx.fillText("Удачи!", canvas.width/2, 780 );
}
