import { put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import axios from 'axios';

import { chartActions as actions } from '.';

import { City } from '../../Table/slice/types';
import { cityChanged, tableActions } from '../../Table/slice';

function* fetchForecastData(action: PayloadAction<string | City[]>) {
  const API_KEY = process.env.REACT_APP_API_KEY;
  let id: string;

  if (action.type === tableActions.citiesFetched.type) {
    const cities = action.payload as City[];
    id = cities[0].id;
    console.log(id);
  } else {
    id = action.payload as string;
  }

  const url = `https://api.weatherbit.io/v2.0/forecast/daily?city_id=${id}&key=${API_KEY}`;
  console.log(url);
  yield put(actions.setIsLoading(true));
  try {
    const data = yield axios
      .request({
        method: 'get',
        url,
        headers: { 'Access-Control-Allow-Origin': '*' },
      })
      .then(res => res.data);

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
