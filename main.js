 prediccion1="";
 prediccion2="";
 Webcam.set({
    width:350, 
    height:300,
    image_format:"png",
    png_quality:90



})

camera=document.getElementById("camera")
Webcam.attach("#camera");

function takeSnapshot(){
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML='<img id="capture_image" src="'+data_uri+'"/>'
    })

}
console.log("version de ml5",ml5.version)
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/NThReoews/model.json",modelloaded)
function modelloaded(){
    console.log("modelo cargado")
}

function speak(){
    var synt=window.speechSynthesis;
    speakData1="la primera prediccion es... "+prediccion1;
    speakData2="la segunda prediccion es... "+prediccion2;
   
    var utterthis=new SpeechSynthesisUtterance(speakData1+speakData2)
    synt.speak(utterthis)
}
function predecir(){
    img=document.getElementById("capture_image");
    classifier.classify(img,gotResult)
}
function gotResult(error,result){
if(error){
    console.error(error)

}
else{
    console.log(result)
    document.getElementById("emotion-name").innerHTML=result[0].label;
    document.getElementById("emotion-name2").innerHTML=result[1].label;
   prediccion1=result[0].label;
   prediccion2=result[1].label;
    speak();
    if(result[0].label=="feliz"){
        document.getElementById("update-emoji").innerHTML="&#128522;"
    }
    if(result[0].label=="triste"){
        document.getElementById("update-emoji").innerHTML="&#128532;"
    }
    if(result[0].label=="enojado"){
        document.getElementById("update-emoji").innerHTML="&#128548;"
    }
    if(result[1].label=="feliz"){
        document.getElementById("update-emoji2").innerHTML="&#128522;"
    }
    if(result[1].label=="triste"){
        document.getElementById("update-emoji2").innerHTML="&#128532;"
    }
    if(result[1].label=="enojado"){
        document.getElementById("update-emoji2").innerHTML="&#128548;"
    }
}
}
