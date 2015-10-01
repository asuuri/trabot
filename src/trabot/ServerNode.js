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
                    this.server = net.createServer(
                        lang.hitch(this, 'handler')
                    );

                    this.server.listen(this.nodeData.port, 'localhost');
                }
            },

            handler: function(socket) {
                socket.setEncoding(ENCODING);

                socket.on('data', lang.hitch(this, function(data) {
                    console.log('Request:\n---------------------\n', data, '\n---------------------');
                    socket.end(this.nodeData.response.payload);
                }));
            }
        }
    );
});