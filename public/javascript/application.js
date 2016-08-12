$(document).ready(function() {

  $('#ask_button').click(function() {
    $.post("http://localhost:3000/ask", { query: $('#query').val() })
      .done(function(response) {
        $('#output_box').append(response);
      });
  });

  $('#zip').click(function() {
    $('#query').attr('value', $('#query').val() + 'zip.ask(')
  });

  $('#zap').click(function() {
    $('#query').attr('value', $('#query').val() + 'zap.ask(')
  });

});
