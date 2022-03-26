var err = {
    rgba: `
    <span style='color:rgb(255,0,255)'>试图错误地创建颜色!!!</span>
    <br>
    <span style='color:rgb(0,255,255)'>文档信息:</span>
    <br>
    <span style='color:white'>
        rgb(<span style='color:yellow'>亮度</span>[0-255])
    </span>
    <br>
    <span style='color:white'>
        rgb(<span style='color:yellow'>亮度</span>[0-255], <span style='color:yellow'>透明度</span>[0-1])
    </span>
    <br>
    <span style='color:white'>
        rgb(<span style='color:yellow'>r</span>[0-255], <span style='color:yellow'>g</span>[0-255], <span style='color:yellow'>b</span>[0-255])
    </span>
    <span style='color:white'>
        rgb(<span style='color:yellow'>r</span>[0-255], <span style='color:yellow'>g</span>[0-255], <span style='color:yellow'>b</span>[0-255], <span style='color:yellow'>a</span>[0-1])
    </span>
    <br>
    `
    ,
    rgb: `
    <span style='color:rgb(255,0,255)'>试图错误地创建颜色!!!</span>
    <br>
    <span style='color:rgb(0,255,255)'>文档信息:</span>
    <br>
    <span style='color:white'>
        rgb(<span style='color:yellow'>亮度</span>[0-1])
    </span>
    <br>
    <span style='color:white'>
        rgb(<span style='color:yellow'>亮度</span>[0-255], <span style='color:yellow'>透明度</span>[0-1])
    </span>
    <br>
    <span style='color:white'>
        rgb(<span style='color:yellow'>r</span>[0-255], <span style='color:yellow'>g</span>[0-255], <span style='color:yellow'>b</span>[0-255])
    </span>
    <br>
    `
    ,
    draw2dFunction: `
    <span style='color:rgb(255,0,255)'>错误地食用draw2dFunction函数</span>
    <br>
    <span style='color:rgb(0,255,255)'>文档信息:</span>
    <br>
    <span style='color:white'>传入一个<span style='color:rgb(0,255,255)'>对象</span>,指定以下属性</span>
    <br>
    <span style='color:yellow'>sizex</span><span style='color:white'>:函数在屏幕上绘制的宽度</span>
    <br>
    <span style='color:yellow'>sizey</span><span style='color:white'>:函数在屏幕上绘制的高度</span>
    <br>
    <span style='color:yellow'>xl,xr,deltaX</span><span style='color:white'>:指定函数的x范围[xl,xr],dx=deltaX</span>
    <br>
    <span style='color:yellow'>yt,yb,deltaY</span><span style='color:white'>:指定函数的y范围[yt,yb],dy=deltaY</span>
    <br>
    <span style='color:yellow'>f</span><span style='color:white'>:传入function(x,y),返回值为计算出的z值</span>
    <br>
    <span style='color:yellow'>colorf</span><span style='color:white'>:传入function(x,y,z),在函数体里指定上色操作</span>
    <br>
    <span style='color:yellow'>shapef</span><span style='color:white'>:传入function(x,y,z),在函数体里指定绘制操作</span>
    <br>
    `
}