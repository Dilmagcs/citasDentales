//Genera interface de la lista de inputs

const inputsLists=["Sede","Nombre","Profesión","Código","Telefonos","Paciente"];
const inputsTextarea=["Recetas"];
const inputsFecha=["Fecha"];
const canvas=["canvas","canvasLogo","canvasRender"];

//Genera el formulario de la lista de inputs
function generarFormulario( ){ 
    inputsLists.forEach(titulo => {
        
        document.getElementById("app").innerHTML+=`
        <h5>`+titulo+`</h5>  
        <input class="form-control" name="inputsApp"  id="`+titulo+`">
        
        `;
        
    });
    inputsFecha.forEach(titulo => {
        
        document.getElementById("app").innerHTML+=`
        <h5>`+titulo+`</h5>  
        <input class="form-control" type="date" name="inputsApp" id="`+titulo+`">
        
        `;
        
    });
    inputsTextarea.forEach(titulo => {
        
        document.getElementById("app").innerHTML+=`
        <h5>`+titulo+`</h5>  
        <textarea class="form-control" name="Recetas"   id="`+titulo+`" style="    height: 236px;"></textarea>
        
        `;
        
    });
}


function creaCanvas(){
  //Crea el canvas
  canvas.forEach(canva=>{crearCanvas(canva);});
}

//Genera el boton de enviar
function generarBotones(){
    document.getElementById("app").innerHTML+=`
    <br>
    <!--input type="file" class="btn btn-primary" name="file" id="file" accept="image/*" capture="camera" onchange="cargarImagen();"-->
    <br>
    <br>
    <button type="button" onclick="recolectarDatos();" class="btn btn-success">GENERAR</button>
    <br>
    <image id="logo" style="display:none;width:256px;">
    <br>
    <br>
    <br>
    `;
}


//recolecta los datos del formulario
function recolectarDatos(){
    var inputs=document.getElementsByName("inputsApp");
    var datos=[];
    for(var i=0;i<inputs.length;i++){
        datos.push(inputs[i].value);

    }
    var Recetas=document.getElementById("Recetas").value;
    //guardar en localstorage recetas
    localStorage.setItem("Recetas",Recetas);
    //Funciones para guardar en localstorage
    guardarDatos(datos);
    escribirCanvas(canvas[0]);
    guardarImagenLocal();
    Render();
    

}

//guarda datos en el localstorage
function guardarDatos(datos){
    localStorage.setItem("datos",JSON.stringify(datos));
}

//recupera datos del localstorage
function recuperarDatos(){
    var datos=JSON.parse(localStorage.getItem("datos"));
    return datos;
}

//limpia los datos del localstorage
function limpiarDatos(){
    localStorage.removeItem("datos");
}

//limpia datos del formulario   
function limpiarFormulario(){
    var inputs=document.getElementsByName("inputsApp");
    for(var i=0;i<inputs.length;i++){
        inputs[i].value="";
    }
}

//carga en pantalla los datos del localstorage
function cargarDatos(){
    var datos=recuperarDatos();
    var inputs=document.getElementsByName("inputsApp");
    for(var i=0;i<inputs.length;i++){
        inputs[i].value=datos[i];
    }
    //cargar datos en el input de recetas	
    document.getElementById("Recetas").value=localStorage.getItem("Recetas");


}   

//carga el formulario
function cargarFormulario(){
    creaCanvas();
    generarFormulario();
    generarBotones();
    cargarDatos();
    escribirCanvas(canvas[0]);    
 
    setTimeout(function(){
        cargarImagenLocal();
        },1000);
     
    
}



//Escritura en el canvas del formulario de la lista de inputs
function escribirCanvas(id){
    var ctx = document.getElementById(id).getContext("2d");
    ctx.font = "18px Arial";
    //Llena de color blanco el fondo del canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 480, 720);
    dibujarImagen(canvas[1]);
    //carga el localstorage en el canvas
    ctx.fillStyle = "black";
    var datos=recuperarDatos();
    for(var i=0;i<datos.length;i++){
        ctx.fillText(datos[i],25,(i*30)+60);
        
    }
    var Recetas=localStorage.getItem("Recetas");
    //Split Recetas
    var Recetas=Recetas.split("\n");
    for(var i=0;i<Recetas.length;i++){
        ctx.fillText(Recetas[i],25,(i*30)+280);
    }

}






document.getElementById("logo").src= localStorage.getItem("imagenLogoMain");