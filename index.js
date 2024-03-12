const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;
app.use(express.static('public'));
app.use(bodyParser.json());
// Initialize variables to store sensor data
let currentWeather = {}; 

// Route to handle incoming POST requests from ESP8266
app.post('/data', (req, res) => {
  // Extract sensor data from the request body
  const { humidity, temperature, soil_moisture } = req.body;

  // Store the current weather data
  currentWeather = { "humidity":humidity,
                 "temperature":temperature,
                  "soil_moisture":soil_moisture
                 };

  // Log the received sensor data
  console.log(`Received sensor data - Humidity: ${humidity}%, Temperature: ${temperature}°C, Soil Moisture: ${soil_moisture}`);

  // Send a success response
  res.sendStatus(200);
});

// Function to get the current time
function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

// Route to display the current weather
app.get('/',(req, res) => {
  // Render HTML to display the current 
  data={
    "humidity":79,
                 "temperature":32,
                  "soil_moisture":80
  }
  res.render("index.ejs",data);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});