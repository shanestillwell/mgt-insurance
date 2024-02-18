import {  Server } from 'http'
import { AppDataSource } from "./data-source"
import App from './app'

let server: Server
const PORT = process.env.PORT || 3000

// Initiali the db and typeorm before starting the express server
AppDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
    // start express server
    server = App.listen(PORT)
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err)
  })

function graceful (err) {
  try {
    if (err) console.error('Graceful shutdown with err: ', err)
    server.close(async () => {
      // Use race to automatically timeout after 5secs
      await Promise.race([
        AppDataSource.destroy(),
        new Promise((resolve) => setTimeout(resolve, 5000)),
      ]).then(() => {
        process.exit(err ? 1 : 0)
      })
    })
  } catch (e) {
    process.exit(1)
  }
}

process.on('SIGINT', graceful)
process.on('SIGTERM', graceful)
process.on('uncaughtException', graceful)
process.on('unhandledRejection', graceful)
process.on('exit', code => {
  // Only synchronous calls
  console.error(`Process exited with code: ${code}`)
})
