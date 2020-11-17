
window.JsFunctions = {

    rosConnect: function (caller) {
        var current_url = window.location.href;
        var ros_ip = current_url.split(":")
        var ros = new ROSLIB.Ros({
            url: 'ws:' + ros_ip[1] + ':9091',
            transportLibrary: 'websocket'
        });

        ros.on('connection', function () {
            console.log('Connected to websocket server.');
            caller.invokeMethodAsync('RosMessage', 'Connected to websocket server.', false);
        });

        ros.on('error', function (error) {
            console.log('Error connecting to websocket server: ', error);
            caller.invokeMethodAsync('RosMessage', 'Error connecting to websocket server: ' + error, true);
        });

        ros.on('close', function () {
            console.log('Connection to websocket server closed.');
            caller.invokeMethodAsync('RosMessage', 'Connection to websocket server closed.', false);
        });
    }

};
