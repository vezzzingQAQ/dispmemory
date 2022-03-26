// *************************************************
// arthematics.color.js
// author:vezzzing
// start at 2021.12.14 [2022.1.22]
// 储存上色方程
// *************************************************

var cInterf;
var cbRed;
var cbGreen;
var cbBlue;
var cbWhite;
var cwRed;
var cwGreen;
var cwBlue;
var cwBlack;
var cHsvall;

var fillCInterf;
var fillCHsvall;

var fillCBRed;
var fillCBGreen;
var fillCBBlue;
var fillCBWhite;
var fillCWRed;
var fillCWGreen;
var fillCWBlue;
var fillCWBlack;

var strokeCInterf;
var strokeCHsvall;

var strokeCBRed;
var strokeCBGreen;
var strokeCBBlue;
var strokeCBWhite;
var strokeCWRed;
var strokeCWGreen;
var strokeCWBlue;
var strokeCWBlack;

var fillRed;
var fillGreen;
var fillBlue;
var fillBlack;
var fillWhite;

var strokeRed;
var strokeGreen;
var strokeBlue;
var strokeBlack;
var strokeWhite;

/*
自定义系列
*/
cInterf = (z, tns = 110, range = 1) => {
    return new RGBColor(sin(z * tns - range) * 126 + 126, sin(z * tns) * 126 + 126, sin(z * tns + range) * 126 + 126);
}

cbRed = (z, range = 1) => {
    return new RGBColor(map(z, -range, range, 0, 255), 0, 0);
}

cbGreen = (z, range = 1) => {
    return new RGBColor(0, map(z, -range, range, 0, 255), 0);
}

cbBlue = (z, range = 1) => {
    return new RGBColor(0, 0, map(z, -range, range, 0, 255));
}

cwRed = (z, range = 1) => {
    return new RGBColor(map(z, -range, range, 255, 0), 255, 255);
}

cwGreen = (z, range = 1) => {
    return new RGBColor(255, map(z, -range, range, 255, 0), 255);
}

cwBlue = (z, range = 1) => {
    return new RGBColor(255, 255, map(z, -range, range, 255, 0));
}

cwBlack = (z, range = 1) => {
    return new RGBColor(map(z, -range, range, 255, 0), map(z, -range, range, 255, 0), map(z, -range, range, 255, 0));
}

cbWhite = (z, range = 1) => {
    return new RGBColor(map(z, -range, range, 0, 255), map(z, -range, range, 0, 255), map(z, -range, range, 0, 255));
}

cHsvall = (z, range = 1) => {
    return new HSVColor(map(z, -range, range, 0, 360), 1, 0.5);
}

/*
fill系列
*/
fillCInterf = (sobj, oobj, tns = 110, range = 1) => {
    let cz = oobj.z;
    if (oobj.z == undefined || oobj.z == null) {
        cz = oobj.y;
    }
    fill(rgb(sin(cz * tns - range) * 126 + 126, sin(cz * tns) * 126 + 126, sin(cz * tns + range) * 126 + 126));
}

fillCBRed = (sobj, oobj, range = 1) => {
    let cz = oobj.z;
    if (oobj.z == undefined || oobj.z == null) {
        cz = oobj.y;
    }
    fill(rgb(map(cz, -range, range, 0, 255), 0, 0));
}

fillCBGreen = (sobj, oobj, range = 1) => {
    let cz = oobj.z;
    if (oobj.z == undefined || oobj.z == null) {
        cz = oobj.y;
    }
    fill(rgb(0, map(cz, -range, range, 0, 255), 0));
}

fillCBBlue = (sobj, oobj, range = 1) => {
    let cz = oobj.z;
    if (oobj.z == undefined || oobj.z == null) {
        cz = oobj.y;
    }
    fill(rgb(0, 0, map(cz, -range, range, 0, 255)));
}

fillCBWhite = (sobj, oobj, range = 1) => {
    let cz = oobj.z;
    if (oobj.z == undefined || oobj.z == null) {
        cz = oobj.y;
    }
    fill(rgb(map(cz, -range, range, 255, 0), map(cz, -range, range, 255, 0), map(cz, -range, range, 255, 0)));
}

fillCWRed = (sobj, oobj, range = 1) => {
    let cz = oobj.z;
    if (oobj.z == undefined || oobj.z == null) {
        cz = oobj.y;
    }
    fill(rgb(map(cz, -range, range, 0, 255), 255, 255));
}

fillCWGreen = (sobj, oobj, range = 1) => {
    let cz = oobj.z;
    if (oobj.z == undefined || oobj.z == null) {
        cz = oobj.y;
    }
    fill(rgb(255, map(cz, -range, range, 0, 255), 255));
}

