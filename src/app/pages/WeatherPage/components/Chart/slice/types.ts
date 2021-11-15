/* --- STATE --- */
export interface ChartState {
  activeCity: string;
  forecastData: WeatherNode[];
  isLoading: boolean;
  isError: boolean;
}
export interface WeatherNode {
  min_temp: number;
  max_temp: number;
  ts: number;
}
