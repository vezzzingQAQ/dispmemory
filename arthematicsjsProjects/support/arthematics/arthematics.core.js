// *************************************************
// arthematics.core.js
// author:vezzzing
// start at 2021.12.14 [2022.1.19]
// 核心绘图文件
// *************************************************

// *************************************************
// 全局变量
// *************************************************

/*自动帧率调控*/
var pcurrentTime = (+ new Date);
var currentTime;
var deltaTime;//每帧时间差
var calFrameCount = 0;//自动调节后的帧数
var T = 0;//自动调节后的帧数/10
var fps = 0;

/*常规全局变量*/
var canvasParent;//canvas父DOM
var canvas;//canvasDOM
var context;//绘制的context
var frameCount = 0;//帧数
var windowWidth = window.innerWidth;//窗口宽高
var windowHeight = window.innerHeight;//窗口宽高
var width = 1200;
var height = 900;

/*常规全局变量*/
var frameCount = 0;//帧数
var windowWidth = window.innerWidth;//窗口宽高
var windowHeight = window.innerHeight;//窗口宽高
var width = 1200;
var height = 900;

/*按钮变量*/
const RGB = 1//默认状态
const HSV_RGB = 2//允许HSV转换
var colorMode = HSV_RGB;

/*常规绘图函数*/

//结构函数
var resizeCanvas;
var resizeCanvasByDom;

//绘图宏
var noFill;
var noStroke;
var fill;
var stroke;
var strokeWidth;
var background;
var clear;

//坐标变换
var pushMatrix;
var popMatrix;
var translate;
var rotate;
var scale;

//图形绘制
var point;
var rect;
var rectCenter;
var circle;
var circleCenter;
var line;
var textSize;
var text;

//中间变量
var _ctextSize = 14;//目前的字大小

//绘图中暂时保存
var fillTemp;
var strokeTemp;
var strokeWidthTemp;

//输出
var capture;

//交互
var mx = 0;
var my = 0;

/*全局操作函数*/
var start;
var loop;
var noloop;
var reload;

var mousedown;
var mouseup;

var _loopFunction;//储存位于loop中的函数体

/*颜色创建*/
var rgba;
var rgb;
var r;
var g;
var b;
var hsva;
var hsv;

/*基本数学函数*/
var sin;
var asin;
var cos;
var acos;
var tan;
var atan;
var abs;
var random;
var floor;
var round;
var sqrt;
var log;
var max;
var min;
var atan2;
/*基本映射函数*/
var map;
var scalev;
var constrain;

// *************************************************
// 全局函数
// *************************************************

//截屏
capture = (name) => {
    var link = document.createElement('a');
    link.href = this.canvas.toDataURL();
    link.download = name;
    link.click();//这句代码的作用就是相当于手动点
    //document.removeChild(link);
}

