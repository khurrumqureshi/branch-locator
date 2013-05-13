$(document).ready(function() {
    var socket = io.connect(window.location.hostname);

    socket.on('news', function (data) {
        alert(JSON.stringify(data));
        $('#status').html(data);
    });
});