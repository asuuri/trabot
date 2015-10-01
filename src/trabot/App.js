require([
        'trabot/ServerNode',
        'trabot/ClientNode',
        'dojo/json',
        'dojo/node!fs',
        'dojo/node!stdio'
    ], function(ServerNode, ClientNode, JSON, fs, stdio) {

    var options = stdio.getopt({
        file: {
            key: 'f',
            args: 1,
            mandatory: true,
            description: 'Data files to run. See data dir.'
        },
        /*interactive: {
            key: 'i',
            mandatory: false,
            description: 'Start http-server for commanding in runtime'
        },*/
        mode: {
            key: 'm',
            args: 1,
            mandatory: true,
            description: 'Mode: server/client. Defaults to server.'
        },
        /*clientIp: {
            key: 'c',
            args: 1,
            mandatory: false,
            description: 'Client ip address'
        },*/
        serverIp: {
            key: 'a',
            args: 1,
            mandatory: false,
            description: 'Server ip address'
        }
    });

    if (typeof options.file === 'string' && !options.file.match(/.*\.json$/)) {
        options.file += '.json';
    }

    fs.exists(options.file, function(exists) {
        if(!exists) {
            return;
        }

        fs.readFile(options.file, { encoding: 'utf-8' }, function(error, fileData) {
            if (options.mode === 'client') {
                var data = JSON.parse(fileData);
                data.serverIp = options.serverIp;

                var clientNode = new ClientNode(data);
                clientNode.run();
            } else if (options.mode === 'server') {
                var serverNode = new ServerNode(JSON.parse(fileData));
                serverNode.run();
            } else {
                options.printHelp();
                return -1;
            }
        });
    });
});