//加载页面完毕后执行
start = (dom, f, rate = 1) => {
    //创建canvasDOM
    canvas = document.createElement("canvas");
    canvas.width = dom.offsetWidth * rate;
    canvas.height = dom.offsetHeight * rate;
    canvas.id = "arthematicsCanvas";
    canvas.isMouseDown = false;
    canvas.addEventListener("mousedown", function () {
        canvas.isMouseDown = true;
    });
    canvas.addEventListener("mouseup", function () {
        canvas.isMouseDown = false;
    });
    canvas.class = "atmiCanvas";
    canvas.style.margin = 0;
    canvas.style.padding = 0;
    canvas.style.width = dom.offsetWidth + "px";
    canvas.style.height = dom.offsetHeight + "px";
    canvas.style.boxSizing = "border-box";
    dom.appendChild(canvas);
    canvas.dom = dom;
    //创建IO区
    canvas.ioarea = document.createElement("div");
    canvas.ioarea.id = "ioarea_div";
    canvas.ioarea.style.position = "absolute";
    if (dom.offsetWidth > 500) {
        canvas.ioarea.style.width = "300px";
        canvas.ioarea.style.left = "50px";
        canvas.ioarea.style.top = "50px"; 
        canvas.ioarea.onmousedown = function (event) {
            console.log(event.target);
            if (event.target.className != "athObject") {
                let ox=event.clientX-canvas.ioarea.offsetLeft;
                let oy=event.clientY-canvas.ioarea.offsetTop;
                /*只能写在内部*/
                document.onmousemove=function(event){
                    let x=event.clientX-ox;
                    let y=event.clientY-oy;
                    canvas.ioarea.style.left=x+"px";
                    canvas.ioarea.style.top=y+"px"
                };
                
                document.onmouseup=function(){
                    document.onmousemove=null;
                    document.onmouseup=null;
                };
                return false;
            }
        }
    } else {
        canvas.ioarea.style.width = dom.offsetWidth+"px";
        canvas.ioarea.style.left = "0";
        canvas.ioarea.style.top = "0";    
    }
    canvas.ioarea.style.height = "min-content";
    canvas.ioarea.style.backgroundColor = "rgba(125,125,125,0.5)";
    //canvas.ioarea.style.border = "2px solid white";
    canvas.ioarea.style.zIndex = "5";
    dom.appendChild(canvas.ioarea);
    //添加摄像头的video
    canvas.video = document.createElement("video");
    canvas.video.id = "cvideo";
    canvas.video.style.zIndex=-1;
    canvas.video.videoWidth=canvas.width;
    canvas.video.videoHeight = canvas.height;
    dom.appendChild(canvas.video);
    //绑定交互
    canvas.addEventListener("mousemove", function (event) {
        mx = event.offsetX*(canvas.width/dom.offsetWidth);
        my = event.offsetY*(canvas.width/dom.offsetWidth);
    });
    canvas.addEventListener("mousedown", function (event) {
        mx = event.offsetX*(canvas.width/dom.offsetWidth);
        my = event.offsetY * (canvas.width / dom.offsetWidth);
        try {
            mousedown();
        }catch{}
    });
    canvas.addEventListener("mouseup", function (event) {
        mx = event.offsetX * (canvas.width / dom.offsetWidth);
        my = event.offsetY * (canvas.width / dom.offsetWidth);
        try {
            mouseup();
        } catch { }
    });
    //设置全局变量
    width = canvas.width;
    height = canvas.height;
    context = canvas.getContext("2d");
    canvasParent = dom;
    //运行创建函数
    f();
}

//按照最快刷新速度执行
loop = (f) => {
    function loopInside() {
        frameCount++;
        //运行传入函数
        f();
        //实现动态帧率
        let currentTime = (+ new Date);
        deltaTime = currentTime - pcurrentTime;
        calFrameCount += deltaTime / (50 / 3);
        T = calFrameCount / 10;
        fps = 1000 / (deltaTime);
        pcurrentTime = currentTime;
        //不用window.会反复覆盖导致Bug-2022.2.14
        _loopFunction = window.requestAnimationFrame(loopInside);
    }
    _loopFunction = window.requestAnimationFrame(loopInside);
}

//停止循环
noloop = () => {
    window.cancelAnimationFrame(_loopFunction);
}

//重置画布
reload = () => {
    //停止loop函数
    try {
        noloop();
    } catch {
        //还没有创建loop函数
    }
    //停止摄像头
    try {
        closeMedia()
    } catch {
        
    }
    _loopFunction = null;
    //移除IO区
    canvas.dom.removeChild(document.querySelector("#ioarea_div"));
    //移除video
    canvas.dom.removeChild(document.querySelector("video"));
    //清空全局变量
    canvas = null;
    context = null;
    frameCount = 0;
    calFrameCount = 0;
    T = 0;//十分之一帧数
    windowWidth = window.innerWidth;//窗口宽高
    windowHeight = window.innerHeight;//窗口宽高
}

/*颜色创建*/
//创建RGBA颜色
rgba = (p1, p2, p3, p4) => {
    return (new RGBColor(p1, p2, p3, p4));
}

//创建RGB颜色
rgb = (p1, p2, p3) => {
    return (new RGBColor(p1, p2, p3));
}

//创建只有R值的RGB颜色
r = function (p1) {
    if (arguments.length == 1) {
        return (new RGBColor(p1, 0, 0));
    } else {
        throw new Error("试图错误地创建颜色!!")
    }
}

//创建只有G值的RGB颜色
g = function (p1) {
    if (arguments.length == 1) {
        return (new RGBColor(0, p1, 0));
    } else {
        throw new Error("试图错误地创建颜色!!")
    }
}

//创建只有B值的RGB颜色
b = function (p1) {
    if (arguments.length == 1) {
        return (new RGBColor(0, 0, p1));
    } else {
        throw new Error("试图错误地创建颜色!!")
    }
}

