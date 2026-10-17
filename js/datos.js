function diferenciaTemp(){

	var minTemp = parseFloat(document.getElementById("t_minima").value);
	var maxTemp = parseFloat(document.getElementById("t_maxima").value);
	var out = document.getElementById("diferencia");

	if(!isNaN(minTemp) && !isNaN(maxTemp)){

		if (maxTemp < minTemp){

			alert("Error: La temperatura máxima debe ser mayor o igual que la mínima.");
			out.innerHTML = "";
			return false;
		
		}

		else{
			var resultado = maxTemp - minTemp;
			out.innerHTML = resultado;
			return true;

		}
	}
}

function guardarNombre(){

	var nombre=document.getElementById("nombre").value;
	localStorage.setItem("fname", nombre);
	alert("¡Nombre guardado correctamente!");

}

var nombre_guardado = localStorage.getItem("fname");

if(nombre_guardado != null){
	var info_nombre = document.getElementById("info_nombre");

	if(info_nombre){
		info_nombre.innerHTML = "Hola " + nombre_guardado + ": Bienvenido a Smart Room";

	}
}
