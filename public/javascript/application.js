$(document).ready(function() {

  $('.modal-trigger').leanModal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      in_duration: 300, // Transition in duration
      out_duration: 200, // Transition out duration
      starting_top: '4%', // Starting top style attribute
      ending_top: '10%', // Ending top style attribute
    }
  );

  $('#info').openModal();

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
