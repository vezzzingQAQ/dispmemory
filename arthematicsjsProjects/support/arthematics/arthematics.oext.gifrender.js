var GV_draw2loopf;

var gv2lf_obj;

var captureGIFstart;
var captureGIFadd;
var _captureGIF_obj;
var captureGIFend;

class GV_draw2loopFunctionObject extends R_draw2loopf_obj {
    constructor(fobj) {
        super(fobj);

        this.currentt = this.ft;
        this.currentIndex = 0;

        this.gif = new GIF({
            works: 2,
            quality: 1,
            width: width,
            height: height,
            workerScript: "./../libs/gif.worker.js",
            //debug:true
        });

        this.frameIsFinished = false;

        this.isRendering = true;
        this.isFinished = false;
        background(rgb(0, 0, 0));
    }
    renderFrame(currenty, currentt) {
        let iy = currenty;
        for (let ix = this.fx; ix <= this.tx; ix += this.deltax) {
            let az = this.f(ix, iy, currentt);//注意三元函数
            this.colorf(ix, iy, az, currentt);
            this.shapef(this.mapf(ix, iy, az, this).x, this.mapf(ix, iy, az, this).y, az);
        }
    }
    renderImg(currentt) {
        //判断合法性
        let xcount = (this.tx - this.fx) / this.deltax;
        if (this.tx > this.fx && this.ty > this.fy && this.deltax > 0 && this.deltay > 0 && xcount < this.MAX_ITERATION) {
            if (this.currenty <= this.ty) {
                this.renderFrame(this.currenty, currentt);
                this.currenty += this.deltay;
            } else {
                this.frameIsFinished = true;
            }
        } else {
            throw new Error("绘制函数参数赋值错误");
        }
    }
    renderImgGroup() {
        if (this.currentt <= this.tt) {
            if (this.frameIsFinished) {
                this.currentIndex++;
                //capture("atmt" + this.currentIndex + ".png");旧版捕获图片
                //新版直接导出gif
                this.gif.addFrame(canvas, { copy: true, delay: 40 });

                background(rgb(0, 0, 0));
                this.currentt += this.deltat;
                this.frameIsFinished = false;
                this.currenty = this.fy;
            }
            this.renderImg(this.currentt);
        } else {
            //导出gif
            background(rgb(0, 0, 0));
            fill(rgb(250, 250, 250));
            noStroke();
            text("正在渲染GIF。。。", width / 2, height / 2);
            if (this.isRendering) {
                this.gif.render();

                this.gif.on('finished', function (blob) {
                    //alert(1);
                    var el = document.createElement('a');
                    el.href = URL.createObjectURL(blob);
                    el.download = 'demo-name'; //设置下载文件名称
                    el.click();
                });
            }
            this.isFinished = true;
            this.isRendering = false;
            return;
        }
    }
}

//渲染二维函数动画
GV_draw2loopf = (fobj) => {
    if (checkIsFirstUse()) {//loop中的第一次调用
        gv2lf_obj = new GV_draw2loopFunctionObject(fobj);
    }
    gv2lf_obj.renderImgGroup();
}

captureGIFstart = () => {
    _captureGIF_obj = new GIF({
        works: 3,
        quality: 1,
        width: width,
        height: height,
        workerScript: "./../libs/gif.worker.js",
    });
}

captureGIFadd = () => {
    _captureGIF_obj.addFrame(canvas, { copy: true, delay: 40 });
}

captureGIFend = () => {
    if (_captureGIF_obj) {
        _captureGIF_obj.render();
        _captureGIF_obj.on('finished', function (blob) {
            var el = document.createElement('a');
            el.href = URL.createObjectURL(blob);
            el.download = 'demo-name'; //设置下载文件名称
            el.click();
        });
    }
}