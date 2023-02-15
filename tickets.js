var phonenum;
var sheetdata = [];
let initobj = {
'sheetid' : '1qkSGUf1s8POehEiUAXC2oHLvey-ELyDCfghgReKN8Lo',
'apikey' : 'AIzaSyD9CkP391qbY2jl9_sGg5f1CazlSB-wPc4',
'parentdivclass' : '.help-desk-div',
'elementdivclass' : '.ticket-list',
'emptylist' : '.empty-list',
'sheetname' : 'Orders'
}

let cookuser = JSON.parse(getCookie('logged'))
let loggcheck = false;
  if(cookuser != null) {
	loggcheck = cookuser.logged
  $('#user-name').text(cookuser.name)
  $('#user-phone').text(cookuser.phone)
  $('#user_role').text(cookuser.user_type)
  }
loggcheck == true ? $('#otp-outer-div').hide() : '';
loggcheck == true ? makecall(initobj,true) : '' ;


function makecall(initobj,otpbool)
{

	otpbool ? $('.help-desk-div').hide() : '';
$.ajax({
url: "https://sheets.googleapis.com/v4/spreadsheets/"+initobj.sheetid+"/values:batchGet?ranges="+initobj.sheetname+ "&key="+initobj.apikey,
  type: 'GET',
  dataType: 'json',
  success: function(res) {
	otpbool ? createtickets(res) : '';
  otpbool ? '' : verifyotp(res);
  }
    });


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
setCookie('logged', JSON.stringify( {  "name" : $('#Full-Name').val() , "phone" : phonenum ,  "logged" : true, "user_type" : $('#User-Type').val()  } ), 1)
$('#user-name').text($('#Full-Name').val())
$('#user-phone').text(phonenum)
initobj.sheetname = 'Orders'
 makecall(initobj,true)
 $('#otp-outer-div').hide()
}

