import { WeatherNode } from './types';
import { put, takeLatest } from 'redux-saga/effects';
import { weatherActions as actions } from '.';
import axios from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';

function* fetchForecastData(action: PayloadAction<string>) {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const id = action.payload;

  const url = `https://api.weatherbit.io/v2.0/forecast/daily?city_id=${id}&key=${API_KEY}`;

  yield put(actions.setIsLoading(true));
  try {
    const data = yield axios
      .request({
        method: 'get',
        url,
        headers: { 'Access-Control-Allow-Origin': '*' },
      })
      .then(res => res.data);

    const forecastData: WeatherNode[] = data.data.map(
      ({ min_temp, max_temp, ts }) => ({
        min_temp,
        max_temp,
        ts: ts * 1000,
      }),
    );

    yield put(actions.setForecastData(forecastData));
  } catch (err) {
    console.log(err);
    yield put(actions.setIsError(true));
  } finally {
    yield put(actions.setIsLoading(false));
  }
}

export function* weatherSaga() {
  yield takeLatest(actions.setActiveCity.type, fetchForecastData);
}
