// var active = document.getElementsByClassName("done");
var active = $(".done").text();
console.log(active);
if (active === "true") {
    console.log('It is true!');
    $("#btn2").addClass( "disabled" );
}
// console.log('Hello World!');