var dibuja=false;
var canvas = document.getElementById('canvasFirma');
var ctx = canvas.getContext('2d');
var canvasRender = document.getElementById('canvasFirmaRender');
var ctxRender = canvasRender.getContext('2d');
var xant=0;
resizeCanvas();
cont=0;
var yant=0;

 
///Set size Canvas
function resizeCanvas() {    
    var canvas = document.getElementById('canvasFirma'); 
    var canvasRender = document.getElementById('canvasFirmaRender'); 
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasRender.height = window.innerHeight;
    canvasRender.width = window.innerWidth;   
}

function ciclaMouse(e){                       
//console.log(event.movementX,event.movementY);
//Tamaño del canvas de dibujo similar a la pantalla
    if(dibuja==true){
        if (e) {            
            xx=event.touches[0].clientX;
            yy=event.touches[0].clientY;
        }else{
            xx=event.pageX;
            yy=event.pageY;
        }
        cont++;
        p = { x:xx, y: yy };
        lines.push(p);
        ctx.lineWidth = 1;
        if(xant!=0){
            console.log("HOLA");
            ctx.strokeStyle = "black";
            ctx.quadraticCurveTo(xx,yy ,xant,yant);  
            //ctx.fillRect(xx,yy,1,1); 
        }
        else{
            ctx.strokeStyle = "black";
            ctx.quadraticCurveTo(xx,yy,xx,yy);  
            //console.log(xx+"---"+xant);
            //ctx.fillRect(xx,yy,1,1);       
        }
        ctx.stroke();               
    }
}


function clean() {
    document.getElementById('Opciones').style.display='none';
    lines = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctxRender.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "Ghostwhite";
    ctx.fillRect(0,0, window.innerWidth,window.innerHeight); 
    ctxRender.fillStyle = "Ghostwhite";
    ctxRender.fillRect(0,0, window.innerWidth,window.innerHeight); 
    ctx.fillStyle = "Ghostwhite";
    ctx.fillRect(0,0, window.innerWidth,window.innerHeight);
    }
 
 


function endDraw(a){
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('canvasFirmaRender').style.display='block';
    ctxRender.setLineDash([0]);
    
    //ctxRender.lineWidth = 1;
    ctxRender.strokeStyle = "black";
    bzCurve(lines, 0.3, 1);
    lines = [];
    ctx.stroke();
    xant=0;
    yant=0;
    //if (fiima=confirm("Guardar Firma")) {
    console.log("End");
    dibuja=a;
    
/*}else{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibuja=false;
}*/

}

function menubar(){
    if(document.getElementById('Opciones').style.display=='none'){
        document.getElementById('Opciones').style.display='block';
        document.getElementById('Opciones').value='Ocultar';

    }else{
        document.getElementById('Opciones').style.display='none';
        document.getElementById('Opciones').value='Mostrar Menu';
    }
}

function initDraw(a) { 
 
document.getElementById('canvasFirmaRender').style.display='none';
//resizeCanvas();
dibuja=a;  
xx=event.clientX;
yy=event.clientY;
console.log("Init");
            
    // Quadratric curves example
    ctx.beginPath();
    ctx.moveTo(event.clientX,event.clientY);

}

function draw() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext){
        var ctx = canvas.getContext('2d');
        // Quadratric curves example
        ctx.beginPath();
        ctx.moveTo(75,40);
        ctx.bezierCurveTo(75,37,0,25,50,25);
        ctx.bezierCurveTo(20,25,0,62.5,20,62.5);
        ctx.fill();
    }
}

 

function gradient(a, b) {
    return (b.y-a.y)/(b.x-a.x);
}

function GuardarFirma(){
    var dataURL = canvasRender.toDataURL();
    localStorage.setItem("firma", dataURL);
    window.close();
    /*
    document.getElementById('Guarda').value='Guardando';
    firebase.database().ref().child("user").child("Clientes").child(key).child("data").update({"estado":"Entregado"});
    firebase.database().ref().child("user").child("Clientes").child(key).child("Firma").set({"firma":dataURL}).then(()=>{
        document.getElementById('Guarda').value='Guardado';
        setTimeout(() => {            
            window.close();
        }, 100);
    });*/
}

function bzCurve(points, f, t) {
    //f = 0, will be straight line
    //t suppose to be 1, but changing the value can control the smoothness too
    if (typeof(f) == 'undefined') f = 0.3;
    if (typeof(t) == 'undefined') t = 0.6;

    ctxRender.beginPath();
    ctxRender.moveTo(points[0].x, points[0].y);

    var m = 0;
    var dx1 = 0;
    var dy1 = 0;

    var preP = points[0];
    for (var i = 1; i < points.length; i++) {
        var curP = points[i];
        nexP = points[i + 1];
        if (nexP) {
            m = gradient(preP, nexP);
            dx2 = (nexP.x - curP.x) * -f;
            dy2 = dx2 * m * t;
        } else {
            dx2 = 0;
            dy2 = 0;
        }
        ctxRender.bezierCurveTo(preP.x - dx1, preP.y - dy1, curP.x + dx2, curP.y + dy2, curP.x, curP.y);
        dx1 = dx2;
        dy1 = dy2;
        preP = curP;
    }
    ctxRender.stroke();
}

// Generate random data
var lines = [];
var X = 10;
var t = 40; //to control width of X
/*for (var i = 0; i < 100; i++ ) {
    Y = Math.floor((Math.random() * 300) + 50);
    
    X = X + t;
}*/

//draw straight line
ctx.beginPath();
ctx.setLineDash([1]);
ctx.lineWidth = 50;


//draw smooth line
//ctx.setLineDash([0]);
//ctx.lineWidth = 2;
ctx.strokeStyle = "blue";

const CargaFirma=()=>{
        //Firma
    setTimeout(() => {
        var canvasRender = document.getElementById('canvasFirmaRender');
        var ctxRenderImage=canvasRender.getContext("2d");
        var imgFirma= new Image();
        imgFirma.src = localStorage.getItem("firma");
        ctxRenderImage.drawImage(imgFirma,0,0,imgFirma.width,imgFirma.height);
    }, 300);
}
 