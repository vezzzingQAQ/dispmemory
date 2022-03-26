var mediaStreamTrack;
var isVideoFinished = false;
// 一堆兼容代码
window.URL = (window.URL || window.webkitURL || window.mozURL || window.msURL);
if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
}
if (navigator.mediaDevices.getUserMedia === undefined) {
    navigator.mediaDevices.getUserMedia = function (constraints) {
        var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }
        return new Promise(function (resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
        });
    }
}

// 回调
function successFunc(stream) {
    mediaStreamTrack = stream;
    if ("srcObject" in canvas.video) {
        canvas.video.srcObject = stream
    } else {
        canvas.video.src = window.URL && window.URL.createObjectURL(stream) || stream
    }
    canvas.video.play();
    isVideoFinished = true;
}
function errorFunc(err) {
    console.log(err);
    fill(rgb(250, 250, 250));
    noStroke();
    text("你的设备不支持摄像头，或者没有开启权限( ´･･)ﾉ(._.`)", 50, height / 2);
}

// 正式启动摄像头
function openMedia(w = 1280, h = 720) {
    canvas.video.videoWidth = w;
    canvas.video.videoHeight = h;
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
        video: { facingMode: "user" }, // 或者 "user"
        video: { width: w, height: h }
        // video: { facingMode: { exact: "environment" } }// 或者 "user"
    }).then(successFunc).catch(errorFunc);
}

//关闭摄像头
function closeMedia() {
    mediaStreamTrack.getVideoTracks().forEach(function (track) {
        track.stop();
        context.clearRect(0, 0, context.width, context.height);//清除画布
    });
    isVideoFinished = false;
}

//截取视频
function drawMedia(x, y, w, h) {
    if (isVideoFinished) {
        context.drawImage(canvas.video, x, y, w, h);
    }
}

//获取像素信息
function getData(x, y, w, h) {
    return context.getImageData(x, y, w, h);
}

//获取指定点的颜色
function getPointData(x, y) {
    let arr = getData(x, y, 1, 1).data;
    return {
        r: arr[0],
        g: arr[1],
        b: arr[2],
        a: arr[3]
    }
}