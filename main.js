prediction1=""
prediction2=""
Webcam.set({
    width:350,
    height:310,
    image_format:'png',
    png_quality:90,
})
camera=document.getElementById("camera")
Webcam.attach("#camera")
function takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image"src="'+data_uri+'">'
    })
}
console.log("ml5 verson;",ml5.verson)
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/1Q-i0Tn7o/model.json",modelLoaded)
function modelLoaded(){
    console.log("model is loaded")
}
function speak(){
    var synth=window.speechSynthesis
    speakdata1="the first prediction"+prediction1
    speakdata2="the second prediction is"+prediction2
    var uterthis=new SpeechSynthesisUtterance(speakdata1+speakdata2)
    synth.speak(uterthis)
}
function check(){
    img=document.getElementById("captured_image")
    classifier.classify(img,gotresult)
}
function gotresult(error,results){
    if(error){
        console.error(error)
    }
    else{
        console.log(results)
        document.getElementById("resultemotionname").innerHTML=results[0].label
        document.getElementById("resultemotionname2").innerHTML=results[1].label
        prediction1=results[0].label
        prediction2=results[1].label
        speak ()
        if(results[0].label=="amazing"){
            document.getElementById("updateemoji").innerHTML="&#128077;"
        }
        if(results[0].label=="victory"){
            document.getElementById("updateemoji").innerHTML="&#9996;"
        }
        if(results[0].label=="beautiful"){
            document.getElementById("updateemoji").innerHTML="&#128076;"
        }
        if(results[1].label=="amazing"){
            document.getElementById("updateemoji2").innerHTML="&#128077;"
        }
        if(results[1].label=="victory"){
            document.getElementById("updateemoji2").innerHTML="&#9996;"
        }
        if(results[1].label=="beautiful"){
            document.getElementById("updateemoji2").innerHTML="&#128076;"
        }
    }
    

}
