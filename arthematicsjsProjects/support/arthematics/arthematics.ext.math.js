// *************************************************
// arthematics.math.js
// author:vezzzing
// start at 2021.12.14 [2022.1.19]
// 储存数学绘图类和数学概念函数
// *************************************************

// *************************************************
// 全局变量
// *************************************************

//全局常数
const PI = Math.PI;
const TWOPI = Math.PI;
const E = Math.E;

/*函数绘制*/
var I_draw1loopf;//实时渲染一【二】元函数

var I_draw2loopf;//实时绘制二【三】元函数
var R_draw2loopf;//渲染绘制二元函数

var I_draw1loopc;//实时渲染一【二】元参数方程

var I_draw1loopf_s;
var I_draw1loopc_s;
var I_draw2loopf_s;


var id1lf_obj;

var id2lf_obj;
var rd2lf_obj;

var id1lc_obj;

var currentFrameFlag = -1;

window.fx = 0;
window.tx = 0;
window.fy = 0;
window.ty = 0;

// *************************************************
// 全局函数
// *************************************************
//一元函数
class Base1loopFunction {
    constructor(
        {
            sizex = width,
            fx = -4, tx = 4, deltax = 0.01,
            f = (x) => {
                return sin(x);
            }, colorf = (s, o) => {
                fill(rgb(150, 150, 150));
                stroke(rgb(150, 150, 150));
            }, shapef = (s, o) => {
                rectCenter(s.x, s.y, 3, 3);
            }, mapf = (x, y) => {
                return {
                    x: map(x, this.fx, this.tx, width / 2 - this.sizex / 2, width / 2 + this.sizex / 2),
                    y: map(y, 1, -1, height / 2 - 100, height / 2 + 100)
                }
            }
        }
    ) {
        this.sizex = sizex;
        this.fx = fx;
        this.tx = tx;
        this.deltax = deltax;
        this.f = f;
        this.colorf = colorf;
        this.shapef = shapef;
        this.mapf = mapf;

        this.MAX_ITERATION = 100000;//限制运算量
        this.iterationCount = (this.tx - this.fx) / this.deltax;

        window.fx = this.fx;
        window.tx = this.tx;
    }
    calculate(x) {
        return this.f(x);
    }
}
class I_draw1loopf_obj extends Base1loopFunction {
    constructor(fobj) {
        super(fobj);
        this.py;
    }
    display() {//有y参数的话加上
        //判断合法性
        let xcount = (this.tx - this.fx) / this.deltax;
        if (this.tx > this.fx && this.deltax > 0 && xcount < this.MAX_ITERATION) {
            //判断函数的传参方式【兼容旧版本】
            let usingObject=false;
            if(isNaN(this.f(1))) usingObject=true;
            for (let ax = this.fx; ax <= this.tx; ax += this.deltax) {
                //兼容旧版本传参方式
                var ay;
                if (usingObject) {
                    ay=this.f(ax).y;
                } else {
                    ay = this.f(ax);
                }
                this.colorf({
                    x: this.mapf(ax, ay, this).x,
                    y: this.mapf(ax, ay, this).y,
                    px: this.mapf(ax - this.deltax, this.py, this).x,
                    py: this.mapf(ax - this.deltax, this.py, this).y
                }, { x: ax, y: ay });
                this.shapef({
                    x: this.mapf(ax, ay, this).x,
                    y: this.mapf(ax, ay, this).y,
                    px: this.mapf(ax - this.deltax, this.py, this).x,
                    py: this.mapf(ax - this.deltax, this.py, this).y
                }, { x: ax, y: ay });
                this.py = ay;
            }
        } else {
            throw new Error("绘制函数参数赋值错误");
        }
    }
}
//一元参数方程
class Base1loopCsf {
    constructor(
        {
            fs = -4, ts = 4, deltas = 0.01,
            f = (s) => {
                return {
                    x: sin(s) * 100,
                    y: cos(s) * 100,
                }
            }, colorf = (s, o) => {
                fill(rgb(150, 150, 150));
                stroke(rgb(150, 150, 150));
            }, shapef = (s, o) => {
                rectCenter(s.x, s.y, 3, 3);
            }, mapf = (x, y) => {
                return {
                    x: x + width / 2,
                    y: y + height / 2,
                }
            }
        }
    ) {
        this.fs = fs;
        this.ts = ts;
        this.deltas = deltas;
        this.f = f;
        this.colorf = colorf;
        this.shapef = shapef;
        this.mapf = mapf;

        this.MAX_ITERATION = 100000;//限制运算量
        this.iterationCount = (this.ts - this.fs) / this.deltas;

        window.fs = this.fs;
        window.ts = this.ts;
    }
    calculate(s) {
        return this.f(s);
    }
}
class I_draw1loopc_obj extends Base1loopCsf {
    constructor(fobj) {
        super(fobj);
        this.spx;
        this.spy;
        this.opx;
        this.opy;
    }
    display() {//有y参数的话加上
        //判断合法性
        let scount = (this.ts - this.fs) / this.deltas;
        if (this.ts > this.fs && this.deltas > 0 && scount < this.MAX_ITERATION) {
            for (let s = this.fs; s <= this.ts; s += this.deltas) {
                let ox = this.f(s).x;
                let oy = this.f(s).y;
                let sx = this.mapf(ox, oy).x;
                let sy = this.mapf(ox, oy).y;
                if (s != this.fs) {
                    this.colorf({
                        x: sx,
                        y: sy,
                        px: this.spx,
                        py:this.spy
                    }, {
                        x: ox, y: oy,s:s,
                        px: this.opx,
                        py:this.opy });
                    this.shapef({
                        x: sx,
                        y: sy,
                        px: this.spx,
                        py:this.spy
                    }, {
                        x: ox, y: oy,s:s,
                        px: this.opx,
                        py:this.opy });
                }
                this.opx = ox;
                this.opy = oy;
                this.spx = sx;
                this.spy=sy;
            }
        } else {
            throw new Error("绘制函数参数赋值错误");
        }
    }
}
//二元函数
class Base2loopFunction {
    constructor(
        {
            sizex = 200, sizey = 200,
            fx = -2, tx = 2, deltax = 0.1,
            fy = -2, ty = 2, deltay = 0.1,
            ft = -PI, tt = PI, deltat = 0.15,
            f = (x, y) => {
                return {z:sin(x * y + T)};
            }, colorf = (s, o) => {
                noStroke();
                fill(rgb(
                    map(o.x, -2, 2, 0, 255),
                    map(o.y, -2, 2, 0, 255),
                    map(o.z, -1, 1, 0, 255)
                ));
            }, shapef = (s, o) => {
                rectCenter(s.x, s.y, map(o.z, -1, 1, 0, 10), map(o.z, -1, 1, 0, 10));
            }, mapf = (x, y, z) => {
                return {
                    x: map(x, this.fx, this.tx, width / 2 - this.sizex / 2, width / 2 + this.sizex / 2),
                    y: map(y, this.fy, this.ty, height / 2 + this.sizey / 2, height / 2 - this.sizey / 2)
                }
            }
        }
    ) {
        this.sizex = sizex;
        this.sizey = sizey;
        this.fx = fx;
        this.fy = fy;
        this.ft = ft;
        this.tx = tx;
        this.ty = ty;
        this.tt = tt;
        this.deltax = deltax;
        this.deltay = deltay;
        this.deltat = deltat;
        this.f = f;
        this.colorf = colorf;
        this.shapef = shapef;

        this.mapf = mapf;

        this.MAX_ITERATION = 100000;//限制运算量
        this.iterationCount = ((this.tx - this.fx) / this.deltax) * ((this.ty - this.fy) / this.deltay);

        window.fx = this.fx;
        window.tx = this.tx;
        window.fy = this.fy;
        window.ty = this.ty;
    }
    calculate(x, y) {
        return this.f(x, y);
    }
}
class I_draw2loopf_obj extends Base2loopFunction {
    constructor(fobj) {
        super(fobj);
        this.pz;
    }
    display() {
        //判断合法性
        let xcount = (this.tx - this.fx) / this.deltax;
        let ycount = (this.ty - this.fy) / this.deltay;
        if (this.tx > this.fx && this.ty > this.fy && this.deltax > 0 && this.deltay > 0 && xcount * ycount < this.MAX_ITERATION) {
            //判断函数的传参方式【兼容旧版本】
            let usingObject=false;
            if(isNaN(this.f(1,1))) usingObject=true;
            for (let ax = this.fx; ax <= this.tx; ax += this.deltax) {
                for (let ay = this.fy; ay <= this.ty; ay += this.deltay) {
                    var az;
                    if (usingObject) {
                        az=this.f(ax,ay).z;
                    } else {
                        az = this.f(ax,ay);
                    }    
                    if (ay != this.fy) {
                        this.colorf({
                            x: this.mapf(ax, ay, az, this).x,
                            y: this.mapf(ax, ay, az, this).y,
                            px: this.mapf(ax, ay-this.deltay, this.pz, this).x,
                            py: this.mapf(ax, ay-this.deltay, this.pz, this).y
                        }, { x: ax, y: ay, z: az });
                        this.shapef({
                            x: this.mapf(ax, ay, az, this).x,
                            y: this.mapf(ax, ay, az, this).y,
                            px: this.mapf(ax, ay-this.deltay, this.pz, this).x,
                            py: this.mapf(ax, ay-this.deltay, this.pz, this).y
                        }, { x: ax, y: ay, z: az });
                    }
                    this.pz = az;
                }
            }
        } else {
            throw new Error("绘制函数参数赋值错误");
        }
    }
}
class R_draw2loopf_obj extends Base2loopFunction {
    constructor(fobj) {
        super(fobj);
        this.currenty = fobj.fy;
        this.isRendering = true;
        this.isFinished = false;
        this.pz;
    }
    renderFrame(currenty) {
        let ay = currenty;
        //判断函数的传参方式【兼容旧版本】
        let usingObject=false;
        if(isNaN(this.f(1,1))) usingObject=true;
        for (let ax = this.fx; ax <= this.tx; ax += this.deltax) {
            let az;
            if (usingObject) {
                az=this.f(ax,ay).z;
            } else {
                az = this.f(ax,ay);
            }    
            if (ax != this.fx) {
                this.colorf({
                    x: this.mapf(ax, ay, az, this).x,
                    y: this.mapf(ax, ay, az, this).y,
                    px: this.mapf(ax, ay-this.deltay, this.pz, this).x,
                    py: this.mapf(ax, ay-this.deltay, this.pz, this).y
                }, { x: ax, y: ay, z: az });
                this.shapef({
                    x: this.mapf(ax, ay, az, this).x,
                    y: this.mapf(ax, ay, az, this).y,
                    px: this.mapf(ax, ay-this.deltay, this.pz, this).x,
                    py: this.mapf(ax, ay-this.deltay, this.pz, this).y
                }, { x: ax, y: ay, z: az });
            }
            this.pz = az;
        }
    }
    render() {
        //判断合法性
        let xcount = (this.tx - this.fx) / this.deltax;
        if (this.tx > this.fx && this.ty > this.fy && this.deltax > 0 && this.deltay > 0 && xcount < this.MAX_ITERATION) {
            if (this.currenty <= this.ty) {
                this.renderFrame(this.currenty);
                this.currenty += this.deltay;
            } else {
                this.isFinished = true;
                this.isRendering = false;
            }
        } else {
            throw new Error("绘制函数参数赋值错误");
        }
    }
}

