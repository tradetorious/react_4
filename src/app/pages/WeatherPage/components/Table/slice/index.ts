import { createAction, PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import {
  useInjectReducer,
  useInjectSaga,
} from '../../../../../../utils/redux-injectors';
import { tableSaga } from './saga';
import { TableState, City } from './types';

export const initialState: TableState = {
  cities: [],
  isLoading: false,
  isError: false,
};

export const fetchCities = createAction<undefined>('table/fetchCities');
export const cityChanged = createAction<string>('table/cityChanged');

const slice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    citiesFetched(state, action: PayloadAction<City[]>) {
      state.cities = [...action.payload];
    },
    // citiesFetch(state) {},
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setIsError(state, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    },
    // cityChanged(sate, action: PayloadAction<string>) {},
  },
});
export const { actions: tableActions } = slice;

export const useTableSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: tableSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useTableSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
