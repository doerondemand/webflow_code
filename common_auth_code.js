 $( document ).ready(function() {  
        let cookuser = JSON.parse(getCookie('logged'))
        if(cookuser != null) {
        $('#login-butt').hide()
        $('#signup-butt').hide()	 
        $('#username').text(cookuser.name)
        }
        else
        {
          $('#my-profile').hide()
           $('#username').hide() 
        $('#logout_butt').hide()
        }

        $('#logout_butt').click(function(){
        eraseCookie('logged')
        $('#username').hide();
        $('#logout_butt').hide();
        $('#login-butt').show(); 
        })	
  })
  
  
