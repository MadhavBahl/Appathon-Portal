// var active = document.getElementsByClassName("done");
var active = []
// $(".done").text();
// console.log(active);
var totalTeam = $("#count").text();
console.log(totalTeam);
var count = parseInt(totalTeam);
console.log(count);
for (let i=1;i<=count;i++) {
    // active.push($())
    let currentDone = $(`#done${i}`).text()
    console.log(`The done${i} value is: `, currentDone);
    // console.log(currentDone);

    if (currentDone === 'true') {
        
        // console.log($(`#${i}`).text());
        $(`#${i}`).addClass( "disabled" );
        // $(`#${i}`).html("Hello World!");
    } 
}

// if (active === "true") {
//     console.log('It is true!');
//     $("#btn2").addClass( "disabled" );
// }
// console.log('Hello World!');