function checkIsFirstUse() {
    if (frameCount == 0) { return true };
    if (currentFrameFlag != frameCount - 1) {
        currentFrameFlag = frameCount;
        return true;
    } else {
        currentFrameFlag = frameCount;
        return false;
    }
}



I_draw1loopf = (fobj) => {
    if (checkIsFirstUse()) {//loop中的第一次调用
        id1lf_obj = new I_draw1loopf_obj(fobj);
    }
    id1lf_obj.display();
}

I_draw1loopf_s = (fobj) => {
    id1lf_obj = new I_draw1loopf_obj(fobj);
    id1lf_obj.display();
}

I_draw1loopc = (fobj) => {
    if (checkIsFirstUse()) {//loop中的第一次调用
        id1lc_obj = new I_draw1loopc_obj(fobj);
    }
    id1lc_obj.display();
}

I_draw1loopc_s = (fobj) => {
    id1lc_obj = new I_draw1loopc_obj(fobj);
    id1lc_obj.display();
}

I_draw2loopf = (fobj) => {
    if (checkIsFirstUse()) {//loop中的第一次调用
        id2lf_obj = new I_draw2loopf_obj(fobj);
    }
    id2lf_obj.display();
}

I_draw2loopf_s = (fobj) => {
    id2lf_obj = new I_draw2loopf_obj(fobj);
    id2lf_obj.display();
}

