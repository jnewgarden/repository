var apiKey = "?key=037763ba7e9f1eff9866353a9dfd89a2";
var userLocation = "&location=";
var urlMethod = "";
var queryUrl = "http://api.petfinder.com/";
var zipCode = "";
var currentActive = "li0";
//Prevent reload on enterKey down
$("#zip_code").on("keydown", function(event) {
	if($(this).val().length >= 5 && event.keyCode !== 8) event.preventDefault();
    if (event.keyCode === 13) event.preventDefault();
  
});

//Handle zip content
$("#zip_code").on("keyup", function(event) {
	var tempZip = $(this).val();
  if (event.keyCode === 13 && tempZip.length === 5) {
		urlMethod = "shelter.find";
		zipCode = tempZip;
		$(this).val("");
		genericApiCall();
  }
});

$("#btn-search").on("click", function(event) {
	var tempZip = $("#zip_code").val();
	if(tempZip.length===5){
		urlMethod = "shelter.find";
		zipCode = tempZip;
		$("#zip_code").val("");
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
				if(response.petfinder.shelters === undefined){
					$("#shelterResults").text("No shelters found for zip code: " + zipCode);
					return;
				}
				$("#shelterResults").html("");
				currentActive = "li0";
				$.each(response.petfinder.shelters.shelter, function(i){
					var _phone = response.petfinder.shelters.shelter[i].phone.$t;
					if(_phone===undefined) _phone = "N/A";
					var _email = response.petfinder.shelters.shelter[i].email.$t;
					if(_email===undefined) _phone = "N/A";
					var _name = response.petfinder.shelters.shelter[i].name.$t;
					if(_name===undefined) _phone = "N/A";
					var _city = response.petfinder.shelters.shelter[i].city.$t;
					if(_city===undefined) _phone = "N/A";
					var _state = response.petfinder.shelters.shelter[i].state.$t;
					if(_state===undefined) _phone = "N/A";
					var _zip = response.petfinder.shelters.shelter[i].zip.$t;
					if(_zip===undefined) _phone = "N/A";
					var tempClass = "";
					if(i===0) tempClass = "class='active'";
					$("#shelterResults").append(
						"<div class='row rowCell' style='margin-bottom: 0;' id='cell" + i + "'>" +
							"<ul class='collapsible style' style='margin: 0;'>" +
								"<li id='li" + i + "'" + tempClass + ">" +
									"<div class='collapsible-header' style='background-color: lightgrey' onClick='onlyOneOpen(this)'>"+_name+"</div>"+
									"<div class='collapsible-body'><span>"+
										"<b>Name: </b>" + _name + "<br>" +
										"<b>Phone number: </b>" + _phone + "<br>" +
										"<b>Email: </b>" + _email + "<br>" + 
										"<b>Location: </b>" + _city + ", " + _state + " " + _zip + "<br>"+
										"<div class='button' id='btn-more' style='padding-bottom: 26px'>" +
										"<button id='more-btn' class='right btn waves-effect waves-light'> Click for more </button>" +
										"</div>" +
										"</span></div>" +
								"</li>" +
							"</ul>" +
						"</div>"
					);
					$('.collapsible').collapsible();
					console.log(_name);
					console.log(_phone);
					console.log(_email);
					console.log(_city);
					console.log(_state);
					console.log(_zip);
				});
				
				}).fail( function(xhr, textStatus, errorThrown) {
					console.log("Something bad happened");
			});
			
			break;
		case 'shelter.get':
			break;
		default:
			console.log("Invalid url request");

	}
}

function onlyOneOpen(e){
	var tempId = $(e).parent().attr("id");
	var tempClass = $(e).parent().attr("class");
	if(tempId != currentActive && currentActive !== "" && tempClass !== "active"){
		if($("#" + currentActive).attr("class")==="active")
			$("#" + currentActive).children().click();
		currentActive = tempId;
		return;
	}

	

};

// document ready function
$(document).ready(function(){
});

// dropdown jquery
$(".dropdown-trigger").dropdown();