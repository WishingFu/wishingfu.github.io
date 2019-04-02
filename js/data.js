var canvasElement = document.querySelector("#bg-canvas");

var ratio = window.devicePixelRatio;
var width = window.innerWidth * ratio;
var height = window.innerHeight * ratio;
canvasElement.style.width = window.innerWidth + "px";
canvasElement.style.height = window.innerHeight + "px";
canvasElement.width = width;
canvasElement.height = height;

var canvas = canvasElement.getContext("2d");

var PI2 = 2 * Math.PI;

class Circle {
    constructor() {
        this.maxr = randInt(200);
        this.color = hsltorgb(randInt(360), 50, 50);
        this.x = randInt(width);
        this.y = randInt(height);
        this.r = 0;
        this.time = 0;
        this.life = randInt(10 * 1000);
    }

    tick(c, cs, i) {
        this.time += 16.7;
        this.r = this.maxr * this.time / this.life;
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

var circles = [];
var addCircleFrame = 0;
var addCount = 0;

function loop() {
    // canvas.putImageData(gaussBlur(canvas.getImageData(0, 0, width, height)), 0, 0);
    canvas.fillStyle="rgba(0, 0, 0, 0.03)";
    canvas.fillRect(0, 0, width, height);
    addCount += 1;
    if(addCount >= addCircleFrame && circles.length < 50) {
        addCircle();
        addCount = 0;
        addCircleFrame = randInt(60);
    }

    animationCircles();

    requestAnimationFrame(loop);
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
function hsltorgb(h,s,l){
	var h=h/360;
	var s=s/100;
	var l=l/100;
	var rgb=[];

	if(s==0){
		rgb=[Math.round(l*255),Math.round(l*255),Math.round(l*255)];
	}else{
		var q=l>=0.5?(l+s-l*s):(l*(1+s));
		var p=2*l-q;
		var tr=rgb[0]=h+1/3;
		var tg=rgb[1]=h;
		var tb=rgb[2]=h-1/3;
		for(var i=0; i<rgb.length;i++){
			var tc=rgb[i];
			console.log(tc);
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
	
	return "rgb("+rgb[0]+","+rgb[1]+","+rgb[2]+")";
}