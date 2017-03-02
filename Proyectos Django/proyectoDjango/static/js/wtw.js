function crear(){

}

$(document).ready(function(){
   	console.log('fswe');
	$('body').on('click','.link', function(){
		var name=$(this).attr("name");
         console.log(name)
		console.log('link')
		$('.modal-body').append(
			$('<div>',{'class':'embed-responsive embed-responsive-16by9'}).append(
				$('<iframe>',{'class':'embed-responsive-item','src': '//www.youtube.com/embed/'+ name})
			)
		)
	});
	$('body').on('click','#WD1', function(){
		
      	$('.recu').removeClass("collapse in");
      	$('.recu').addClass("collapse")
      	$('#D1').removeClass("collapse");
      	$('#D1').addClass("collapse in")
	});
	$('body').on('click','#WD2', function(){
      	$('.recu').removeClass("collapse in");
      	$('.recu').addClass("collapse")
      	$('#D2').removeClass("collapse");
      	$('#D2').addClass("collapse in")
	}); 
	$('body').on('click','#WD3', function(){
      	$('.recu').removeClass("collapse in");
      	$('.recu').addClass("collapse")
      	$('#D3').removeClass("collapse");
      	$('#D3').addClass("collapse in")
	}); 
	$('body').on('click','#WD4', function(){
      	$('.recu').removeClass("collapse in");
      	$('.recu').addClass("collapse")
      	$('#D4').removeClass("collapse");
      	$('#D4').addClass("collapse in")
	}); 
	$('body').on('click','#WD5', function(){
      	$('.recu').removeClass("collapse in");
      	$('.recu').addClass("collapse")
      	$('#D5').removeClass("collapse");
      	$('#D5').addClass("collapse in")
	}); 
	$('body').on('click','#WD6', function(){
      	$('.recu').removeClass("collapse in");
      	$('.recu').addClass("collapse")
      	$('#D6').removeClass("collapse");
      	$('#D6').addClass("collapse in")
	}); 
	$('body').on('click','#WD7', function(){
      	$('.recu').removeClass("collapse in");
      	$('.recu').addClass("collapse")
      	$('#D7').removeClass("collapse");
      	$('#D7').addClass("collapse in")
	}); 
	$('body').on('click','#WD8', function(){
      	$('.recu').removeClass("collapse in");
      	$('.recu').addClass("collapse")
      	$('#D8').removeClass("collapse");
      	$('#D8').addClass("collapse in")
	});  
 
});		