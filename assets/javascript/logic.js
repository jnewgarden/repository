var apiKey = "?key=037763ba7e9f1eff9866353a9dfd89a2";
var userLocation = "&location=";
var urlMethod = "";
var queryUrl = "http://api.petfinder.com/";
var zipCode = "";

//Prevent reload on enterKey down
$("#zip_code").on("keydown", function(event) {
	if($(this).val().length >= 5 && event.keyCode !== 8) event.preventDefault();
    if (event.keyCode === 13) event.preventDefault();
  
});

//Handle zip content
$("#zip_code").on("keyup", function(event) {
	
  if (event.keyCode === 13 && $(this).val().length === 5) {

   
	zipCode = $(this).val();
	console.log(zipCode.length)
   	urlMethod = "shelter.find";
   	$(this).val("");
   	console.log(zipCode);
   	genericApiCall();
  }
});

function genericApiCall(){

	switch (urlMethod){

		case 'shelter.find':
			var tempUrl = queryUrl + urlMethod + apiKey + userLocation + zipCode +"&format=json&count=10";
			var proxyURL = "https://cors-anywhere.herokuapp.com/";
			var settings = {
				"async": true,
				"crossDomain": true,
				"url": proxyURL+tempUrl,
				"method": "GET",
				"headers": {
					"cache-control": "no-cache",
				},
				"data": {
				}
			}
			$.ajax(settings).done(function (response) {
				$.each(response.petfinder.shelters.shelter, function(i){
					var _phone = response.petfinder.shelters.shelter[i].phone.$t;
					var _email = response.petfinder.shelters.shelter[i].email.$t;
					var _name = response.petfinder.shelters.shelter[i].name.$t;
					var _city = response.petfinder.shelters.shelter[i].city.$t;
					var _state = response.petfinder.shelters.shelter[i].state.$t;
					var _zip = response.petfinder.shelters.shelter[i].zip.$t;

					$("#shelterResults").append(
						"<div class='row' id='cell" + i + "'><div class='col s11'>" +
						"Name: " + _name + "<br>" +
						"Phone number: " + _phone + "<br>" +
						"Email: " + _email + "<br>" + 
						"Location: " + _city + ", " + _state + " " + _zip + "<hr></div>" +
						"<div class = 'col s1'>" + '<i class="fa fa-angle-double-right" id="arrow-btn"></i>' + "</div></div>"
					);
					console.log(_name);
					console.log(_phone);
					console.log(_email);
					console.log(_city);
					console.log(_state);
					console.log(_zip);
				});
				
				});
			
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