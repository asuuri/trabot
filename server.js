dojoConfig = {
    async: true,
    basePath: '.',
    hasCache: {
        'host-node': true,
        'dom': false
    },
    packages:[{
        name: 'dojo',
        location: 'node_modules/dojo'
    },{
        name: 'trabot',
        location: 'src/trabot'
    }],
    deps: ['trabot/App']
};

require('./node_modules/dojo/dojo.js');