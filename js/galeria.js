$(document).ready(function(){
	$.get("images/galeria/", function(listado){
		$(listado).find("a").each(function(){
			var foto=$(this).attr("href");
			if(foto.endsWith(".jpg")){
				var nombre=foto.replace(".jpg", "");
				$(".galeria-tira").append(
					'<div class="foto-contenedor">'+
						'<img class="foto-miniatura" src="images/galeria/'+foto+'" alt="'+nombre+'">'+
						'<div class="foto-info"><p>'+nombre+'</p></div>'+
					'</div>'
				);
			}
		});

		$(".foto-contenedor").hover(
			function() {
				$(this).children(".foto-info").stop().fadeIn(200);
			},
			function() {
				$(this).children(".foto-info").stop().fadeOut(200);
			}
		);
	});

	var paso = 215;
	$("#siguiente").click(function() {
		$(".galeria-ventana").animate({ scrollLeft: "+=" + paso }, 300);
	});
	$("#anterior").click(function() {
		$(".galeria-ventana").animate({ scrollLeft: "-=" + paso }, 300);
	});
});
