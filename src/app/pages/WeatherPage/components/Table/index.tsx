/**
 *
 * Table
 *
 */
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import { useWeatherSlice } from '../../slice';
import { selectActiveCity, selectCities } from '../../slice/selectors';

export default function Table() {
  const cities = useSelector(selectCities);
  const activeCity = useSelector(selectActiveCity);

  const slice = useWeatherSlice();

  const { actions } = slice;

  const dispatch = useDispatch();

  const handleActiveCityChange = (e, id: string) => {
    if (id !== activeCity) dispatch(actions.setActiveCity(id));
  };

  useEffect(() => {
    dispatch(actions.setActiveCity(activeCity));
  }, [activeCity, dispatch, actions]);

  return (
    <div>
      <TH>
        <span>ID</span>
        <span>NAME</span>
      </TH>
      {cities.map(city => {
        const { id, name } = city;

        return (
          <TR key={id} onMouseEnter={e => handleActiveCityChange(e, id)}>
            <span id="id">{id}</span>
            <span id="name">{name}</span>
          </TR>
        );
      })}
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
