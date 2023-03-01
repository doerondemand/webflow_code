
  $( document ).ready(function() {  
 
    let cookuser = JSON.parse(getCookie('logged'))
  if(cookuser == null) {
 window.location.href = '/'
}
 $('#prof_phone').text(cookuser.phone )
    $('#prof_fullname').text(cookuser.name)
    $('#prof_otp').text(cookuser.code)
    $('#prof_accountinfo1').text(cookuser.userfield1)
    $('#prof_accountinfo2').text(cookuser.userfield2)
  })
