import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.chart || initialState;

export const selectChart = createSelector([selectSlice], state => state);

export const selectActiveCity = createSelector(
  [selectSlice],
  state => state.activeCity,
);

export const selectIsLoading = createSelector(
  [selectSlice],
  state => state.isLoading,
);
export const selectIsError = createSelector(
  [selectSlice],
  state => state.isError,
);

export const selectMaxTemps = createSelector(
  [selectSlice],
  ({ forecastData }) => forecastData.map(node => [node.ts, node.max_temp]),
);

export const selectMinTemps = createSelector(
  [selectSlice],
  ({ forecastData }) => forecastData.map(node => [node.ts, node.min_temp]),
);
