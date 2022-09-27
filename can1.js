var can = document.getElementsByClassName('can')[0];
can.width = window.innerWidth;
can.height = window.innerHeight;
var context = can.getContext('2d');


function Snow(x, y, scale, rotate, speedX, speedY, speedR) {
    this.x = x;
    this.y = y;
    this.scale = scale;
    this.rotate = rotate;
    this.speedX = speedX;
    this.speedY = speedY;
    this.speedR = speedR;
}

Snow.prototype.render = function () {
    context.save();
    context.beginPath();
    context.strokeStyle = '#fff';
    context.lineWidth = 5;
    context.lineCap = 'round';
    context.translate(this.x, this.y);
    context.scale(this.scale, this.scale);
    context.rotate(this.rotate * Math.PI / 180);
    context.moveTo(-17, 0);
    context.lineTo(17, 0);
    var disX = Math.sin(30 * Math.PI / 180) * 17;
    var disY = Math.sin(60 * Math.PI / 180) * 17;
    context.moveTo(disX, disY);
    context.lineTo(-disX, -disY);
    context.moveTo(disX, -disY);
    context.lineTo(-disX, disY);
    context.stroke();
    context.restore();

}

var snowArr = [];
function snowing() {

    setInterval(function () {
        context.clearRect(0, 0, can.width, can.height);
        for (var i = 0; i < snowArr.length; i++) {
            snowArr[i].x = snowArr[i].x + snowArr[i].speedX >= can.width ? 0 : snowArr[i].x + snowArr[i].speedX;

            // (snowArr[i].x + snowArr[i].speedX) % can.width;
            snowArr[i].y = snowArr[i].y + snowArr[i].speedY >= can.width ? 0 : snowArr[i].y + snowArr[i].speedY;

            // (snowArr[i].y + snowArr[i].speedY) % can.height;
            snowArr[i].rotate = snowArr[i].rotate + snowArr[i].speedR;
            snowArr[i].render();
        }
    }, 1000 / 60);

}

var snowLen = 100;
function init() {
    for (var i = 0; i < snowLen; i++) {
        var x = Math.random() * can.width;
        var scale = Math.random() + 0.5;
        var rotate = Math.random() * 60;
        var speedX = Math.random() * 2 - 0.5;
        var speedY = Math.random() + 3;
        var speedR = Math.random() * 5 + 2;
        (function (x, y, scale, rotate, speedX, speedY, speedR) {
            setTimeout(function () {

                var snow = new Snow(x, y, scale, rotate, speedX, speedY, speedR)
                snowArr.push(snow);

            }, Math.random() * 7000);

        })(x, 0, scale, rotate, speedX, speedY, speedR)
    }
    snowing();

}

init()

