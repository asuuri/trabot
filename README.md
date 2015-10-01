# trabot
Robot for traffic generation in network enviroments.

## Running tests

Run the scripts in the trabot directory. The scripts can be run in the same or in different machine.
The most important is to run the same data-file.

### start server:
```sh
$ node server -f ./data/sample_1.json -m server
```

The server will start to listen all interfaces.

### run the client:
```sh
$ node server -f ./data/sample_1.json -m client -a [REQUEST_IP]
```

The REQUEST_IP can be either local or a remote ip.