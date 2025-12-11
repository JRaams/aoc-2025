z3-solver package is not compatible with Bun:

```
Aborted(Assertion failed)
worker: onmessage() captured an uncaught exception: RuntimeError: Aborted(Assertion failed)
RuntimeError: Aborted(Assertion failed)
    at abort (./node_modules/z3-solver/build/z3-built.js:848:27)
    at assert (./node_modules/z3-solver/build/z3-built.js:396:5)
    at removeRunDependency (./node_modules/z3-solver/build/z3-built.js:805:5)
    at receiveInstance (./node_modules/z3-solver/build/z3-built.js:1019:5)
    at wasmModuleReceived (./node_modules/z3-solver/build/z3-built.js:1062:9)
    at handleMessage (./node_modules/z3-solver/build/z3-built.js:539:9)
Pthread 0x01cccf80 sent an error! undefined:undefined: Aborted(Assertion failed)
1616 |           var message = 'worker sent an error!';
1617 |           if (worker.pthread_ptr) {
1618 |             message = `Pthread ${ptrToString(worker.pthread_ptr)} sent an error!`;
1619 |           }
1620 |           err(`${message} ${e.filename}:${e.lineno}: ${e.message}`);
1621 |           throw e;
                       ^
error: Aborted(Assertion failed)
      at <anonymous> (./node_modules/z3-solver/build/z3-built.js:1621:17)
      at <anonymous> (./node_modules/z3-solver/build/z3-built.js:1626:44)
      at emitError (node:events:43:23)
      at #onError (node:worker_threads:222:14)
```

Therefore, use Nodejs for day 10 part b: `node b.js`
