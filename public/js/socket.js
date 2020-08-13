var socket = io();
var messages = document.getElementById("messages");



$(function() {

  $("#admin_event").on('change', function(e) { 
    let city = $("#city").val();
    let td = $(this).parents('tr').find('td')
    let trainNumber = $(td[0]).text()
    let trainName = $(td[1]).text()
    let status = $(this).find('option:selected').text()
    let message = trainName + '(' +  trainNumber +  ')' + status + city
    e.preventDefault();
    socket.emit("updateStatus", message);
    return false;
  });

  socket.on("trainStatus", data => {
    alert(data.message)
  });
})();
