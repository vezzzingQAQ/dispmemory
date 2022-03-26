// *************************************************
// arthematics.map.js
// author:vezzzing
// start at 2021.12.14 [2022.1.22]
// 储存映射方程
// *************************************************

var fake3d;
var fake3d2;
var fake3d3;

fake3d = (x, y, z, pointer) => {
    // if(pointer!=null && pointer!=undefined){}
    let angle = map(my, 0, height, 0, 10);
    let ax = map(x, pointer.fx, pointer.tx, -pointer.sizex / 2, pointer.sizex / 2);
    let ay = map(y, pointer.fy, pointer.ty, -pointer.sizey / 2, pointer.sizey / 2);
    return {
        x: -ax + (ay) * cos(angle) + width / 2,
        y: -(ay / 2) * sin(angle) + z + height / 2
    }
}

var angle1 = -0.3;
var angle2 = 0.4;
fake3d2 = (x, y, z, pointer) => {
    // if(pointer!=null && pointer!=undefined){}
    if (canvas.isMouseDown) {
        angle1 = map(my, 0, height, 0, 10);
        angle2 = map(mx, 0, width, 0, 10);
    }
    let ax = map(x, pointer.fx, pointer.tx, -pointer.sizex / 2, pointer.sizex / 2);
    let ay = map(y, pointer.fy, pointer.ty, -pointer.sizey / 2, pointer.sizey / 2);
    return {
        x: cos(angle1) * ax + sin(angle2) * ay + width / 2,
        y: sin(angle1) * ax + cos(angle2) * ay + z + height / 2
    }
}

fake3d3 = (x, y, z, pointer) => {
    // if(pointer!=null && pointer!=undefined){}
    let theta4 = map(mx, 0, width, -2 * PI, 2 * PI);
    //let theta = map(my,0,height,-PI/2,PI/2);
    let theta = 0.2;
    let r = 10;
    let ox1 = cos(theta4) * r;
    let oy1 = sin(theta4) * r;
    let ox2 = -sin(theta4) * r;
    let oy2 = cos(theta4) * r;
    let x1 = -ox1 + oy1 * cos(theta);
    let y1 = -(oy1 / 2) * sin(theta);
    let x2 = -ox2 + oy2 * cos(theta);
    let y2 = -(oy2 / 2) * sin(theta);
    let theta1 = atan(y1 / x1);
    let theta2 = atan(y2 / x2);
    let ax = map(x, pointer.fx, pointer.tx, -pointer.sizex / 2, pointer.sizex / 2);
    let ay = map(y, pointer.fy, pointer.ty, -pointer.sizey / 2, pointer.sizey / 2);
    return {
        x: -cos(theta1) * ax + cos(PI / 2 - theta2) * ay + width / 2,
        y: sin(theta2) * ax + sin(theta2) * ay + z + height / 2
    }
}

