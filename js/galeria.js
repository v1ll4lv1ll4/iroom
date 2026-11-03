$(document).ready(function(){
	$(".foto-contenedor").hover(
		function() {
			$(this).children(".foto-info").stop().fadeIn(200);
		},
		function() {
			$(this).children(".foto-info").stop().fadeOut(200);
		}
	);
	var paso = 215;
	$("#siguiente").click(function() {
		$(".galeria-ventana").animate({ scrollLeft: "+=" + paso }, 300);
	});
	$("#anterior").click(function() {
		$(".galeria-ventana").animate({ scrollLeft: "-=" + paso }, 300);
	});
});