function createtickets(res) {
		  let valuerage = res.valueRanges;
valuerage.forEach((val, mainindex) => { 
val.values.forEach((singval,index) => {
  if(index != 0)
  {
  sheetdata.push(singval);
}
});
});
creatediv(initobj,sheetdata);
}


 function creatediv(initobj,homedat)
{
for(let x=0; x<homedat.length;x++)
{
let singdat = homedat[x];
  if( cookuser.user_type == 'warehouse' && singdat[19] == cookuser.order_type) {
      if(singdat[26] == 'warehouse' ) {
      $(initobj.parentdivclass).append('<div role="listitem" class="ticket-list w-dyn-item"><div class="sub-ticket-div"><div class="sub-ticket-left div-block"><a href="#" class="sub-ticket-button w-button">REQUESTED</a><a href="#" class="sub-ticket-button grey accept_butt w-button" elemindex="'+ x + '">ACCEPTED</a></div><div class="sub-ticket-price-div"><div class="sub-ticket-price-text">'+  singdat[16] + '</div><div class="sub-ticket-price-text">$</div></div></div><div class="name-sub-ticket-div"><h4>' + singdat[0] +  '</h4></div><div class="address-sub-div"><img src="https://global-uploads.webflow.com/6347023d711bc63c691d41dc/63c3af627239e92b81530a12_location_pin.png" loading="lazy" alt=""><div class="sub-tick-add">' +  singdat[11] +'</div></div><div class="ticket-detail-div"><div class="ticket-address">Customer Email:</div><div class="ticket-address right">'+ singdat[9] + '</div></div><div class="ticket-detail-div"><div class="ticket-address">Customer Name:</div><div class="ticket-address right">'+ singdat[8] + '</div></div><div class="ticket-detail-div"><div class="ticket-address">Customer Address Details:</div><div class="ticket-address right">' + singdat[12] + '</div></div><div class="ticket-detail-div"><div class="ticket-address">Order Amount:</div><div class="ticket-sub-div"><div class="ticket-address right">'+singdat[16] + '</div><div class="ticket-address sign">$</div></div></div>   <div class="ticket-detail-div"><div class="ticket-address">Customer Phone Number</div><div class="ticket-sub-div"><div class="ticket-address right"  id="ticket_phone">'+  singdat[10] + '</div></div></div>  </div>');
      }
  }  
  if( cookuser.user_type == 'driver') {
      if(singdat[26] == 'warehouseaccepted'  && singdat[19] == cookuser.order_type ) {
      $(initobj.parentdivclass).append('<div role="listitem" class="ticket-list w-dyn-item"><div class="sub-ticket-div"><div class="sub-ticket-left div-block"><a href="#" class="sub-ticket-button w-button">REQUESTED</a><a href="#" class="sub-ticket-button grey accept_butt w-button" elemindex="'+ x + '">ACCEPTED</a></div><div class="sub-ticket-price-div"><div class="sub-ticket-price-text">'+  singdat[16] + '</div><div class="sub-ticket-price-text">$</div></div></div><div class="name-sub-ticket-div"><h4>' + singdat[0] +  '</h4></div><div class="address-sub-div"><img src="https://global-uploads.webflow.com/6347023d711bc63c691d41dc/63c3af627239e92b81530a12_location_pin.png" loading="lazy" alt=""><div class="sub-tick-add">' +  singdat[11] +'</div></div><div class="ticket-detail-div"><div class="ticket-address">Customer Email:</div><div class="ticket-address right">'+ singdat[9] + '</div></div><div class="ticket-detail-div"><div class="ticket-address">Customer Name:</div><div class="ticket-address right">'+ singdat[8] + '</div></div><div class="ticket-detail-div"><div class="ticket-address">Customer Address Details:</div><div class="ticket-address right">' + singdat[12] + '</div></div><div class="ticket-detail-div"><div class="ticket-address">Order Amount:</div><div class="ticket-sub-div"><div class="ticket-address right">'+singdat[16] + '</div><div class="ticket-address sign">$</div></div></div>  <div class="ticket-detail-div"><div class="ticket-address">Customer Phone Number</div><div class="ticket-sub-div"><div class="ticket-address right" id="ticket_phone">' +  singdat[10]  +'</div></div></div>    </div>');
      }
  }  

}

$('.accept_butt').click(function(){
 let elemcount = $(this).attr('elemindex')
 console.log( sheetdata[Number(elemcount) + 2] )
 //updateapi( Number(elemcount) + 2 )
//$(this).parent().parent().parent().remove()
//	let cust_ph = $(this).parent().parent().parent().find('#ticket_phone').text();
//	let ord_stat = cookuser.user_type == 'warehouse' ?  "Accepted By Warehouse" :  "Accepted By Driver";
//sendupdatesms(ord_stat,cust_ph)	
})

$(initobj.elementdivclass)[0].remove();
$(initobj.parentdivclass).show();
$('.ticket-list').length != 0 ? $(initobj.emptylist).hide() : '';
$('.ticket-list').length == 0 ? $('.help-desk-h2').hide() : '';
$('#page-section').show()
}   
        
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
  initobj.sheetname = 'Login'
makelogincall(initobj)
initobj.sheetname = 'Orders'
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


$('#logout-butt').click(function(){
eraseCookie('logged')
 $('#otp-outer-div').show()
 $('#page-section').hide()
    $('#otp_phone_div').show()
})

$('#verify-otp').click(function(){
initobj.sheetname = 'Login' 
makecall(initobj,false);

})

function sendotp(phone_num) {
			 $.ajax({
      url: "https://hooks.zapier.com/hooks/catch/10809363/bvwfmey/",
      data:JSON.stringify( {
"phone_num" : phone_num,
"name" : $('#Full-Name').val(),
"user_type" : $('#User-Type').val()
} ),
      type: 'POST',
      dataType: 'json', 
      success: function(res) {
     $('#otp_code_div').show()
     $('#otp_phone_div').hide()
     $('#verify-otp').show()
     $('#send-otp').hide()
     }
       });   
}



function updateapi(rowid)
{
    $.ajax({
      url: "https://hooks.zapier.com/hooks/catch/10809363/bvri3xm/",
      data:JSON.stringify( {
"status" : cookuser.user_type == 'warehouse' ?  "warehouseaccepted" : 'accepted_' + cookuser.phone,
 "row_id" : rowid
} ),
      type: 'POST',
      dataType: 'json',
      success: function(res) {
      }
       });   
}


function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}
