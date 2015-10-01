define(
    [
        'dojo/_base/declare',
        'dojo/_base/lang',
        'dojo/node!net'
    ], function(declare, lang, net) {
    var ENCODING = 'UTF8';
    return declare(null, {
            nodeData: {},

            server: null,

            constructor: function(nodeData) {
                this.nodeData = nodeData;
            },

            run: function() {
                var nodeData = this.nodeData;
                console.log(nodeData);
                if (nodeData.port && nodeData.serverIp && net.isIP(nodeData.serverIp)) {
                    var socket = net.Socket();
                    socket.on('data', lang.hitch(this, 'handler'));
                    socket.connect(nodeData.port, nodeData.serverIp);
                    socket.write(nodeData.request.payload);
                    socket.end();
                }
            },

            handler: function(socket) {
                console.log('Reply:\n---------------------\n', socket.toString('utf8'), '\n---------------------');
            }
        }
    );
});