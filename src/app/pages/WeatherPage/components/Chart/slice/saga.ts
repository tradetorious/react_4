import { request } from 'utils/request';
import { put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { chartActions as actions } from '.';

import { City } from '../../Table/slice/types';
import { cityChanged, tableActions } from '../../Table/slice';

function* fetchForecastData(action: PayloadAction<string | City[]>) {
  const API_KEY = process.env.REACT_APP_API_KEY;
  let id: string;

  // Whether the function is invoked by loading cities, or hovering over city name, the ID will be in different places
  if (action.type === tableActions.citiesFetched.type) {
    const cities = action.payload as City[];
    id = cities[0].id;
  } else {
    id = action.payload as string;
  }

  const url = `https://api.weatherbit.io/v2.0/forecast/daily?city_id=${id}&key=${API_KEY}`;
  yield put(actions.setIsLoading(true));
  try {
    const data = yield request(url);
    yield put(actions.setForecastData({ id, data: data.data }));
  } catch (err) {
    console.log(err);
    yield put(actions.setIsError(true));
  } finally {
    yield put(actions.setIsLoading(false));
  }
}

export function* chartSaga() {
  yield takeLatest(
    [tableActions.citiesFetched.type, cityChanged.type],
    fetchForecastData,
  );
}
