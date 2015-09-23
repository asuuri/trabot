require([
        'trabot/Node',
        'dojo/json',
        'dojo/node!fs',
        'dojo/node!stdio'
    ], function(ServerNode, JSON, fs, stdio, net) {

    var options = stdio.getopt({
        'file': {
            key: 'f',
            args: 1,
            description: 'Data files to run. See data dir.'
        },
        'interactive': {
            key: 'i',
            mandatory: false,
            description: 'Start http-server for commanding in runtime'
        }
    });

    if (!options.interactive && !options.file) {
        options.printHelp();
        return -1;
    }

    if (options.interactive) {

    } else if (typeof options.file === 'string') {
        if (!options.file.match(/.*\.json$/)) {
            options.file += '.json';
        }

        fs.exists(options.file, function(exists) {
            if(exists) {
                fs.readFile(options.file, { encoding: 'utf-8' }, function(error, fileData) {
                    var serverNode = new ServerNode(JSON.parse(fileData));

                    serverNode.run();
                });

            }
        });
    }
});

