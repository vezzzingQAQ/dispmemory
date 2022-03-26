// *************************************************
// arthematics.color.js
// author:vezzzing
// start at 2021.12.14 [2022.1.26]
// 储存绘图方程
// *************************************************

var drawMRect;
var drawBRect;
var drawSRect;
var drawCRect;

var drawPoint;

var drawMCircle;
var drawBCircle;
var drawSCircle;
var drawCCircle;

var drawLine;

drawMRect = (sobj, oobj, size = 10) => {
    rectCenter(sobj.x, sobj.y, size, size);
}

drawBRect = (sobj, oobj, size = 20) => {
    rectCenter(sobj.x, sobj.y, size, size);
}

drawSRect = (sobj, oobj, size = 4) => {
    rectCenter(sobj.x, sobj.y, size, size);
}

drawCRect = (sobj, oobj, size = 20) => {
    let cz = oobj.z;
    if (oobj.z == undefined || oobj.z == null) {
        cz = oobj.y;
    }
    rectCenter(sobj.x, sobj.y, map(cz, -1, 1, 0, size), map(cz, -1, 1, 0, size));
}

drawPoint = (sobj, oobj) => {
    point(sobj.x, sobj.y);
}

drawMCircle = (sobj, oobj, size = 10) => {
    circleCenter(sobj.x, sobj.y, size);
}

drawBCircle = (sobj, oobj, size = 20) => {
    circleCenter(sobj.x, sobj.y, size);
}

drawSCircle = (sobj, oobj, size = 4) => {
    circleCenter(sobj.x, sobj.y, size);
}

drawCCircle = (sobj, oobj, size = 20) => {
    let cz = oobj.z;
    if (oobj.z == undefined || oobj.z == null) {
        cz = oobj.y;
    }
    circleCenter(sobj.x, sobj.y, map(cz, -1, 1, 0, size));
}

drawLine = (sobj, oobj) => {
    let k = (sobj.y - sobj.py) / (sobj.x - sobj.px);
    if (Math.abs(k) < 289) {
        line(sobj.x, sobj.y, sobj.px, sobj.py);   
    }
}
