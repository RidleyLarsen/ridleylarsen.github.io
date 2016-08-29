var messages = [
    "It is certain.",
    "It is decidedly so.",
    "Without a doubt.",
    "Yes, definitely.",
    "You may rely on it.",
    "As I see it, yes.",
    "Most likely.",
    "Outlook good.",
    "Yes.",
    "Signs point to yes.",
    "Reply hazy try again.",
    "Ask again later.",
    "Better not tell you now.",
    "Cannot predict now.",
    "Concentrate and ask again.",
    "Don't count on it.",
    "My reply is no.",
    "My sources say no.",
    "Outlook not so good.",
    "Very doubtful."
];
var ball = document.getElementById("ball");

function hide_message() {
    document.getElementById("message").classList.add("hidden");
}
function unhide_message() {
    document.getElementById("message").classList.remove("hidden");
}
function change_message() {
    var i = Math.floor(Math.random() * messages.length);
    document.getElementById("message-text").innerHTML = messages[i];
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
change_message();
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