fillCWBlue = (sobj, oobj, range = 1) => {
    let cz = oobj.z;
    if (oobj.z == undefined || oobj.z == null) {
        cz = oobj.y;
    }
    fill(rgb(255, 255, map(cz, -range, range, 0, 255)));
}

fillCWBlack = (sobj, oobj, range = 1) => {
    let cz = oobj.z;
    if (oobj.z == undefined || oobj.z == null) {
        cz = oobj.y;
    }
    fill(rgb(map(cz, -range, range, 0, 255), map(cz, -range, range, 0, 255), map(cz, -range, range, 0, 255)));
}

fillCHsvall = (sobj, oobj, range = 1) => {
    let cz = oobj.z;
    if (oobj.z == undefined || oobj.z == null) {
        cz = oobj.y;
    }
    fill(hsv(map(cz, -range, range, 0, 360), 1, 0.5));
}

fillRed = () => {
    fill(rgb(250, 0, 0));
}

fillGreen = () => {
    fill(rgb(0, 255, 0));
}

fillBlue = () => {
    fill(rgb(0, 0, 255));
}

fillBlack = () => {
    fill(rgb(0, 0, 0));
}

fillWhite = () => {
    fill(rgb(250, 250, 250));
}

/*
stroke系列
*/
strokeCInterf = (sobj, oobj, tns = 110, range = 1) => {
    let cz = oobj.z;
    if (oobj.z == undefined || oobj.z == null) {
        cz = oobj.y;
    }
    stroke(rgb(sin(cz * tns - range) * 126 + 126, sin(cz * tns) * 126 + 126, sin(cz * tns + range) * 126 + 126));
}

strokeCBRed = (sobj, oobj, range = 1) => {
    let cz = oobj.z;
    if (oobj.z == undefined || oobj.z == null) {
        cz = oobj.y;
    }
    stroke(rgb(map(cz, -range, range, 0, 255), 0, 0));
}

strokeCBGreen = (sobj, oobj, range = 1) => {
    let cz = oobj.z;
    if (oobj.z == undefined || oobj.z == null) {
        cz = oobj.y;
    }
    stroke(rgb(0, map(cz, -range, range, 0, 255), 0));
}

strokeCBBlue = (sobj, oobj, range = 1) => {
    let cz = oobj.z;
    if (oobj.z == undefined || oobj.z == null) {
        cz = oobj.y;
    }
    stroke(rgb(0, 0, map(cz, -range, range, 0, 255)));
}

strokeCBWhite = (sobj, oobj, range = 1) => {
    let cz = oobj.z;
    if (oobj.z == undefined || oobj.z == null) {
        cz = oobj.y;
    }
    stroke(rgb(map(cz, -range, range, 255, 0), map(cz, -range, range, 255, 0), map(cz, -range, range, 255, 0)));
}

strokeCWRed = (sobj, oobj, range = 1) => {
    let cz = oobj.z;
    if (oobj.z == undefined || oobj.z == null) {
        cz = oobj.y;
    }
    stroke(rgb(map(cz, -range, range, 0, 255), 255, 255));
}

strokeCWGreen = (sobj, oobj, range = 1) => {
    let cz = oobj.z;
    if (oobj.z == undefined || oobj.z == null) {
        cz = oobj.y;
    }
    stroke(rgb(255, map(cz, -range, range, 0, 255), 255));
}

strokeCWBlue = (sobj, oobj, range = 1) => {
    let cz = oobj.z;
    if (oobj.z == undefined || oobj.z == null) {
        cz = oobj.y;
    }
    stroke(rgb(255, 255, map(cz, -range, range, 0, 255)));
}

strokeCWBlack = (sobj, oobj, range = 1) => {
    let cz = oobj.z;
    if (oobj.z == undefined || oobj.z == null) {
        cz = oobj.y;
    }
    stroke(rgb(map(cz, -range, range, 0, 255), map(cz, -range, range, 0, 255), map(cz, -range, range, 0, 255)));
}

strokeCHsvall = (sobj, oobj, range = 1) => {
    let cz = oobj.z;
    if (oobj.z == undefined || oobj.z == null) {
        cz = oobj.y;
    }
    stroke(hsv(map(cz, -range, range, 0, 360), 1, 0.5));
}

strokeRed = () => {
    stroke(rgb(255, 0, 0));
}

strokeGreen = () => {
    stroke(rgb(0, 255, 0));
}

strokeBlue = () => {
    stroke(rgb(0, 0, 255));
}

strokeBlack = () => {
    stroke(rgb(0, 0, 0));
}

strokeWhite = () => {
    stroke(rgb(250, 250, 250));
}
