const compile = require("near-sdk-as/compiler").compile

compile("assembly/main.ts", // input file
        "out/main.wasm",    // output file
        [
        //   "-O1",          // Optional arguments
        "--debug",
        ], {
          verbose: true     // Output the cli args passed to asc
        });
