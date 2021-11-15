import { put, takeLatest } from 'redux-saga/effects';
import { tableActions as actions, fetchCities } from '.';

import { City } from './types';

import data from './mockData';

const fetcher = ms =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.cities);
    }, ms);
  });

function* requestCities() {
  try {
    yield put(actions.setIsLoading(true));
    const cities: City[] = yield fetcher(2000);
    yield put(actions.citiesFetched(cities));
  } catch (err) {
    console.log(err);
    yield put(actions.setIsError(true));
  } finally {
    yield put(actions.setIsLoading(false));
  }
}

export function* tableSaga() {
  yield takeLatest(fetchCities.type, requestCities);
}
