/*IO全局变量*/
var createSlider;
var createInput;
var createOutput;

var domList = [];

var currentFrameFlag = -1;

const TAG_WIDTH = 20;

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

class AthInputBox {
    constructor(tag, text, height = 30, tagWidth = TAG_WIDTH) {
        this.text = text;
        this.tag = tag;
        this.value = text;
        //绑定事件
        this.onchangef = function () { };
        //创建DOM元素
        this.dom = document.createElement("div");
        this.domTag = document.createElement("p");
        this.domInput = document.createElement("input");
        //设置框架样式
        this.dom.style.display = "flex";
        this.dom.style.flexDirection = "row";
        this.dom.style.height = height + "px";
        this.dom.style.padding = "5px";
        this.dom.style.margin = "5px 0";
        //设置标签样式
        this.domTag.innerHTML = this.tag;
        this.domTag.style.display = "block";
        this.domTag.style.color = "white";
        this.domTag.style.padding = "0";
        this.domTag.style.margin = "0 8px";
        this.domTag.style.height = (height - 10) + "px";
        this.domTag.style.lineHeight = (height - 10) + "px";
        this.domTag.style.fontSize = (height - 15) + "px";
        this.domTag.style.minWidth = tagWidth + "px";
        //设置input样式
        this.domInput.value = this.text;
        this.domInput.classList.add("athObject");
        this.domInput.type = "text";
        this.domInput.spellcheck = false;
        this.domInput.style.backgroundColor = "transparent";
        this.domInput.style.outline = "none";
        this.domInput.style.color = "white";
        this.domInput.style.border = "2px solid white";
        this.domInput.style.margin = "0 8px";
        this.domInput.style.padding = "0 3px";
        this.domInput.style.height = (height - 10) + "px";
        this.domInput.style.borderRadius = "3px";
        this.domInput.style.lineHeight = (height - 10) + "px";
        this.domInput.style.fontSize = (height - 15) + "px";

        let _ = this;
        this.domInput.oninput = function () {
            _.value = this.value;
            _.onchangef();
        }
        this.domInput.onkeyup = function () {
            _.value = this.value;
            _.onchangef();
        }
        this.domInput.onchange = function () {
            _.value = this.value;
            _.onchangef();
        }
        this.dom.appendChild(this.domTag);
        this.dom.appendChild(this.domInput);
        canvas.ioarea.appendChild(this.dom);
    }
    getValue() {
        return this.value * 1;
    }
    removeDom() {
        this.dom.parentNode.removeChild(this.dom);
    }
}

class AthSlideBar {
    constructor(tag, value, from, to, step, height = 30, tagWidth = TAG_WIDTH) {
        this.tag = tag;
        this.value = value;
        this.from = from;
        this.to = to;
        this.step = step;
        //绑定事件
        this.onchangef = function () { };
        //创建DOM元素
        this.dom = document.createElement("div");
        this.domTag = document.createElement("p");
        this.domInput = document.createElement("input");
        //设置框架样式
        this.dom.style.display = "flex";
        this.dom.style.flexDirection = "row";
        this.dom.style.height = height + "px";
        this.dom.style.padding = "5px";
        this.dom.style.margin = "5px 0";
        //设置标签样式
        this.domTag.innerHTML = this.tag;
        this.domTag.style.display = "block";
        this.domTag.style.color = "white";
        this.domTag.style.padding = "0";
        this.domTag.style.margin = "0 8px";
        this.domTag.style.height = (height - 10) + "px";
        this.domTag.style.lineHeight = (height - 10) + "px";
        this.domTag.style.fontSize = (height - 15) + "px";
        this.domTag.style.minWidth = tagWidth + "px";
        //设置input样式
        this.domInput.type = "range";
        this.domInput.classList.add("athObject");
        this.domInput.value = this.value;
        this.domInput.min = this.from;
        this.domInput.max = this.to;
        this.domInput.step = this.step;
        this.domInput.style.backgroundColor = "transparent";
        this.domInput.style.outline = "none";
        this.domInput.style.color = "white";
        this.domInput.style.border = "2px solid white";
        this.domInput.style.margin = "0 8px";
        this.domInput.style.padding = "0 3px";
        this.domInput.style.height = (height - 10) + "px";
        this.domInput.style.borderRadius = "3px";
        this.domInput.style.lineHeight = (height - 10) + "px";
        this.domInput.style.fontSize = (height - 15) + "px";

        let _ = this;
        this.domInput.oninput = function () {
            _.value = this.value * 1;
            _.onchangef();
        }
        this.dom.appendChild(this.domTag);
        this.dom.appendChild(this.domInput);
        canvas.ioarea.appendChild(this.dom);
    }
    getValue() {
        return this.value * 1;
    }
    removeDom() {
        this.dom.parentNode.removeChild(this.dom);
    }
}

class AthOutPut {
    constructor(tag, text, height = 30, tagWidth = TAG_WIDTH) {
        this.tag = tag;
        this.text = text;
        //创建DOM元素
        this.dom = document.createElement("div");
        this.domTag = document.createElement("p");
        this.domOutTag = document.createElement("p");
        //设置框架样式
        this.dom.style.display = "flex";
        this.dom.style.flexDirection = "row";
        this.dom.style.height = height + "px";
        this.dom.style.padding = "5px";
        this.dom.style.margin = "5px 0";
        //设置标签样式
        this.domTag.innerHTML = this.tag;
        this.domTag.style.display = "block";
        this.domTag.style.color = "white";
        this.domTag.style.padding = "0";
        this.domTag.style.margin = "0 8px";
        this.domTag.style.height = (height - 10) + "px";
        this.domTag.style.lineHeight = (height - 10) + "px";
        this.domTag.style.fontSize = (height - 15) + "px";
        this.domTag.style.minWidth = tagWidth + "px";
        //设置标签样式
        this.domOutTag.innerHTML = this.text;
        this.domOutTag.style.display = "block";
        this.domOutTag.style.color = "rgb(244,244,244)";
        this.domOutTag.style.padding = "0";
        this.domOutTag.style.margin = "0 8px";
        this.domOutTag.style.height = (height - 10) + "px";
        this.domOutTag.style.lineHeight = (height - 10) + "px";
        this.domOutTag.style.fontSize = (height - 15) + "px";

        this.dom.appendChild(this.domTag);
        this.dom.appendChild(this.domOutTag);
        canvas.ioarea.appendChild(this.dom);
    }
    setValue(text) {
        this.text = text;
        this.domOutTag.innerHTML = this.text;
    }
    removeDom() {
        this.dom.parentNode.removeChild(this.dom);
    }
}

createInput = (tag = "tag", text = "text", height = 30, tagWidth = TAG_WIDTH) => {
    return new AthInputBox(tag, text, height, tagWidth);
}
createSlider = (tag = "tag", value = 0, from = -1, to = 1, step = 0.1, height = 30, tagWidth = TAG_WIDTH) => {
    return new AthSlideBar(tag, value, from, to, step, height, tagWidth);
}
createOutput = (tag = "tag", text = "text", height = 30, tagWidth = TAG_WIDTH) => {
    return new AthOutPut(tag, text, height, tagWidth);
}