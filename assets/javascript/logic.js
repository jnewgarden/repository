


var apiKey = "?key=037763ba7e9f1eff9866353a9dfd89a2";
var userLocation = "&location=";
var urlMethod = "";
var queryUrl = "http://api.petfinder.com/";
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
   	urlMethod = "shelter.find";
   	$(this).val("");
   	console.log(zipCode);
   	genericApiCall();
   //$(".green").click();
  }
});

function genericApiCall(){



	switch (urlMethod){

		case 'shelter.find':
			var tempUrl = queryUrl + urlMethod + apiKey + userLocation + zipCode;
			console.log(tempUrl);
			break;
		case 'shelter.get':
			break;
		default:
			console.log("Invalid url request");

	}
		
	

	

	console.log();
}

// document ready function
$(document).ready(function() {


    

})

// dropdown jquery
$(".dropdown-trigger").dropdown();