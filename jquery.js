/*
var sumid;
$.ajax({
  url: 'http://127.0.0.1:3000/playerid/', + summoner,
  cache: false,
  method: 'get',
  success: function(data) {
    sumid = data.id;
    alert(sumid)
  },
  error: errorHandler
});
*/

$(document).ready(function() {
  var server = 'http://127.0.0.1:3000'
  $('#search').click(function() {
    var summoner = $('#summoner').val()
    var radioValue = $("input[type='radio']:checked").val();
    switch (radioValue) {
      case 'champmasterie':
        $('#search').attr("disabled", true)
        $("#result").empty();
        $.ajax({
          url: server + '/champm/' + summoner,
          cache: false,
          method: 'get',
          success: function(data) {
            var tr;
            for (var i = 0; i < data.length; i++) {
              tr = $('<tr/>');
              tr.append("<td>" + data[i].championId + "</td>");
              tr.append("<td>" + data[i].championPoints + "</td>");
              $('#result').append(tr);
            }
          },
          complete: disableSearch,
          error: errorHandler
        });
        break;

      case 'playerLeague':
        $('#search').attr("disabled", true)
        $("#result").empty();
        $.ajax({
          url: server + '/league/' + summoner,
          cache: false,
          method: 'get',
          success: function(data) {
            var tr;
            for (var i = 0; i < data.length; i++) {
              tr = $('<tr/>');
              tr.append("<td>" + data[i].name + "</td>");
              tr.append("<td>" + data[i].tier + "</td>");
              $('#result').append(tr);
            }
          },
          complete: disableSearch,
          error: errorHandler
        });
        break;

      case 'runes':
        $('#search').attr("disabled", true)
        $("#result").empty();
        $.ajax({
          url: server + '/runes/' + summoner,
          cache: false,
          method: 'get',
          success: function(data) {
            var tr;
            for (var i = 0; i < data.pages.length; i++) {
              tr = $('<tr/>');
              tr.append("<td>" + data.pages[i].id + "</td>");
              tr.append("<td>" + data.pages[i].name + "</td>");
              $('#result').append(tr);
            }
          },
          complete: disableSearch,
          error: errorHandler
        });
        break;

      case 'masteries':
        $('#search').attr("disabled", true)
        $("#result").empty();
        $.ajax({
          url: server + '/masteries/' + summoner,
          cache: false,
          method: 'get',
          success: function(data) {
            var tr;
            for (var i = 0; i < data.pages.length; i++) {
              tr = $('<tr/>');
              tr.append("<td>" + data.pages[i].id + "</td>");
              tr.append("<td>" + data.pages[i].name + "</td>");
              $('#result').append(tr);
            }
          },
          complete: disableSearch,
          error: errorHandler
        });
        break;
    }
  });

  function disableSearch() {
    $('#search').attr("disabled", false);
  }
  //jqXHQ = JQueryXMLHttpRequest
  function errorHandler(jqXHR, textStatus, errorThrown) {
    alert('error ' + textStatus + " " + errorThrown);
    console.log('ocurrio un error');
  }

});
