$("#nav-mobile > li").on("click",function(){
    localStorage.setItem("animal", $(this).text());
});

if (localStorage.animal !== "" || localStorage.animal !== undefined){
    console.log(localStorage.animal)
}
//$("#nav-mobile > li").val()