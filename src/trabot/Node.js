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
                if (this.nodeData.port) {
                    console.log(net);
                    this.server = net.createServer(
                        lang.hitch(this, 'handler')
                    );

                    this.server.listen(this.nodeData.port, 'localhost');
                }
            },

            handler: function(socket) {
                socket.setEncoding(ENCODING);

                socket.on('data', lang.hitch(this, function(data) {
                    console.log('onData', data);
                    socket.end(this.nodeData.response.payload);
                }));

                socket.on('close', function(data) {
                    console.log('onClose', data);
                });
            }
        }
    );
});