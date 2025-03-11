import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import * as os from 'os';

const app = new Hono()

// Variable to store the number (in-memory storage)
let storedNumber: number | null = null;

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
app.get('/environment', (c) => {
  const osType = process.platform;
  return c.json({ osType }, 200);
})

// New POST endpoint to accept and store the number
app.post('/send-number', async (c) => {
  const body = await c.req.json(); // Parse the JSON body
  const { number } = body; // Extract the 'number' from the body

  if (typeof number === 'number') {
    storedNumber = number; // Store the number
    return c.json({ receivedNumber: number }, 200); // Return the same number
  } else {
    return c.json({ error: 'Please provide a valid number.' }, 400); // Error if no valid number
  }
})

// New GET endpoint to retrieve the stored number
app.get('/get-number', (c) => {
  if (storedNumber !== null) {
    return c.json({ storedNumber }, 200); // Return the stored number
  } else {
    return c.json({ error: 'No number has been sent yet.' }, 404); // If no number is stored
  }
})

// Start the server
serve(app)
