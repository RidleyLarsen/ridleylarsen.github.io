var messages;

function get_messages() {
  var request = new XMLHttpRequest();
  request.onload = function (thing, thing2) {
    console.log(thing, thing2);
    messages = JSON.parse(request.body);
    shake_ball();
  }
  request.open("GET", "http://www.ridley.xyz/CS3200/1/messages.json");
  request.send();
}

get_messages();

var ball = document.getElementById("ball");

function hide_message() {
    document.getElementById("message").classList.add("hidden");
}
function unhide_message() {
    document.getElementById("message").classList.remove("hidden");
}
function change_message() {
    var i = Math.floor(Math.random() * messages.length);
    document.getElementById("message").style.background = "url(triangle-" + messages[i].color + ".svg)";
    document.getElementById("message-text").innerHTML = messages[i].message;
}
function shake_ball() {
  ball.classList.add("shake");
  hide_message();
  setTimeout(function () {
    ball.classList.remove("shake");
    change_message();
    unhide_message();
  }, 1000);
}

if (window.localStorage.getItem("color")) {
    ball.className = window.localStorage.getItem("color");
}

document.getElementById("btn-shake").addEventListener("click", shake_ball);

var ball_btns = document.getElementsByClassName("btn-ball");
for (var i = 0; i < ball_btns.length; i++) {
    ball_btns[i].addEventListener("click", function () {
        ball.className = this.getAttribute("data-color");
        window.localStorage.setItem("color", this.getAttribute("data-color"));
    });
}

document.getElementById("btn-menu").addEventListener("click", function () {
    document.getElementById("btn-menu").classList.add("hidden");
    document.getElementById("btn-close-menu").classList.remove("hidden");
    document.getElementById("menu").classList.remove("hidden");
});

document.getElementById("btn-close-menu").addEventListener("click", function () {
    document.getElementById("btn-close-menu").classList.add("hidden");
    document.getElementById("btn-menu").classList.remove("hidden");
    document.getElementById("menu").classList.add("hidden");
});
