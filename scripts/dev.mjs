import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'

// Accept the standard preview host/port flags and translate them to Next.js.
const require = createRequire(import.meta.url)
const input = process.argv.slice(2)
let hostname = '0.0.0.0'
let port = process.env.PORT || '3000'
for (let index = 0; index < input.length; index++) {
  if (input[index] === '--host' || input[index] === '--hostname') hostname = input[++index] || hostname
  else if (input[index] === '--port' || input[index] === '-p') port = input[++index] || port
}
const child = spawn(process.execPath, [require.resolve('next/dist/bin/next'), 'dev', '--hostname', hostname, '--port', port], { stdio: 'inherit', env: process.env })
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal))
child.on('exit', code => process.exit(code || 0))
