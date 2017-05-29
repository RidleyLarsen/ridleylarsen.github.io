var ref = new Firebase(FIREBASE_URL);
var tags = ref.child('tags');
var current_tag = ref.child('current_tag');

tags.on('child_added', function (snapshot) {
    var data = snapshot.val();
    data.id = snapshot.key();
    $('ul').append($('<li><a href="#" class="tag">' + data.tag + '<span data-key="' + data.id + '" class="remove">&times;</span></a></li>'));
});

current_tag.on('value', function(childSnapshot, prevChildKey) {
  console.log(childSnapshot, prevChildKey);
  $('title').text('Playing GiphyTV: ' + childSnapshot.val());
  $('iframe').attr('src', 'https://tv.giphy.com/' + childSnapshot.val());
});

$(function () {
  $(document).on('click', '.tag', function (e) {
    e.preventDefault();
    var text = $(this).text();
    current_tag.set(text.slice(0, text.length - 1)); // remove &times from text
  });

  $(document).on('click', '.remove', function (e) {
    e.preventDefault();
    tags.child($(this).data('key')).remove();
    $(this).parents('li').remove();
  });

  $('form').on('submit', function (e) {
    e.preventDefault();
    current_tag.set($('input').val());
    tags.push({'tag': $('input').val()});
    $('input').val('');
  });
});
