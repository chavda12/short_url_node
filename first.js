const express = require("express");
require("dotenv").config();
const axios = require("axios");
const app = express();

//port...
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/createUser", async (req, res) => {
    try {
        // Convert FormData to JSON object
        const formData = {};
        console.log(req.body);
        Object.entries(req.body).forEach((field) => {
            formData[field[0]] = field[1];
        });
        formData.notifications = formData.notifications === "true";

        console.log("FormData:", formData);

        // Make POST request to external API
        const response = await axios.post(
            "https://www.abibliadigital.com.br/api/users",
            JSON.parse(JSON.stringify(formData)),
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("Response from API:", response.data);
        res.json(response.data); // Send response back to client if needed
    } catch (error) {
        console.error("Error sending data:", error.message);
        res.status(500).json({ error: "Failed to create user" }); // Handle error response
    }
});

app.post("/weather", async (req, res) => {
    const city = req.query.city;
    const weather = await getWeather(city);
    res.send(weather);
});

async function getWeather(city) {
    const apiKey = process.env.WEATHER_API_KEY;
    const weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await axios.get(weatherURL);
        const weather = response.data;
        console.log(
            `The weather in ${city} is ${weather.main.temp}°C with ${weather.weather[0].description}.`
        );
        return weather;
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

app.listen(port, () => {
    console.log("server running...");
});

