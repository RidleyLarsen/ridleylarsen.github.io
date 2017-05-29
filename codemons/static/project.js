var game_words = [];
var $uiobj;

function init() {
  while (game_words.length != 25) {
      var word = wordlist[Math.floor(Math.random() * wordlist.length)];
      while (game_words.indexOf(word) > -1) {
          word = wordlist[Math.floor(Math.random() * wordlist.length)];
      }
      game_words.push(word);
  }
  $('td').each(function (i) {
    $(this).html("<img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + game_words[i] + ".png'>");
  });

  apply_draggable();

  $('td').droppable({
      accept: ".card",
  });
  $('.menu').droppable({
      accept: ".card",
      drop: function (event, ui) {
          if (ui.draggable.hasClass("on-board")) {
              ui.draggable.remove();
          }
      }
  });
}

function apply_draggable () {
    $('.card.draggable').draggable({
        revert: "invalid",
        stop: function (event, ui) {
            $uiobj = ui;
            var min_x = 1000;
            var min_y = 1000;
            var min_d = 10000;
            var $td;
            var card_offset = $(this).offset();
            card_center_y = $(this).offset().top + ($(this).height() / 2);
            card_center_x = $(this).offset().left + ($(this).width() / 2);
            $('td').each(function (elt) {
                var this_offset = $(this).offset();
                this_center_y = this_offset.top + ($(this).height() / 2);
                this_center_x = this_offset.left + ($(this).width() / 2);
                distance = Math.sqrt(Math.pow((card_center_y - this_center_y), 2) + Math.pow((card_center_x - this_center_x), 2));
                y_diff = Math.abs(card_center_y - this_center_y);
                x_diff = Math.abs(card_center_x - this_center_x);
                if (distance < min_d) {
                    min_d = distance;
                    $td = $(this);
                }
            });
            var $that = $(this);
            if (min_d < 100) {
                var container_class = "";
                if ($(this).hasClass('red')) { container_class = ".red_cards"; }
                if ($(this).hasClass('blue')) { container_class = ".blue_cards"; }
                if ($(this).hasClass('neutral')) { container_class = ".neutral_cards"; }
                if ($(this).hasClass('black')) { container_class = ".black_cards"; }
                $c = $(this).clone();
                $c[0].style.top = "";
                $c[0].style.left = "";
                $(container_class).append($c);
                $(this).addClass("on-board");
                $('.card.on-board').each(function (elt) {
                    if ($(this).offset().left == $td.offset().left && $(this).offset().top == $td.offset().top) {
                        console.log("card on top of other card");
                        $(this).remove();
                    }
                });
                $(this).animate({left: $td.offset().left, top: $td.offset().top}, 250);
                apply_draggable();
            } else {
                if ($(this).hasClass("on-board")) {
                    $(this).remove();
                }
            }
        },
    });
}

$(function () {
  $('#startgame').on('click', function () {
    init();
    $('.ui').removeClass('active');
    $('.game').addClass('active');
  });
});