//创建HSVA颜色
hsva = function (h, s, v, a) {
    if (arguments.length == 3) {
        return (new HSVColor(h, s, v));
    } else if (arguments.length == 4) {
        return (new HSVColor(h, s, v, a));
    } else {
        throw new Error("试图错误地创建颜色!!")
    }
}

//创建HSV颜色
hsv = function (h, s, v) {
    if (arguments.length == 3) {
        return (new HSVColor(h, s, v));
    } else {
        throw new Error("试图错误地创建颜色!!")
    }
}

/*数学函数*/
sin = Math.sin;
asin = Math.asin;
cos = Math.cos;
acos = Math.acos;
tan = Math.tan;
atan = Math.atan;
abs = Math.abs;
floor = Math.floor;
sqrt = Math.sqrt;
log=Math.log;
max = Math.max;
min = Math.min;
atan2 = Math.atan2;
round = (x, value) => {
    try {
        return (x.toFixed(value));
    } catch {
        throw new Error("使用round函数错误");
    }
}
random = (from, to) => {
    try {
        //random(-10,10)->
        return (Math.random() * (Math.abs(from - to)) + from);
    } catch {
        throw new Error("使用random函数错误");
    }
}

/*映射函数*/
map = (p, fp, tp, fa, ta) => {
    try {
        return ((fa * p - fa * tp - ta * p + ta * fp) / (fp - tp));
    } catch {
        throw new Error("使用map错误");
    }
}
scalev = (delta, from, to) => {
    try {
        return (delta * to / from);
    } catch {
        throw new Error("使用scalev错误");
    }
}
constrain=(x, minx, maxx)=>{
    if (x < minx) {
        return minx;
    }else if(x>maxx){
        return maxx;
    }else{
        return x;
    }
}
/*canvas函数*/
resizeCanvas = (width, height) => {
    canvas.width = width;
    canvas.height = height;
    width = width;
    height = height;
    windowWidth = window.innerWidth;//窗口宽高
    windowHeight = window.innerHeight;//窗口宽高
}

resizeCanvasByDom = (dom) => {
    canvas.width = dom.offsetWidth;
    canvas.height = dom.offsetHeight;
    width = dom.offsetWidth;
    height = dom.offsetHeight;
    windowWidth = window.innerWidth;//窗口宽高
    windowHeight = window.innerHeight;//窗口宽高
}

