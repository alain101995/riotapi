var summoner = document.getElementById('summoner');
var sumid;
/*
function getSumId(){
$.ajax({
  url: 'http://127.0.0.1:3000/playerid/Alainlegend', //+ summoner.value,
  cache: false,
  method: 'get',
  success: function(data) {
    sumid = data.id;
    alert(sumid)
  },
  error: function(jqXHR, textStatus, errorThrown) {
    alert('error ' + textStatus + " " + errorThrown);
  }
});
}
*/
$('#search').click(function() {
  if ($('#champmasterie').is(':checked')) {
    $('#search').attr("disabled", true)
    $("#result").empty();
    $.ajax({
      url: 'http://127.0.0.1:3000/champm/' + summoner.value,
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
      complete: function(){
        $('#search').attr("disabled", false);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        alert('error ' + textStatus + " " + errorThrown);
      }
    });
  }
})

$('#search').click(function() {
  if ($('#playerLeague').is(':checked')) {
    $('#search').attr("disabled", true)
    $("#result").empty();
    $.ajax({
      url: 'http://127.0.0.1:3000/league/' + summoner.value,
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
      complete: function(){
        $('#search').attr("disabled", false);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        alert('error ' + textStatus + " " + errorThrown);
      }
    });
  }
})

$('#search').click(function() {
  if ($('#runes').is(':checked')) {
    $('#search').attr("disabled", true)

    $("#result").empty();
    $.ajax({
      url: 'http://127.0.0.1:3000/runes/' + summoner.value,
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
      complete: function(){
        $('#search').attr("disabled", false);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        alert('error ' + textStatus + " " + errorThrown);
      }
    });
  }
})

$('#search').click(function() {
  if ($('#masteries').is(':checked')) {
    $('#search').attr("disabled", true)

    $("#result").empty();

    console.log('haciendo llamada');
    $.ajax({
      url: 'http://127.0.0.1:3000/masteries/' + summoner.value,
      cache: false,
      method: 'get',
      success: function(data) {
        console.log('resultado exitoso');
        var tr;
        for (var i = 0; i < data.pages.length; i++) {
          tr = $('<tr/>');
          tr.append("<td>" + data.pages[i].id + "</td>");
          tr.append("<td>" + data.pages[i].name + "</td>");
          $('#result').append(tr);
        }
      },
      complete: function(){
        $('#search').attr("disabled", false);
        console.log('siempre al terminar');
      },
      error: function(jqXHR, textStatus, errorThrown) {
        alert('error ' + textStatus + " " + errorThrown);
        console.log('ocurrio un error');
      }
    });
    console.log('despues de llamada');

  }
})
function disableSearch(){

}
