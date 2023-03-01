let cookuser = JSON.parse(getCookie('logged'))
  if(cookuser != null) {
cookuser.logged == true ? window.location.href = '/' : ''
}



function  initialize(initobj,loginzap) 
{
  
            function makecall(initobj)
            {

            $.ajax({
            url: "https://sheets.googleapis.com/v4/spreadsheets/"+initobj.sheetid+"/values:batchGet?ranges="+initobj.sheetname+ "&key="+initobj.apikey,
              type: 'GET',
              dataType: 'json', 
              success: function(res) {
              console.log(res)
              getlogin(res)
              }
                });
            }

            function getlogin(res) {
            let valuerage = res.valueRanges;
               let resarr = []; 
             let phnum = $('#phone').val()
            phnum = phnum.includes('+') ? phnum : '+1' + phnum 
            phnum = phnum.replaceAll(' ', '')
            phnum = phnum.replaceAll('(', '')
            phnum = phnum.replaceAll(')', '')
            phnum = phnum.replaceAll('-', '') 

             $('#otp_error').hide()
                valuerage.forEach((val, mainindex) => { 
                val.values.forEach((singval,index) => {
                  if(index != 0)
                  {
                  let newobj = {"number" : singval[0] , "code" : singval[1] , "name" : singval[2] , "userfield1" : singval[3], "userfield2" : singval[4]  }
                  resarr.push(newobj)
                }
                });
                });	
            let matchbool = false;     

            for (var sing in resarr) {
            matchbool = resarr[sing].number == phnum && resarr[sing].code == $('#otp-code').val();
                if(matchbool) { 
              setCookie('logged', JSON.stringify( { "name" : resarr[sing].name , "phone" : resarr[sing].number  ,  "logged" : true , "userfield1" :  resarr[sing].userfield1 , "userfield2" :  resarr[sing].userfield2, "code" : $('#otp-code').val() } ), 1)
                 window.location.href = '/';
                  break;
                  }
                }
            matchbool ? '' : $('#otp_error').show()
            }


            function sendotp() {

             let phnum = $('#phone').val()
            phnum = phnum.includes('+') ? phnum : '+1' + phnum 
            phnum = phnum.replaceAll(' ', '')
            phnum = phnum.replaceAll('(', '')
            phnum = phnum.replaceAll(')', '')
            phnum = phnum.replaceAll('-', '') 

                   $.ajax({
                  url: loginzap,
                  data:
                  JSON.stringify( {
             "phone_num" : phnum
            } )
            ,
                  type: 'POST',
                  dataType: 'json', // added data type
                  success: function(res) {
                 }
                   });   
            }

            $('#verify-otp').click(function(){
            makecall(initobj)
            })

            $('#send-otp').click(function(){
             $('#num_error').hide()
            if( $('#phone').val().length != 0 ) 
              {
                sendotp()
                $('#otp_phone_div').hide()
                $('#otp_code_div').show()
                $('#send-otp').hide()
                  $('#verify-otp').css('display', 'block')
              }
              else {
              $('#num_error').show()
              }
            })
}
