export interface WeatherData {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    daily_units: {
        time: string;
        temperature_2m_max: string;
        temperature_2m_min: string;
        precipitation_sum: string;
        weathercode: string;
    };
    daily: {
        time: string[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        precipitation_sum: number[];
        weathercode: number[];
    };
}

export interface DailyWeather {
    date: string;
    tempMax: number;
    tempMin: number;
    precipitation: number;
    weathercode: number;
}