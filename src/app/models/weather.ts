export interface WeatherData {
    daily: {
        time: string[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        precipitation_sum: number[];
        weathercode: number[];
        wind_speed_10m_max: number[];
        wind_direction_10m_dominant: number[];
        uv_index_max: number[];
        sunrise: string[];
        sunset: string[];
    };
    hourly: {
        time: string[];
        relative_humidity_2m: number[];
        pressure_msl: number[];
    };
}

export interface DailyWeather {
    date: string;
    tempMax: number;
    tempMin: number;
    precipitation: number;
    weathercode: number;
    windSpeedMax: number;
    windDirectionDominant: number;
    uvIndexMax: number;
    sunrise: string;
    sunset: string;
    avgHumidity?: number;
    avgPressure?: number;
}

export interface HourlyWeather {
    time: string;
    humidity: number;
    pressure: number;
}