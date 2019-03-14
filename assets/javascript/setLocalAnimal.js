
// Parse the URL parameter
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


// Give the parameter a variable name
var dynamicContent = getParameterByName('animal');
var key= "?key=";
var animal = "&animal=";
var breed = "&breed=";
var size = "&size=";
var sex = "&sex=";
var loc = "&location=";
var age = "&age=";
//var offset = "";
var urlEnding = "&count=15&output=full&format=json";

// firebase key access
//var database = firebase.database();


//console.log(dynamicContent);
if(dynamicContent==="Eminem"){
    $("#motto").text("Mom's spaghetti");
    //return;
}
else {
    $("#motto").text(dynamicContent);

    // Add database key access here
    /*database.ref().on("value",function(childSnapshot){
        key += childSnapshot.val().petfinderApi;        
    });*/

    animal+=dynamicContent;

    //Prevent reload on enterKey down
    $("#zip_code").on("keydown", function(event) {
        // User can only press enter when 5 character exist in the input
        // Allow for backspace to be pressed

        if($(this).val().length >= 5 && event.keyCode !== 8) {
            event.preventDefault();
        }

    if (event.keyCode === 13) {
            event.preventDefault();
        }
    
    });

    //Handle zip content (enter key)
    $("#zip_code").on("keyup", function(event) {
        var tempZip = $(this).val();
        // Checks again that the zipcode is 5 character
    if (event.keyCode === 13 && tempZip.length === 5) {
            //$("#shelterDetails").empty();
            //$("#shelterResults").empty().text("Please wait while the shelters near [ zipcode = "+ tempZip +" ] load...");;
            //urlMethod = "shelter.find";
            loc += tempZip;
            $("#ad-card").empty();
            $(this).val("");
            //genericApiCall();
    }
    });

    //Handle zip content (submit button)
    $("#btn-search").on("click", function(event) {
        var tempZip = $("#zip_code").val();
        // Checks again that the zipcode is 5 character
        if(tempZip.length===5){
            //$("#shelterDetails").empty();
            //$("#shelterResults").empty().text("Please wait while the shelters near [ zipcode = "+ tempZip +" ] load...");
            //urlMethod = "shelter.find";
            loc += tempZip;
            $("#ad-card").empty();
            $("#zip_code").val("");
            //genericApiCall();
        }
    });
    //$("#dropdown1").dropdown();
}