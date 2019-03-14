$("#nav-mobile > li").on("click",function(){
    var tempAnimal = $(this).text();
    if (tempAnimal === "Dogs" || tempAnimal === "Cats" || tempAnimal === "Other"){
        //console.log("should store");
        localStorage.setItem("animal", tempAnimal);
    }
    else{
        //console.log("should NOT store");
        localStorage.setItem("animal", "");
    }

});

if (localStorage.animal !== "" || localStorage.animal !== undefined){
    sessionStorage.setItem("animal", localStorage.animal);
    //console.log("clearing local storage");
    localStorage.setItem("animal", "");
    if(sessionStorage.animal) console.log (sessionStorage.animal);
}
//$("#nav-mobile > li").val()