import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../../../../../types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.table || initialState;

export const selectTable = createSelector([selectSlice], state => state);

const selectIsError = createSelector(selectSlice, state => state.isError);
const selectIsLoading = createSelector(selectSlice, state => state.isLoading);
const selectCities = createSelector(selectSlice, state => state.cities);

export { selectCities, selectIsLoading, selectIsError };
