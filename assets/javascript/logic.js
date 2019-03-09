


var apiKey = '037763ba7e9f1eff9866353a9dfd89a2';
var zipCode = "";
//Prevent reload on enterKey down
$("#zip_code").on("keydown", function(event) {
  event.preventDefault();
});

//Handle zip content
$("#zip_code").on("keyup", function(event) {
	
  event.preventDefault();
  if (event.keyCode === 13) {

   
   	zipCode = $(this).val();
   	$(this).val("");
   	console.log(zipCode);
   //$(".green").click();
  }
});

// document ready function
$(document).ready(function() {


    

})
