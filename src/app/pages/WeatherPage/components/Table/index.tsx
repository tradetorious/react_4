/**
 *
 * Table
 *
 */
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCities,
  selectIsError,
  selectIsLoading,
} from './slice/selectors';
import styled from 'styled-components/macro';

import { useTableSlice, cityChanged, fetchCities } from './slice';
import { selectActiveCity } from '../Chart/slice/selectors';

export default function Table() {
  useTableSlice();

  const cities = useSelector(selectCities);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const activeCity = useSelector(selectActiveCity);

  const dispatch = useDispatch();

  const handleActiveCityChange = (e, id: string) => {
    if (activeCity !== id) dispatch(cityChanged(id));
  };

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  return (
    <div>
      <TH>
        <span>ID</span>
        <span>NAME</span>
      </TH>
      {isLoading ? (
        <h1>LOADING</h1>
      ) : isError ? (
        <h1>ERROR</h1>
      ) : (
        cities.map(city => {
          const { id, name } = city;

          return (
            <TR key={id} onMouseEnter={e => handleActiveCityChange(e, id)}>
              <span id="id">{id}</span>
              <span id="name">{name}</span>
            </TR>
          );
        })
      )}
    </div>
  );
}

const TR = styled.div`
  padding: 1em;
  margin: 0.5em;
  display: flex;
  justify-content: space-between;
  &:hover {
    color: ${p => p.theme.primary};
    #id,
    #name {
      color: ${p => p.theme.primary};
    }
  }

  #id {
    color: ${p => p.theme.textSecondary};
  }

  #name {
    color: ${p => p.theme.text};
  }

  border: 3px solid ${p => p.theme.borderLight};
  box-sizing: border-box;
  border-radius: 1em;
  min-width: 300px;
`;

const TH = styled(TR)`
  border: none;
  &:hover {
    color: ${p => p.theme.text};
  }
  font-weight: bold;
`;
