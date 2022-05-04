/* Compile the contract and copy the resulting wasm into `../out` */

// `shelljs` is included in the devDependencies of the root project
const sh = require('shelljs')

// Define the build command
const buildCmd = 'npm run build'

// Execute the build command, storing exit code for later use
const { code } = sh.exec(buildCmd)

// Get package name from Cargo.toml
const packageName = require(`./package.json`).name
const compiledWasm = `./build/release/${packageName}.wasm`

// Create `../out` dir
const destination = `../out`
sh.mkdir('-p', destination)

// Copy link
const outFile = `${destination}/main.wasm`
sh.rm('-f', outFile)
sh.cp('-u', compiledWasm, outFile)

// exit script with the same code as the build command
process.exit(code)