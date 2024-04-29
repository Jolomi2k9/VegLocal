import React, { useEffect, useState } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button.jsx';


export default function Header() {

    const [weather, setWeather] = useState(null);

    useEffect(() => {
        async function fetchWeather() {

            const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=53.3331&longitude=-6.2489&current_weather=true');            
            
            if(!response.ok) {
                console.error("Error fetching weather data");
                return;
            }   
    
            const data = await response.json();
            setWeather(data.current_weather);
        }

        fetchWeather();
    }, []);


    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="VegLocal"/>
                <h1>VegLocal</h1>
            </div>
            <div id="weather">
                {weather ? (
                    <a href="https://www.met.ie/weather-forecast/dublin-city" target="_blank" rel="noopener noreferrer">
                    <p>Current Temperature in Dublin: {weather.temperature}°C</p>
                    </a>
                ) : (
                    <p>Loading weather...</p>
                )}
            </div>
            <nav>
                <Button textOnly>Contact</Button>                
            </nav>
        </header>
    );
}