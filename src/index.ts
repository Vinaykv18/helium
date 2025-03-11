import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import * as os from 'os';


const app = new Hono()

// Root endpoint that returns a random number
app.get('/', (c) => {
  const randomNumber = Math.floor(Math.random() * 100) + 1
  return c.json({ message: 'Hello Hono!', randomNumber }, 200)
})

// Endpoint to return the current date and time
app.get('/current-time', (c) => {
  const currentTime = new Date().toISOString() // ISO format date-time
  return c.json({ currentTime }, 200)
})

// Endpoint to return the current date (in a simple format)
app.get('/current-date', (c) => {
  const currentDate = new Date().toLocaleDateString() // Simple date format
  return c.json({ currentDate }, 200)
})

// Endpoint to return the current environment (OS type)
// app.get('/environment', (c) => {
//   const osType = os.platform() // 'win32', 'linux', 'darwin' (macOS), etc.
//   return c.json({ osType }, 200)
// })

app.get('/environment', (c) => {
  const osType = process.platform;
  return c.json({ osType }, 200);
})

// Start the server
serve(app)
