

function initialize(initobj,signlink) {

          function makecall(initobj)
          {

              $.ajax({
                url: "https://sheets.googleapis.com/v4/spreadsheets/"+initobj.sheetid+"/values:batchGet?ranges="+initobj.sheetname+ "&key="+initobj.apikey,
                type: 'GET',
                dataType: 'json',
                success: function(res) {
                  verifyotp(res);
                }
              });
          }



          $('#verify-otp').click(function(){
          makecall(initobj);
          })

          function verifyotp(res) {
          $('#otp_error').hide()
          let otparr = [];
          let phonearr = [];
          let valuerage = res.valueRanges;
                    valuerage.forEach((val, mainindex) => { 
              val.values.forEach((singval,index) => {
                if(index != 0)
                {
                otparr.push(singval[1]);
                phonearr.push(singval[0])
              }
              });
              });
             let otpver =  otparr.includes($('#otp-code').val())
              otpver ? validotp(otpver) : ''
          }

          function validotp(otpver) {
              otpver ? $('#otp_error').hide() : $('#otp_error').show()
          setCookie('logged', JSON.stringify( {  "name" : $('#Full-Name').val() , "phone" : phonenum ,  "logged" : true, "code" : $('#otp-code').val()  } ), 1)
          cookuser = JSON.parse(getCookie('logged'))
             window.location.href = '/';
          }

          $('#send-otp').click(function(){
            $('#otp_error').hide()
            $('#num_error').hide()
            phonenum = $('#phone').val()
            phonenum = $('#phone').val()
            phonenum = phonenum.includes('+') ? phonenum : '+1' + phonenum 
            phonenum = phonenum.replaceAll(' ', '')
            phonenum = phonenum.replaceAll('(', '')
            phonenum = phonenum.replaceAll(')', '')
            phonenum = phonenum.replaceAll('-', '') 

            if(phonenum.length !=0 ) {
          makelogincall(initobj)
            }
            else {
            $('#num_error').show()
            } 
          })


          function makelogincall(initobj)
          {
          $.ajax({
          url: "https://sheets.googleapis.com/v4/spreadsheets/"+initobj.sheetid+"/values:batchGet?ranges="+initobj.sheetname+ "&key="+initobj.apikey,
            type: 'GET',
            dataType: 'json', 
            success: function(res) {
           getlogin(res) 
            }
              });
          }


          function getlogin(res) {
          let valuerage = res.valueRanges;
             let resarr = []; 
           $('#otp_error').hide()
             $('#login_msg').hide() 
             valuerage.forEach((val, mainindex) => { 
              val.values.forEach((singval,index) => {
                if(index != 0)
                {
                let newobj = {"number" : singval[0]  }
                resarr.push(newobj)
              }
              });
              });	
          let matchbool = false;     
          for (var sing in resarr) {
          matchbool = resarr[sing].number == $('#phone').val()
              if(matchbool) { 
                $('#login_msg').show()
                break;
                }
              }
              matchbool ? '' :   sendotp( phonenum )
          }

          function sendotp(phone_num) {
                 $.ajax({
                url: signlink,
                data:JSON.stringify( {
          "phone_num" : phone_num,
          "name" : $('#Full-Name').val(),	      
          "account_info_1" : "",
          "account_info_2" : ""
          } ),
                type: 'POST',
                dataType: 'json', 
                success: function(res) {
                     $('#otp_code_div').show()
                     $('#otp_phone_div').hide()
           $('#verify-otp').css('display', 'block')
                     $('#send-otp').hide()
                     }
                 });   
          }
  }      
