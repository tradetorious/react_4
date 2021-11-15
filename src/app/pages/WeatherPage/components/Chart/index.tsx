/**
 *
 * Chart
 *
 */
import * as React from 'react';

import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// highchart defaults
import highChartsOptions from './slice/highChartsOptions';

import {
  // selectActiveCityName,
  selectIsError,
  selectIsLoading,
  selectMaxTemps,
  selectActiveCity,
  selectMinTemps,
} from './slice/selectors';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useChartSlice } from './slice';
import { selectCities } from '../Table/slice/selectors';

export default function Chart(props: HighchartsReact.Props) {
  const [options, setOptions] = useState(highChartsOptions.default);
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  useChartSlice();

  const maxTemps = useSelector(selectMaxTemps);
  const minTemps = useSelector(selectMinTemps);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const activeCity = useSelector(selectActiveCity);

  const cities = useSelector(selectCities);

  const [cityName, setCityName] = useState('');

  // Get city name from city ID to display in chart title
  useEffect(() => {
    if (cities)
      setCityName(
        prev => cities.find(city => city.id === activeCity)?.name || prev,
      );
  }, [activeCity, cities]);

  // Change the way the chart is rendered based on the loading, error or success states
  useEffect(() => {
    if (isLoading) {
      setOptions(oldOptions => ({
        ...oldOptions,
        ...highChartsOptions.loading,
      }));
    } else if (isError) {
      setOptions(oldOptions => ({
        ...oldOptions,
        ...highChartsOptions.error,
      }));
    } else {
      setOptions(() => {
        const newOptions = { ...highChartsOptions.default };
        newOptions.title = {
          text: cityName,
          style: {
            color: 'black',
          },
        };
        newOptions.series[0].data = minTemps;
        newOptions.series[1].data = maxTemps;

        return newOptions;
      });
    }
  }, [isError, isLoading, maxTemps, minTemps, cityName]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
      {...props}
    />
  );
}
