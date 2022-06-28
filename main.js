song = "";

leftWristY = 0;
leftWristX = 0;
rightWristX = 0;
rightWristY = 0;

scoreKeep = 0;
scoreKeep1 = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.position(465, 200);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}



function preload() {
    song = loadSound("music.mp3");
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded() {
    console.log('PoseNet loaded');
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreKeep = results[0].pose.keypoints[9].score;
        scoreKeep1 = results[0].pose.keypoints[10].score;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left wrist X = " + leftWristX + "Left wrist Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right wrist X = " + rightWristX + "Right wrist Y = " + rightWristY);
    }
}


function draw() {
    image(video, 0, 0, 600, 500);

    fill("#ff009d");
    stroke("#ff009d");
    if (scoreKeep1 > 0.2) {
        circle(rightWristX, rightWristY, 15);

        if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        } else if (rightWristY > 100 && rightWristY <= 200) {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        } else if (rightWtristY > 200 && rightWristY <= 300) {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        } else if (rightWristY > 300 && rightWristY <= 400) {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        } else if (rightWristY > 400 && rightWristY <= 500) {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }

        if (scoreKeep > 0.2) {
            circle(leftWristX, leftWristY, 15);
            n = Number(leftWristY);
            round = floor(n);
            volume = round / 500;
            document.getElementById("volume").innerHTML = "Volume = " + volume;
            song.setVolume(volume);
        }
    }
}