//渲染一张二维函数
R_draw2loopf = (fobj) => {
    if (checkIsFirstUse()) {//loop中的第一次调用
        rd2lf_obj = new R_draw2loopf_obj(fobj);
    }
    rd2lf_obj.render();
}


// *************************************************
// 全局数学概念类
// *************************************************

//复数类
class Complex {
    constructor(real, imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }
    add=function(complex){
        return(new Complex(complex.real+this.real,complex.imaginary+this.imaginary));
    }
    mult=function(complex){
        return(new Complex(this.real*complex.real-this.imaginary*complex.imaginary,this.imaginary*complex.real+this.real*complex.imaginary));
    }
    div=function(complex){
        return(new Complex((this.real*complex.real+this.imaginary*complex.imaginary)/(complex.real*complex.real+complex.imaginary*complex.imaginary),
            (this.imaginary*complex.real-this.real*complex.imaginary)/(complex.real*complex.real+complex.imaginary*complex.imaginary)))
    }
    dist(complex) {//两个复数点之间的距离-另一个复数
        return (Math.sqrt((this.real - complex.real) * (this.real - complex.real) + (this.imaginary - complex.imaginary) * (this.imaginary - complex.imaginary)));
    }
    len() {//返回复数的模
        return (Math.sqrt(this.real * this.real + this.imaginary * this.imaginary));
    }
    display() {//以点的形式绘制
        point(this.real, this.imaginary);
    }
    log() {//打印输出
        if (this.imaginary >= 0) {
            return (this.real + "+" + this.imaginary + "i");
        } else {
            return (this.real + "" + this.imaginary + "i");
        }
    }
}

