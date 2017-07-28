var summoner = document.getElementById('summoner');
/*var sumid;
$.ajax({
  type: "POST",
  url: 'http://127.0.0.1:3000/playerid/' + summoner.value,
  dataType: "text",
  async: false
  success: function(data) {
    sumid = data;
  }
})
*/

$('#search').click(function() {
  if ($('#champmasterie').is(':checked')) {
    $("#result").empty();
    $.ajax({
      url: 'http://127.0.0.1:3000/champm/' + summoner.value, //+summoner
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
      error: function(jqXHR, textStatus, errorThrown) {
        alert('error ' + textStatus + " " + errorThrown);
      }
    });
  }
})

$('#search').click(function() {
  if ($('#playerLeague').is(':checked')) {
    $("#result").empty();
    $.ajax({
      url: 'http://127.0.0.1:3000/league/' + summoner.value, //+summoner
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
      error: function(jqXHR, textStatus, errorThrown) {
        alert('error ' + textStatus + " " + errorThrown);
      }
    });
  }
})

$('#search').click(function() {
  if ($('#runes').is(':checked')) {
    $("#result").empty();
    $.ajax({
      url: 'http://127.0.0.1:3000/masteries/' + summoner.value, //+summoner
      cache: false,
      method: 'get',
      success: function(data) {
        var tr;
        for (var i = 0; i < data.length; i++) {
          tr = $('<tr/>');
          tr.append("<td>" + data[i].pages[i].id + "</td>");
          tr.append("<td>" + data[i].pages[i].name + "</td>");
          $('#result').append(tr);
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        alert('error ' + textStatus + " " + errorThrown);
      }
    });
  }
})

$('#search').click(function() {
  if ($('#masteries').is(':checked')) {
    $("#result").empty();
    $.ajax({
      url: 'http://127.0.0.1:3000/masteries/' + summoner.value, //+summoner
      cache: false,
      method: 'get',
      success: function(data) {
        var tr;
        for (var i = 0; i < data.length; i++) {
          tr = $('<tr/>');
          tr.append("<td>" + data[i].pages.masteries.id + "</td>");
          tr.append("<td>" + data[i].pages.masteries.name + "</td>");
          $('#result').append(tr);
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        alert('error ' + textStatus + " " + errorThrown);
      }
    });
  }
})
