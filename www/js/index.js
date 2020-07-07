
// When the user clicks on <div>, open the popup
function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}
console.log

$(".up-to-top").on("click", function(){
  $("html, body").animate({
      scrollTop: 0
    }, '1000'
  );
});

$("#show-menu").on("click", function(){
  $("#hidden-menu").animate({
      "right": 0
    }, '100'
  );
});

$("#hidden-menu .close").on("click", function(){
  $("#hidden-menu").animate({
      "right": "-300px"
    }, '50'
  );
});
