/* --- STATE --- */
export interface WeatherState {
  cities: City[];
  activeCity: string;
  forecastData: WeatherNode[];
  isLoading: boolean;
  isError: boolean;
}

interface City {
  id: string;
  name: string;
}

export interface WeatherNode {
  min_temp: number;
  max_temp: number;
  ts: number;
}
