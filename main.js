scoreleftwrist = 0;
scorerightwrist = 0;
status1 = "";
status2 = "";
song1 = "";
song2 = "";
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");

}

function modelLoaded() {
	console.log('PoseNet is Initialiazed');
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotposes);
}

function gotposes(results) {
    if(results.length>0) {
        console.log(results);
        leftwristx= results[0].pose.leftWrist.x;
        leftwristy= results[0].pose.leftWrist.y;
        console.log("leftwristx = " + leftwristx + ",leftwristy = " + leftwristy);
    
        rightwristx= results[0].pose.rightWrist.x;
        rightwristy= results[0].pose.rightWrist.y;
        console.log("rightwristx = " + rightwristx + ",rightwristy = " + rightwristy);

        scoreleftwrist = results[0].pose.keypoints[9].score;
        scorerightwrist = results[0].pose.keypoints[10].score;

    }
    }

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

     status1 = song1.isPlaying();
     if(scoreleftwrist>0.2) {
        circle(leftwristx, leftwristy, 20);
        song2.stop();

        
     if(status1 == false) {
        song1.play();
        document.getElementById("song_name").innerHTML = "song1";
        }
     }
     
     status2 = song2.isPlaying();
     if(scorerightwrist>0.2) {
        circle(rightwristx, rightwristy, 20);
        song1.stop();

        
     if(status2 == false) {
        song2.play();
        document.getElementById("song_name").innerHTML = "song2";
        }
     }
}



