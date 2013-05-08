$(document).ready(function() {
    var socket = io.connect(window.location.hostname);

    socket.on('news', function (data) {
        $('#status').html(data);
    });
});