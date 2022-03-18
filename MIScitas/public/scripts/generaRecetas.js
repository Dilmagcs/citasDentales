
function crearCanvasLogo(){
    var img = document.getElementById("logo");
    if(document.getElementById("LogoReserva")){
        document.getElementById("LogoReserva").remove();
    }
    var canvas = document.createElement("canvas");
    canvas.id = "LogoReserva";
    canvas.style.border = "1px black solid";
    canvas.style.position = "absolute";
    canvas.style.top = "65px";
    canvas.style.display = "none";
    canvas.width = img.width;
    canvas.height = img.height;
   
    document.getElementById("canvasDraws").appendChild(canvas);
    /* var canvaImg = document.getElementById("LogoReserva");
    var canvasDraw = canvaImg.getContext("2d");
    canvasDraw.drawImage(img, 0, 0, img.width, img.height);
    var dataURL = canvas.toDataURL();
    localStorage.setItem("imagenLogoMain",dataURL);
    console.log(dataURL); */
    //document.getElementById("canvasDraws").appendChild(canvas);
    
         //var canvaImg = document.getElementById("canvasDraws");
 
}

//Guardar datos del localstorage en una imagen
function guardarImagen(){
    Render();
    var canvasExport = document.getElementById("canvasRender");
    var dataURL = canvasExport.toDataURL("image/png");
    var link = document.createElement("a");
    link.download = "ficha.png";
    link.href = dataURL;
    link.click();
}
 
//carga la imagen del localstorage en el canvas
function cargarImagenLocal(){
    var dataURL = localStorage.getItem("imagenLogoMain");
    //var dataURL = localStorage.getItem("imagen");
    console.log(dataURL);
    var img = document.getElementById("logo");
    console.log(img);
    img.src = dataURL;
    CargaImagen(canvas[1]);
}

//Guarda el file en localstorage
function guardarImagenLocal(){
    var canvas = document.getElementById("canvasLogo");
    var dataURL = canvas.toDataURL();
    localStorage.setItem("imagen",dataURL);
}

function CargaImagen(id){
    var canvaImg = document.getElementById(id);
    var ctx = canvaImg.getContext("2d");
    var img = document.getElementById("logo");
    ctx.drawImage(img, 480-img.width, 25, 125,125);
}

//Dibuja la imagen en el canvas
function dibujarImagen(id){
    var canvaImg = document.getElementById(id);
    var ctx = canvaImg.getContext("2d");
    var img = document.getElementById("logo");
    ctx.drawImage(img, 300, 25, 140,140);
}

 //Copiar carvas en otro canvas 
 function Render(){
    
    document.getElementById('imagenDataRender').style.display='block'; 
    var Receta=document.getElementById(canvas[0]);
    //var Logo=document.getElementById(canvas[1]);
    var RenderImage=document.getElementById(canvas[2]);
    var ctxRenderImage=RenderImage.getContext("2d");
    //Limpia Pantall
    ctxRenderImage.clearRect(-1000, -1000, 1000, 1000);
    
    ctxRenderImage.fillStyle = "white";
    ctxRenderImage.fillRect(0, 0, 1000, 1000);
    //Receta
    ctxRenderImage.drawImage(Receta,0,0);
    //Logo
    var imgLogo= new Image();
    imgLogo.src = localStorage.getItem("imagenLogoMain");
    ctxRenderImage.drawImage(imgLogo,300,20,imgLogo.width/2,imgLogo.height/2);
    //Firma
    var imgFirma= new Image();
    imgFirma.src = localStorage.getItem("firma");
    ctxRenderImage.drawImage(imgFirma,10,RenderImage.height-(imgFirma.height/3.5)-100,imgFirma.width/3,imgFirma.height/3);
    var dataURL = RenderImage.toDataURL();
    document.getElementById("imagenData").src = dataURL;

}
 
//crea canva del formulario de la lista de inputs
function crearCanvas(name){
    var canvas = document.createElement("canvas");
    canvas.id = name;
    canvas.style.border = "1px black solid";
    canvas.style.position = "absolute";
    canvas.style.top= "65px";
    canvas.width = 480;
    canvas.height = 720;
    document.getElementById("canvasDraws").appendChild(canvas);
}



//carga imagen en un img
function cargarImagen(){
    try {
        var file = document.getElementById("file").files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
        document.getElementById("logo").src = reader.result;
 
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
