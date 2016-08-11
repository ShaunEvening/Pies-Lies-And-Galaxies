$(document).ready(function() {

  $('#ask_button').click(function() {
    $.post("http://localhost:3000/ask", { query: $('#query').val() })
      .done(function(response) {
        $('#output_box').append(response);
      });
  });

});
