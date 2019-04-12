var canvasElement = document.querySelector("#bg-canvas");

var ratio, width, height;

function calcCanvasSize() {
    ratio = window.devicePixelRatio;
    width = window.innerWidth * ratio;
    height = (window.innerHeight) * ratio;
    canvasElement.style.width = window.innerWidth + "px";
    canvasElement.style.height = window.innerHeight + "px";
    canvasElement.width = width;
    canvasElement.height = height;
}

calcCanvasSize();

var canvas = canvasElement.getContext("2d");
var PI2 = 2 * Math.PI;

window.addEventListener("resize", calcCanvasSize);

class Circle {
    constructor(x, y, r) {
        this.maxr = r || 100;
        this.color = hsltorgb(randInt(360), 100, 50, 1);
        this.x = x || randInt(width);
        this.y = y || randInt(height);
        this.r = 0;
        this.time = 0;
        this.life = 100;
    }

    tick(c, cs, i) {
        this.time += 16.7;
        // if(this.time < this.life / 2) {
        //     this.r = this.maxr * this.time / this.life * 2;
        // } else {
        //     this.r = this.maxr * (2 - this.time / this.life * 2);
        //     this.r = this.r < 0 ? 0: this.r;
        // }

        this.r = this.maxr - this.maxr * this.time / this.life;
        this.r = this.r < 0 ? 0 : this.r;

        c.fillStyle = this.color;
        c.moveTo(this.x, this.y);
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, PI2, true);
        c.closePath();
        c.fill();

        if(this.time >= this.life) {
            cs.splice(i, 1);
        }
    }
}

class Line {
    constructor(x, y) {
        this.x = x || randInt(width);
        this.y = y || randInt(height);

        this.speed = 10;
        this.moveTime = 0;
        this.moveTotalTime = 1000;

        this.nextPoint = [randInt(width), randInt(height)];

        this.step = [(this.nextPoint[0] - this.x) / this.moveTotalTime * 16.7, (this.nextPoint[1] - this.y) / this.moveTotalTime * 16.7];
    
        this.transition = new Polar(new Vector2(width / 2, height / 2), 0.5, Math.PI / 10, 0);
    }

    tick(c, ls, i) {
        // this.x += this.step[0];
        // this.y += this.step[1];
        const point = this.transition.tick();
        this.x = point.x;
        this.y = point.y;
        const circle = new Circle(this.x, this.y, this.moveTime / 16.7 / 10);
        circle.color = hsltorgb(((this.transition.angleNow) % (Math.PI * 2) / Math.PI * 180), 100, 50);
        circles.push(circle);

        if(Math.max(this.x, this.y) > Math.max(width + 300, height + 300)) {
            ls.splice(i, 1);
        }

        this.moveTime += 16.7;
        // if(this.moveTime > this.moveTotalTime) {
        //     ls.splice(i, 1);

        //     if(lines.length < 50) {
        //         lines.push(new Line(this.x, this.y), new Line(this.x, this.y));
        //     }

        //     this.moveTime = 0;
        //     this.nextPoint = [randInt(width), randInt(height)];
        //     this.step = [(this.nextPoint[0] - this.x) / this.moveTotalTime * 16.7, (this.nextPoint[1] - this.y) / this.moveTotalTime * 16.7];
        // }
    }
}

class Transition {
    constructor() {
        this.center = new Vector2(0, 0);
        this.name = "transition";
        this.count = 0;
        this.life = 1000;

        this.PI = Math.PI;
        this.PI2 = 2 * this.PI;
        this.sin = Math.sin;
        this.cos = Math.cos;
    }
}

class Linear extends Transition {
    constructor() {
        super();
        this.direction = new Vector2(1, 1);
        this.speed = 10;
    }

    tick() {

    }
}

class Polar extends Transition{
    
    constructor(center, speed, angleSpeed, start) {
        super();
        center ? this.center = center : '';
        this.name = "polar_sin";
        this.angleSpeed = angleSpeed || this.PI / 6 / 10;
        this.speed = speed || 10;
        this.start = start || this.PI / 6;

        this.angleNow;
    }

    tick() {
        const angle = this.start + this.count * this.angleSpeed;
        this.angleNow = angle;
        const direction = new Vector2(this.cos(angle), this.sin(angle));
        const length = this.speed * this.count;
        //length > Math.min(width - 50, height- 50) / 2 ? Math.min(width- 50, height- 50) / 2 : length
        const result = this.center.add(direction.multiply(length));

        this.count += 1;
        return result;
    }
}

class Vector2 {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;

