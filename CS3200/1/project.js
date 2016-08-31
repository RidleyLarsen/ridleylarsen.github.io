var messages = [
    {message: "It is certain.", color: "green"},
    {message: "It is decidedly so.", color: "green"},
    {message: "Without a doubt.", color: "green"},
    {message: "Yes, definitely.", color: "green"},
    {message: "You may rely on it.", color: "green"},
    {message: "As I see it, yes.", color: "green"},
    {message: "Most likely.", color: "green"},
    {message: "Outlook good.", color: "green"},
    {message: "Yes.", color: "green"},
    {message: "Signs point to yes.", color: "green"},
    {message: "Reply hazy try again.", color: "blue"},
    {message: "Ask again later.", color: "blue"},
    {message: "Better not tell you now.", color: "blue"},
    {message: "Cannot predict now.", color: "blue"},
    {message: "Concentrate and ask again.", color: "blue"},
    {message: "Don't count on it.", color: "red"},
    {message: "My reply is no.", color: "red"},
    {message: "My sources say no.", color: "red"},
    {message: "Outlook not so good.", color: "red"},
    {message: "Very doubtful.", color: "red"}
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
