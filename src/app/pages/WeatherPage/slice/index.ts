import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { weatherSaga } from './saga';
import { WeatherState, WeatherNode } from './types';

export const initialState: WeatherState = {
  cities: [
    {
      id: '792680',
      name: 'Belgrade',
    },
    {
      id: '2761369',
      name: 'Vienna',
    },
    {
      id: '3173435',
      name: 'Milan',
    },
    {
      id: '2759794',
      name: 'Amsterdam',
    },
  ],
  activeCity: '792680', // Belgrade
  forecastData: [],
  isLoading: false,
  isError: false,
};

const slice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setActiveCity(state, action: PayloadAction<string>) {
      state.activeCity = action.payload;
    },
    setForecastData(state, action: PayloadAction<WeatherNode[]>) {
      state.forecastData = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setIsError(state, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    },
  },
});

export const { actions: weatherActions } = slice;

export const useWeatherSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: weatherSaga });
  return { actions: slice.actions };
};
