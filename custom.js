jQuery(document).ready(function() {
    
	
	var name, phone = 0, name_true = false, phone_true = false; 
	$( ".form_wr input[name='name']").on('keyup',function(){
		  name = $( ".form_wr input[name='name']").val().length; 
		  console.log('Name length is ' + name);
		  if( name == 1 ){
			  $('.input_parent input[name="name"]').siblings(".is_error").text('Имя должно быть минимум из 2 символов').css('display','block');
			}else if( name >= 2 ){
			  $('.input_parent input[name="name"]').siblings(".is_error").text('Заполните это поле').css('display','none');
				name_true = true;	
		  }
	});
	 
	$( ".form_wr input[name='phone']").on('keyup',function(){
		  phone = $( ".form_wr input[name='phone']").val().length; 
		  console.log('Phone length is ' + phone);
		  if( phone < 16 ){
			  $('.input_parent input[name="phone"]').siblings(".is_error").css('display','block');
			}else if( phone == 16){
				 $('.input_parent input[name="phone"]').siblings(".is_error").css('display','none');
				  phone_true = true;    
			}
	}); 
	 
	
	$(document).on('input', '.form_wr input[name="name"]', function () {
		if($(this).val().length > 0){
			$(this).siblings(".input_label").addClass('full_now');
		}else{
			$(this).siblings(".input_label").removeClass('full_now');
			$(this).siblings(".is_error").css('display','none');
			$('.input_parent input[name="name"]').siblings(".is_error").text('Заполните это поле').css('display','none');
		}
	});
	
    $('.form_wr input[name="name"]').keydown(function(e) {
      if (e.shiftKey || e.ctrlKey || e.altKey) {
        e.preventDefault();
      } else {
        var key = e.keyCode;
        if (!((key == 8) || (key == 32) || (key == 46) || (key >= 35 && key <= 40) || (key >= 65 && key <= 90))) {
          e.preventDefault();
        }
      }
    });
  
	
	
	
	
	$(document).on('input', '.form_wr input[name="phone"]', function () {
		
		if($(this).val().length > 1){
			$(this).siblings(".input_label").addClass('full_now');
		}else{
			$(this).siblings(".input_label").removeClass('full_now');
			$(this).siblings(".is_error").css('display','none');
		}
	});
	
	$('#tel').mask('+7-000-000-00-00');
	
	$('.form-ajax').submit(function(submit){	  	
			console.log(name_true + ' ' + phone_true); 
				if( name_true == false || phone_true == false){ 
				
					if( phone_true == false ){
						console.log($( ".form_wr input[name='phone']").val().length + ' phone submit length'); 
						$('.input_parent input[name="phone"]').siblings(".is_error").css('display','block');
					}
				
					if( $( ".form_wr input[name='name']").val().length == 0){
						$('.input_parent input[name="name"]').siblings(".is_error").text('Заполните это поле').css('display','block');
						
					}
					if( $( ".form_wr input[name='name']").val().length == 1){
						$('.input_parent input[name="name"]').siblings(".is_error").text('Имя должно быть минимум из 2 символов').css('display','block');
						
					} 
					return false;
				}else{
                    $.ajax({
    				type: "POST",
    				url: "mail.php",
    				data: $(this).serialize()
    			}).done(function() {
    				$('.form-ajax').trigger( 'reset' ); 
					$('.form_wr input[name="name"]').siblings(".input_label").removeClass('full_now');
					$('.form_wr input[name="name"]').siblings(".is_error").css('display','none');
					$('.form_wr input[name="phone"]').siblings(".input_label").removeClass('full_now');
					$('.form_wr input[name="phone"]').siblings(".is_error").css('display','none');
					name_true = false;
					phone_true = false;
    				alert('Спасибо за заявку!');
				
        		});
        		return false; 
            }		
	});
	
});  

 