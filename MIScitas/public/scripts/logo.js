  

function guardaImagen(){
    cargarImagen();
    setTimeout(function(){ 
        crearCanvasLogo();
    }, 1000);

}

function cargarIco(src){
    var link = document.createElement('link'),
    oldLink = document.getElementById('dynamic-favicon');
    link.id = 'dynamic-favicon';
    link.rel = 'shortcut icon';
    link.href = src;
    if (oldLink) {
    document.head.removeChild(oldLink);
    }
    document.head.appendChild(link);
}

function cargarImagen(){
    try {
        var file = document.getElementById("file").files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
        document.getElementById("logo").src = reader.result;
        cargarIco(reader.result);
 
    }
    if (file) {
        reader.readAsDataURL(file);
        
    } else {
        document.getElementById("logo").src = "";
    }
    } catch (error) {
        console.log(error);  
    }finally
    {
        //dibujarImagen();
    }   
    
}
function crearCanvasLogo(){
    //document.getElementById("canvasDraws").innerHTML = "";
    document.getElementById("logo").style.display = "none";
    var img = document.getElementById("logo");
    if(document.getElementById("LogoReserva")){
        document.getElementById("LogoReserva").remove();
    }
    var canvas = document.createElement("canvas");
    canvas.id = "LogoReserva";
    canvas.width = img.width/2;
    canvas.height = img.height/2;
   
    document.getElementById("canvasDraws").appendChild(canvas);
    var canvaImg = document.getElementById("LogoReserva");
    var canvasDraw = canvaImg.getContext("2d");
   
    canvasDraw.drawImage(img, 0, 0, img.width/2, img.height/2);
    var dataURL = canvas.toDataURL();
    localStorage.setItem("imagenLogoMain",dataURL);
    console.log(dataURL);
    
    document.getElementById("canvasDraws").appendChild(canvas);
    
         //var canvaImg = document.getElementById("canvasDraws");

    document.getElementById("LogoReserva").className="container";
    }
    
    function cargaFirma(imgsrc,id){
    var img = document.createElement("img");
    img.id = "FirmaDRAW";
    img.src = imgsrc;

    document.getElementById(id).innerHTML=img.outerHTML;
    document.getElementById("FirmaDRAW").style.width = "50%";
    document.getElementById("FirmaDRAW").style.height = "50%";
    document.getElementById("Firma").style.boxShadow = "0px 0px 10px #000000";
    }


    document.getElementById("logo").src = localStorage.imagenLogoMain;
    cargarIco(localStorage.imagenLogoMain);
    cargaFirma(localStorage.firma,"Firma");
 
 