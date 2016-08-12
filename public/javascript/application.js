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

  $('#ask_button').on('click', function() {
    $.post("http://localhost:3000/ask", { query: $('#query').val() })
      .done(function(response) {
        $('#output_box').append("you: " + $('#query').val() + "\n" + response + "\n");
        $('#query').val("");
      });
  });

  $('#zip').on('click', function() {
    var contents = $('#query').val();
    $('#query').val(contents + 'zip.ask(');
  });

  $('#zap').on('click', function() {
    var contents = $('#query').val();
    $('#query').val(contents + 'zap.ask(');
  });

  $('#red_pie').on('click', function() {
    $.post("http://localhost:3000/solve", { solution: "red_pie" })
      .done(function(response) {
        $('#output_box').val(response);
      });
  });

  $('#purple_pie').on('click', function() {
    $.post("http://localhost:3000/solve", { solution: "purple_pie" })
      .done(function(response) {
        $('#output_box').val(response);
      });
  });
});