/*数学绘图大类*/
//二元函数类
class Function2d {
    constructor(fromx, tox, padx, fromy, toy, pady, f) {
        fx = fromx;
        tx = tox;
        padx = padx;
        fy = fromy;
        ty = toy;
        pady = pady;
        f = f;
    }
    calculate(x, y) {//计算f(x,y)-x,y
        return (f(x, y));
    }
}

//数学点类
class Point {
    constructor(x, y) {
        x = x;
        y = y;
    }
    display() {//绘制点
        canvasList[currentCanvasIndex].point(x, y);
    }
    log() {//打印输出
        return (`(${x},${y})`);
    }
}

//数学矩形类,默认中心创建
class Rect {
    constructor(x, y, width, height) {
        width = width;
        if (arguments.length == 3) {
            height = width;
        } else if (arguments.length == 4) {
            height = height;
        }
        y = y - height / 2;
        x = x - width / 2;
    }
    display() {//绘制矩形
        canvasList[currentCanvasIndex].rect(x, y, width, height);
    }
    log() {//打印输出
        return (`[x:${x},y:${y},width:${width},height:${height}]`);
    }
}

//数学圆类,默认中心创建
class Circle {
    constructor(x, y, r) {
        r = r;
        x = x - r / 2;
        y = y - r / 2;
    }
    display() {//绘制圆
        canvasList[currentCanvasIndex].circleCenter(x, y, r);
    }
    log() {//打印输出
        return (`[x:${x},y:${y},r:${r}]`);
    }
}

