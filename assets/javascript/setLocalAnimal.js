
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
var queryUrl = "http://api.petfinder.com/";
var key= "?key=";
var animal = "";
var breed = "";
var size = "";
var sex = "";
var loc = "";
var age = "";
//var offset = "";
var urlEnding = "&count=15&format=json";


var database = firebase.database();


//console.log(dynamicContent);
if(dynamicContent==="Eminem"){
    $("#motto").text("Mom's spaghetti");
    //return;
}
else {
    animal = "&animal=" +  dynamicContent;
    $('select').formSelect();
    
    $("#motto").text(dynamicContent);

    // Add database key access here
    database.ref().on("value",function(childSnapshot){
        key += childSnapshot.val().petfinderApi;        
    });



    if(dynamicContent==="Other"){
        console.log("sah dood");
        animal="";
        $("#otherId").show();
        $("#breedId").hide();
    }

    //animal+=dynamicContent;

    /*Handle zip content (submit button)
    $("#btn-search").on("click", function(event) {
        var tempZip = $("#zip_code").val();
        
    });
    */
    $("#dropdown1").dropdown();
}

$("#submit-btn").on("click",function(e){
    var urlMethod = "pet.getRandom";

    var tempZipcode = $("#zip_code").val();
    if(tempZipcode!=="") loc = "&location=" + tempZipcode;

    var tempAnimal = $("#animal").val();
    if(tempAnimal!==null) animal = "&animal=" + tempAnimal;
    else{
        console.log("required");
        return;
    }
    var tempAge = $("#age").val();
    if(tempAge!==null) {
        if(tempZipcode.length!==5){
            console.log("requires zipcode");
            return;
        }
        age = "&age=" + tempAge;
        urlMethod = "pet.find";
    }

    var tempSize = $("#size").val();
    if(tempSize!==null) {
        tempSlice = tempSize.slice(0,1);
        if(tempSlice !== "X"){
            size = "&size=" + tempSlice;
        }
        else {
            size = "&size=" + "XL";
        }
    }

    var tempGender = $("#gender").val();
    if(tempGender!==null) sex = "&sex=" + tempGender;

    var tempBreed = $("#breed").val();
    if(tempBreed!==null) breed = "&breed=" + tempBreed;




    var tempUrlBuild = queryUrl + urlMethod + key+animal+breed+breed+size+loc+age+urlEnding;
    $(".with-header").hide();
    console.log(tempUrlBuild);
})