        // math methods
        this.quadratic = (v) => {return Math.pow(v, 2);};
        this.sqrt = Math.sqrt;
    }

    get normal() {
        const m = this.magitude;
        return new Vector2(m > 0 ? this.x / m : 0, m > 0 ? this.y / m : 0);
    }

    get magitude() {
        return this.sqrt(this.quadratic(this.x) + this.quadratic(this.y));
    }

    add(v2) {
        return new Vector2(this.x + v2.x, this.y + v2.y);
    }

    clampMax(xMax, yMax) {
        this.x = this.x > xMax ? xMax : this.x;
        this.y = this.y > yMax ? yMax : this.y;
        return this;
    }

    addSelf(v2) {
        this.x += v2.x;
        this.y += v2.y;
        return this;
    }

    multiply(n) {
        return new Vector2(this.x * n, this.y * n);
    }
}

var circles = [];
var addCircleFrame = 0;
var addCount = 0;
var clearFrameCount = 0;

var lines = [new Line()];
function loop() {
    // canvas.putImageData(gaussBlur(canvas.getImageData(0, 0, width, height)), 0, 0);
    // canvas.fillStyle="rgba(255, 255, 255, 0.1)";
    // canvas.fillStyle="rgba(0, 0, 0, 1)";
    // canvas.fillRect(0, 0, width, height);
    addCount += 1;
    clearFrameCount += 1;
    // if(addCount >= addCircleFrame && circles.length < 50) {
    //     addCircle();
    //     addCount = 0;
    //     addCircleFrame = randInt(60);
    // }
    // if(clearFrameCount > 120) {
    //     canvas.fillStyle="rgba(255, 255, 255, 0.5)";
    //     canvas.fillRect(0, 0, width, height);
    //     clearFrameCount = 0;
    // }


    animationCircles();
    if(!animationLines()) {
        // requestAnimationFrame(loop);
        return loop();
    }
}

requestAnimationFrame(loop);

function addCircle() {
    circles.push(new Circle());
}

function animationCircles() {
    for(let i = circles.length; i--;) {
        circles[i].tick(canvas, circles, i);
    }
}

function animationLines() {
    for(let i = lines.length; i--;) {
        lines[i].tick(canvas, lines, i);
    }

    if(!lines.length) {
        return true;
    }
}

function randInt(max) {
    return Math.round(Math.random() * max);
}

function gaussBlur(data) {
  var px = data.data;
  var tmpPx = new Uint8ClampedArray(px.length);
  tmpPx.set(px);

  for (var i = 0, len= px.length; i < len; i++) {
     if (i % 4 === 3) {continue;}

     px[i] = ( tmpPx[i] 
        + (tmpPx[i - 4] || tmpPx[i])
        + (tmpPx[i + 4] || tmpPx[i]) 
        + (tmpPx[i - 4 * data.width] || tmpPx[i])
        + (tmpPx[i + 4 * data.width] || tmpPx[i]) 
        + (tmpPx[i - 4 * data.width - 4] || tmpPx[i])
        + (tmpPx[i + 4 * data.width + 4] || tmpPx[i])
        + (tmpPx[i + 4 * data.width - 4] || tmpPx[i])
        + (tmpPx[i - 4 * data.width + 4] || tmpPx[i])
        )/9;
  };
  return data;
}

//输入的h范围为[0,360],s,l为百分比形式的数值,范围是[0,100] 
//输出r,g,b范围为[0,255],可根据需求做相应调整
function hsltorgb(h,s,l,a){
	var h = h / 360;
	var s = s / 100;
	var l = l / 100;
	var rgb = [];

	if(s == 0) {
		rgb=[ Math.round( l * 255 ), Math.round(l * 255), Math.round(l * 255 ) ];
	} else {
		var q = l >= 0.5 ? (l + s - l * s) : ( l * ( 1 + s ) );
		var p = 2 * l - q;
		rgb[0] = h+1/3;
		rgb[1] = h;
		rgb[2] = h-1/3;
		for(var i=0; i < rgb.length; i++){
			var tc=rgb[i];
			if(tc<0){
				tc=tc+1;
			}else if(tc>1){
				tc=tc-1;
			}
			switch(true){
				case (tc<(1/6)):
					tc=p+(q-p)*6*tc;
					break;
				case ((1/6)<=tc && tc<0.5):
					tc=q;
					break;
				case (0.5<=tc && tc<(2/3)):
					tc=p+(q-p)*(4-6*tc);
					break;
				default:
					tc=p;
					break;
			}
			rgb[i]=Math.round(tc*255);
		}
	}
	return a ? "rgba("+rgb[0]+","+rgb[1]+","+rgb[2]+", "+a+")" : "rgb("+rgb[0]+","+rgb[1]+","+rgb[2]+")";
}