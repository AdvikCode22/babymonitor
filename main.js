status = ""
objects = []
sound = ""

function preload(){
    sound = loadSound("alarm.mp3")
}

function setup(){
    canvas = createCanvas(400,400)
    canvas.center()

    camera = createCapture(VIDEO)
    camera.hide()

    model = ml5.objectDetector('cocossd' , modelLoaded)
    document.getElementById("status").innerHTML = "Status: Detecting Objects"
}

function modelLoaded(){
    console.log("Model Has been loaded.")
    status = true
}

function draw(){
    image(camera,0,0,400,400)

    if(status != ""){
        model.detect(camera , gotResults)

        r = random(255)
        g = random(255)
        b = random(255)

        for(i = 0 ; i < objects.length ; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected"

            percentage = Math.floor(objects[i].confidence * 100)
            fill(r,g,b)
            textSize(25)
            text(objects[i].label + " " + percentage + "%", objects[i].x+20 , objects[i].y+25)
            noFill()
            stroke(r,g,b)
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height)

            if(objects[i].label == "person"){
                document.getElementById("found").innerHTML = "Baby Found"
                sound.stop()
            }
            else{
                document.getElementById("found").innerHTML = "Baby Not Found"
                sound.play()
            }
        }

        if(objects.length == 0){
            sound.play()
            document.getElementById("found").innerHTML = "Baby Not Found"
        }
    }
}

function gotResults(error,results){
    if(error){
        console.log(error)
    }
    else{
        console.log(results)
        objects = results
    }
}