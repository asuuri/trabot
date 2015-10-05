define(
    [
        'dojo/_base/declare',
        'dojo/_base/lang',
        'dojo/node!net'
    ], function(declare, lang, net) {
    return declare(null, {
            nodeData: {},

            server: null,

            constructor: function(nodeData) {
                var requestCount = parseInt(nodeData.requestCount);
                this.nodeData = nodeData;

                if (this.nodeData.requestCount === undefined) {
                    this.nodeData.requestCount = 1;
                } else {

                    this.nodeData.requestCount = requestCount || 1;
                }

                if (this.nodeData.interval === undefined) {
                    this.nodeData.interval = 1000;
                }
            },

            run: function() {
                var nodeData = this.nodeData;
                nodeData.requestCount = parseInt(nodeData.requestCount) || 0;

                if (nodeData.port && nodeData.serverIp && net.isIP(nodeData.serverIp)) {
                    while(this.nodeData.requestCount) {
                        var socket = net.Socket();
                        socket.on('data', lang.hitch(this, 'handler'));
                        socket.connect(nodeData.port, nodeData.serverIp);
                        socket.write(nodeData.request.payload);
                        socket.end();

                        this.nodeData.requestCount--;
                    }
                }
            },

            handler: function(socket) {
                console.log('Reply:\n---------------------\n', socket.toString('utf8'), '\n---------------------');
            }
        }
    );
});