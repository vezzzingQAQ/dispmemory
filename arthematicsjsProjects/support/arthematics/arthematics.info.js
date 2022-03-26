// *************************************************
// arthematics.info.js
// author:vezzzing
// start at 2021.12.14 [2022.1.22]
// 智能提示系统
// *************************************************

var info = [
    [
        "start",
        "页面加载完毕后执行",
        "start(DOM元素,回调函数)"
    ],
    [
        "loop",
        "执行完start的回调函数后以60fps的理论值循环执行",
        "loop(回调函数)"
    ],
    [
        "resizeCanvas",
        "重置画布大小",
        "resizeCanvas(宽度,高度)"
    ],
    [
        "resizeCanvasByDom",
        "按照传入的DOM元素重置画布大小",
        "resizeCanvas(DOM元素)"
    ],

    [
        "rgb",
        "用于创建RGBColor对象",
        "rgb([0,255],[0,255],[0,255])"
    ],
    [
        "rgba",
        "用于创建带有透明度参数RGBColor对象",
        "rgba([0,255],[0,255],[0,255],[0,1])"
    ],
    [
        "r",
        "仅指定r的值,创建红色的单色渐变",
        "r([0,255])"
    ],
    [
        "g",
        "仅指定g的值,创建绿色的单色渐变",
        "g([0,255])"
    ],
    [
        "b",
        "仅指定b的值,创建蓝色的单色渐变",
        "b([0,255])"
    ],
    [
        "hsv",
        "创建HSVColor颜色对象",
        "hsv([0,360],[0,1],[0,1])"
    ],
    [
        "hsva",
        "创建带有透明度的HSVColor颜色对象",
        "hsv([0,360],[0,1],[0,1],[0,1])"
    ],

    [
        "round",
        "对数字进行四舍五入",
        "round(要舍入的数字,位数)"
    ],
    [
        "random",
        "创建随机数",
        "random(随机数最小值,随机数最大值)"
    ],
    [
        "map",
        "对数进行等比映射",
        "map(要映射的数,原左界,原右界,后左界,后右界)"
    ],
    
    [
        "noFill",
        "取消颜色填充【变为全透明】",
        "noFill()"
    ],
    [
        "noStroke",
        "取消描边",
        "noStroke()"
    ],
    [
        "fill",
        "指定填充颜色",
        "fill(RGBColor|HSVColor|Color)"
    ],
    [
        "stroke",
        "指定描边颜色",
        "stroke(RGBColor|HSVColor|Color)"
    ],
    [
        "strokeWidth",
        "指定描边粗细",
        "strokeWidth(描边粗细)"
    ],
    [
        "point",
        "在指定的位置画一个点",
        "point(x,y)"
    ],
    [
        "rect",
        "在指定的位置画长方形",
        "rect(左上角x值,左上角y值,长度,高度)"
    ],
    [
        "rectCenter",
        "在指定位置画长方形",
        "rectCenter(中心点x值,中心点y值,长度,高度)"
    ],
    [
        "circle",
        "在指定的位置画圆",
        "circle(左上角x值,左上角y值,半径)"
    ],
    [
        "circleCenter",
        "在指定的位置画圆",
        "circle(中心点x值,中心点y值,半径)"
    ],
    [
        "background",
        "用于指定画布的背景颜色",
        "background(RGBColor|HSVColor|Color)"
    ],
    [
        "line",
        "在指定的两个坐标之间绘制直线",
        "line(点1x值,点1y值,点2x值,点2y值)"
    ],
    [
        "textSize",
        "指定文字的大小【在text函数中使用】",
        "textSize(大小)"
    ],
    [
        "text",
        "在指定位置绘制文字",
        "text(要绘制的文字,x,y)"
    ],

    [
        "pushMatrix",
        "将当前坐标系状态压入堆栈【用于保存坐标系状态】",
        "pushMatrix()"
    ],
    [
        "popMatrix",
        "堆栈中弹出坐标系状态【用于恢复上一次保存的坐标系状态】",
        "popMatrix()"
    ],
    [
        "translate",
        "平移坐标系",
        "translate(平移后原点在原坐标系位置的x值,平移后原点在原坐标系位置的y值)"
    ],
    [
        "rotate",
        "【以原点为中心】旋转坐标系",
        "rotate(角度【弧度制】)"
    ],
    [
        "scale",
        "【以原点为中心】缩放坐标系",
        "scale(x方向上的缩放比例,y方向上的缩放比例)"
    ],
    //extmath
    [
        "I_draw1loopf",
        "实时绘制一循环函数",
        "传入一个对象 {}"
    ],





]

export { info };