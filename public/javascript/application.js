$(document).ready(function() {

  var queryCount = 0;
  var queried_party = '';

  $('.modal-trigger').leanModal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: 0.5, // Opacity of modal background
      in_duration: 300, // Transition in duration
      out_duration: 200, // Transition out duration
      starting_top: '4%', // Starting top style attribute
      ending_top: '10%', // Ending top style attribute
    }
  );

  $('#info').openModal();

  $('.tooltipped').tooltip({delay: 50});

  $('#query').on('click',function(){
    $('#query-builder').openModal();
    $('#obj-1').children('button').attr('disabled', false);
    $('#relation').children('button').attr('disabled', true);
    $('#obj-2').children('button').attr('disabled', true);
  });

  $('#obj-1').on('click', 'button',function(){
    $('#obj-1').children('button').attr('disabled', true);
    $('#relation').children('button').attr('disabled', false);
  });

  $('#relation').on('click', 'button', function(){
    $('#relation').children('button').attr('disabled', true);
    $('#obj-2').children('button').attr('disabled', false);
  });

  $('#obj-2').on('click', 'button', function(){
    $('#obj-2').children('button').attr('disabled', true);
  });

  $('#clear-btn').on('click', function(){
    $('#query').val('');
    $('#obj-1').children('button').attr('disabled', false);
    $('#relation').children('button').attr('disabled', true);
    $('#obj-2').children('button').attr('disabled', true);
    $('#function-call').val('');
    $('#askee-value').text('<Clicking aliens includes them in the query>');
    $('#query-builder').closeModal();
  });

  $('#ask_button').on('click', function() {
    if ($('#function-call').val() == '' || $('#query').val() == '') {
      $('#output_box').text('');
      $('#output_box').append('ERROR:\nYou must specify a query and an alien to receive that query.');
    } else {
      var query = $('#function-call').val().concat($('#query').val());
      query = closeOpenBrackets(query);
      $('#output_box').text('');
      $('#output_box').append("You ask " + queried_party + " " + parseQuestion()
        + ".\n" + queried_party + " is thinking...\n");
      $.post("http://localhost:3000/game/ask", { query: query })
        .done(function(response) {
          queryCount++;
          $('#output_box').append(queried_party + " says " + response + ".");
          queried_party = '';
        });
      $('#askee-value').text("<Clicking aliens includes them in the query>");
      $('#query').val("");
      $('#function-call').val("");
    }
  });

  $('#zip-img').on('click', function() {
    if (queried_party === '') {
      queried_party = 'Zip';
    }
    addToFunctionCall('zip');
    updateReadableQueryLine('Zip');
  });

  $('#zap-img').on('click', function() {
    if (queried_party === '') {
      queried_party = 'Zap';
    }
    addToFunctionCall('zap');
    updateReadableQueryLine('Zap');
  });

  $('#red-pie').on('click', function() {
    $.post("http://localhost:3000/game/solve", { solution: "red_pie" })
      .done(function(response) {
        if (response.includes("Congratulations")) {
          $('#ending-modal .modal-content h4').html("You've won!");
        } else {
          $('#ending-modal .modal-content h4').html("You've lost :(");
        }
        $('#ending-modal .modal-content p').html(response);
        $('#ending-modal').openModal();
      });
  });

  $('#purple-pie').on('click', function() {
    $.post("http://localhost:3000/game/solve", { solution: "purple_pie" })
      .done(function(response) {
        if (response.includes("Congratulations")) {
          $('#ending-modal .modal-content h4').html("You've won!");
        } else {
          $('#ending-modal .modal-content h4').html("You've lost :(");
        }
        $('#ending-modal .modal-content p').html(response);
        $('#ending-modal').openModal();
      });
  });

  $('.bldr-obj').on('click', function() {
    var objId = $(this).attr('id');
    $('#query').val($('#query').val() + objId);
    $('#askee-value').text($('#askee-value').text() + ' ' + $(this).text());
  });

  $('#is').on('click', function() {
    var objId = $(this).attr('id');
    $('#query').val($('#query').val() + ' == ');
    $('#askee-value').text($('#askee-value').text() + ' ' + $(this).text());
  });

  $('#is-not').on('click', function() {
    var objId = $(this).attr('id');
    $('#query').val($('#query').val() + ' != ');
    $('#askee-value').text($('#askee-value').text() + ' ' + $(this).text());
  });

  $('#help-btn').on('click', function() {
    $('#hint').openModal();
  });

  $('#give-up-btn').on('click', function() {
    $('#ending-modal .modal-content h4').html("You gave up!?!");
    $.get("http://localhost:3000/game/give-up")
      .done(function(response) {
        var modalText = "Really? Just no pie at all? What a waste!<br/><br/>This was the game state:<br/><br/>" +
            response + "<br/>Why not try again?";
        $('#ending-modal .modal-content p').html(modalText);
        $('#ending-modal').openModal();
      });
  });

});

var closeOpenBrackets = function(input) {
  var indexCap = input.length - 1;
  for (var i = 0; i <= indexCap; i++) {
    if (input.charAt(i) == '(') {
      input += ')';
    }
  }
  return input;
};

var parseQuestion = function() {
  var endOfFirstIf = $('#askee-value').text().indexOf("f");
  return $('#askee-value').text().substr(endOfFirstIf - 1);
};
 var addToFunctionCall = function(alien) {
   var contents = $('#function-call').val();
   $('#function-call').val(contents + alien + '.ask(');
 };

 var updateReadableQueryLine = function(alien) {
   var askeeLine = $('#askee-value').text();
   if (askeeLine.includes("<Clicking aliens includes them in the query>")) {
     askeeLine = askeeLine.replace("<Clicking aliens includes them in the query>", "Ask " + alien + " if");
     $('#askee-value').text(askeeLine);
   } else {
     askeeLine = askeeLine.replace("if", "to ask " + alien + " if");
     $('#askee-value').text(askeeLine);
   }
 };
