import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import {
  useInjectReducer,
  useInjectSaga,
} from '../../../../../../utils/redux-injectors';
import { chartSaga } from './saga';
import { ChartState, WeatherNode } from './types';

export const initialState: ChartState = {
  activeCity: '792680', // Belgrade
  forecastData: [],
  isLoading: false,
  isError: false,
};

const slice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    setForecastData(state, action: PayloadAction<{ id: string; data: [] }>) {
      const { id, data } = action.payload;
      // Only save data that is actually needed
      const forecastData: WeatherNode[] = data.map(
        ({ min_temp, max_temp, ts }) => ({
          min_temp,
          max_temp,
          ts: ts * 1000,
        }),
      );

      state.forecastData = forecastData;
      state.activeCity = id;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setIsError(state, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    },
  },
});

export const { actions: chartActions } = slice;

export const useChartSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: chartSaga });
  return { actions: slice.actions };
};
