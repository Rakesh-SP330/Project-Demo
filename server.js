const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
app.use(bodyParser.json());
// Initialize variables to store sensor data
let currentWeather = {}; 

// Route to handle incoming POST requests from ESP8266
app.post('/data', (req, res) => {
  // Extract sensor data from the request body
  const { humidity, temperature, soil_moisture } = req.body;

  // Store the current weather data
  currentWeather = { humidity, temperature, soil_moisture };

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
app.get('/', (req, res) => {
  // Render HTML to display the current weather
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Farmer's Dashboard</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #000000;
              background-image: url(https://www.wallpaperflare.com/farm-fields-green-canola-agriculture-rolling-hills-scenics-nature-wallpaper-pddiv);
              background-size: cover;
              background-position: center;
              background-blend-mode: multiply;
          }
  
          .container {
              max-width: 800px;
              margin: 20px auto;
              background-color: rgba(255, 255, 255, 0.5);
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
  
          h1 {
              text-align: center;
              color: #333333;
          }
  
          .current-weather {
              margin-top: 20px;
              padding: 10px;
              border: 2px solid #007bff;
              border-radius: 8px;
          }
  
          .current-weather p {
              font-size: 18px;
              margin-bottom: 10px;
              line-height: 1.5;
          }
  
          .current-weather p strong {
              color: #007bff;
          }
  
          .menu {
              text-align: center;
              margin-top: 20px;
          }
  
          .menu a {
              margin-right: 20px;
              text-decoration: none;
              color: #333333;
              font-weight: bold;
          }
      </style>
      <script>
          // Function to refresh the page every 1 second
          setTimeout(() => {
              location.reload();
          }, 1000);
      </script>
  </head>
  <body>
      <div class="container">
          <h1>Farmer's Dashboard</h1>
          <!-- Menu -->
          <div class="menu">
              <a href="#">Home</a>
              <a href="#">About</a>
              <a href="#">Services</a>
              <a href="#">Contact</a>
              <a href="history.html">Historical Data</a>
          </div>
          <!-- Current Weather Section -->
          <div class="current-weather">
              <h2>Current Weather</h2>
              <p><strong>Time:</strong> <span id="time">${getCurrentTime()}</span></p>
              <p><strong>Humidity:</strong> <span id="humidity">${currentWeather.humidity || 'N/A'}</span>%</p>
              <p><strong>Temperature:</strong> <span id="temperature">${currentWeather.temperature || 'N/A'}</span>°C</p>
              <p><strong>Soil Moisture:</strong> <span id="soilMoisture">${currentWeather.soil_moisture || 'N/A'}</span></p>
          </div>
      </div>
  </body>
  </html>
  
  `;

  // Send the HTML response
  res.send(html);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});