/*基本绘图函数*/
noFill = () => {
    context.fillStyle = "transparent";
}
noStroke = () => {
    context.strokeStyle = "transparent";
}
fill = (color) => {
    context.fillStyle = color.toStyle();
}
stroke = (color) => {
    context.strokeStyle = color.toStyle();
}
strokeWidth = (w) => {
    context.lineWidth = w;
}
point = (x, y) => {
    context.beginPath();
    context.rect(x, y, 1, 1);
    context.closePath();
    context.fill();
}
rect = (x, y, width, height) => {
    context.beginPath();
    context.rect(x, y, width, height);
    context.closePath();
    context.fill();
    context.stroke();
}
rectCenter = (x, y, width, height) => {
    context.beginPath();
    context.rect(x - width / 2, y - height / 2, width, height);
    context.closePath();
    context.fill();
    context.stroke();
}
circle = (x, y, r) => {
    context.beginPath();
    context.arc(x + r, y + r, r, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
    context.stroke();
}
circleCenter = (x, y, r) => {
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
    context.stroke();
}
background = (color) => {
    fillTemp = context.fillStyle;
    context.fillStyle = `rgba(${color.r},${color.g},${color.b},${color.a})`;
    context.rect(-500000, -500000, 1000000, 1000000);
    context.fill();
    context.fillStyle = fillTemp;
}
clear = () => {
    context.clearRect(-500000, -500000, 1000000, 1000000);
}
line = (x1, y1, x2, y2) => {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.closePath();
    context.stroke();
}
textSize = (size) => {
    _ctextSize = size;
}
text = (words, x, y) => {
    context.font = _ctextSize + "px sans-serif";
    context.fillText(words, x, y);
    context.strokeText(words, x, y);
}

/*坐标变换*/
pushMatrix = () => {
    fillTemp = context.fillStyle;
    strokeTemp = context.strokeStyle;
    strokeWidthTemp = context.lineWidth;
    context.save();
}
popMatrix = () => {
    context.restore();
    context.fillStyle = fillTemp;
    context.strokeStyle = strokeTemp;
    context.lineWidth = strokeWidthTemp;
}
translate = (x, y) => {
    context.translate(x, y);
}
rotate = (angle) => {
    context.rotate(angle);
}
scale = (sx, sy) => {
    context.scale(sx, sy);
}

// *************************************************
// 颜色类
// *************************************************

//RGBA颜色类-RGB:[0,255],A:[0,1]
class RGBColor {
    constructor(p1, p2, p3, p4) {
        if (arguments.length == 4) {
            this.r = p1;
            this.g = p2;
            this.b = p3;
            this.a = p4;
        } else if (arguments.length == 3) {
            this.r = p1;
            this.g = p2;
            this.b = p3;
            this.a = 1;
        } else if (arguments.length == 2) {
            this.r = p1;
            this.g = p1;
            this.b = p1;
            this.a = p2;
        } else if (arguments.length == 1) {
            this.r = p1;
            this.g = p1;
            this.b = p1;
            this.a = 1;
        } else {
            throw new Error("颜色初始化错误", "参见:颜色初始化");
        }
    }
    toStyle() {
        return `rgba(${this.r},${this.g},${this.b},${this.a})`;
    }
    toGrayScale() {
        let avg = (this.r + this.g + this.b) / 3;
        this.r = avg;
        this.g = avg;
        this.b = avg;
    }
    add1(newColor) {//颜色加法,多余归顶-颜色对象【rgb】
        this.r += newColor.r;
        this.g += newColor.g;
        this.b += newColor.b;
        return (this);
    }
    add1R(r) {//颜色加法,多余归顶-颜色R
        this.r += r;
        return (this);
    }
    add1G(g) {//颜色加法,多余归顶-颜色G
        this.g += g;
        return (this);
    }
    add1B(b) {//颜色加法,多余归顶-颜色B
        this.b += b;
        return (this);
    }
    add2(newColor) {//颜色加法,多余折返-颜色对象【rgb】
        this.r = (this.r + newColor.r) % 255;
        this.g = (this.g + newColor.g) % 255;
        this.b = (this.b + newColor.b) % 255;
        return (this);
    }
    add2R(r) {//颜色加法,多余折返-颜色R
        this.r = (this.r + r) % 255;
        return (this);
    }
    add2G(g) {//颜色加法,多余折返-颜色G
        this.g = (this.g + g) % 255;
        return (this);
    }
    add2B(b) {//颜色加法,多余折返-颜色B
        this.b = (this.b + b) % 255;
        return (this);
    }
    invert() {//反色
        this.r = 255 - this.r;
        this.g = 255 - this.g;
        this.b = 255 - this.b;
        return (this);
    }
    toRGBBound() {//归顶到RGB
        if (Math.max(this.r, this.g, this.b) == this.r) {
            this.r = 255; this.g = 0; this.b = 0;
        } else if (Math.max(this.r, this.g, this.b) == this.g) {
            this.r = 0; this.g = 255; this.b = 0;
        } else {
            this.r = 0; this.g = 0; this.b = 255;
        }
        return (this);
    }
}

//HSBA颜色类-H:[0,360],S:[0,1],B:[0,1]
class HSVColor {
    constructor(h, s, v, a) {
        if (arguments.length == 3) {
            this.h = h;
            this.s = s;
            this.v = v;
            this.a = 1;
        } else if (arguments.length == 4) {
            this.h = h;
            this.s = s;
            this.v = v;
            this.a = a;
        } else {
            throw new Error("颜色初始化错误", "参见:颜色初始化");
        }
    }
    toStyle() {
        return `hsla(${this.h},${this.s * 100}%,${this.v * 100}%,${this.a})`;
    }
    toGrayScale() {
        this.s = 0;
    }
    invertH() {//色相反色
        this.h = 360 - this.h;
        return (this);
    }
    add1H(h) {//颜色加法,多余归顶-颜色H
        if (this.h + h < 360 && this.h + h > 0) {
            this.h += h;
        } else {
            if (this.h + h > 360) { this.h = 360 };
            if (this.h + h < 0) { this.h = 0 };
        }
        return (this);
    }
    add2H(h) {//颜色加法,多余折返-颜色H
        this.h = (this.h + h) % 360;
        return (this);
    }
}
