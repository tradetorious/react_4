/**
 *
 * Chart
 *
 */
import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  selectActiveCityName,
  selectIsError,
  selectIsLoading,
  selectMaxTemps,
  selectMinTemps,
} from '../../slice/selectors';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const defaultChartOptions: Highcharts.Options = {
  yAxis: {
    title: {
      text: 'Temperature C`°',
    },
  },
  xAxis: {
    type: 'datetime',
    showFirstLabel: true,
    showLastLabel: true,
    tickInterval: 24 * 3600 * 1000,
    tickWidth: 0,
    gridLineWidth: 1,
    accessibility: {
      rangeDescription: `Range: 16 days from today`,
    },
  },
};

export default function Chart(props: HighchartsReact.Props) {
  const [options, setOptions] =
    useState<Highcharts.Options>(defaultChartOptions);
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const maxTemps = useSelector(selectMaxTemps);
  const minTemps = useSelector(selectMinTemps);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const cityName = useSelector(selectActiveCityName);

  useEffect(() => {
    if (isLoading) {
      setOptions(oldOptions => ({
        ...oldOptions,
        title: {
          text: 'Loading...',
          style: {
            color: 'orange',
          },
        },
        subtitle: {
          text: 'Your data will be loaded shortly',
          style: {
            color: 'orange',
          },
        },
      }));
    } else if (isError) {
      setOptions(oldOptions => ({
        ...oldOptions,
        title: {
          text: 'ERROR!',
          style: {
            color: 'red',
          },
        },
        subtitle: {
          text: 'Your data could not be loaded',
          style: {
            color: 'red',
          },
        },
      }));
    } else {
      setOptions(oldOptions => ({
        ...oldOptions,
        title: {
          text: cityName,
          style: {
            color: 'black',
          },
        },
        subtitle: {
          text: 'Minimum and maximum temperature 16 day forecast',
          style: { color: 'black' },
        },
        xAxis: {
          type: 'datetime',
          showFirstLabel: true,
          showLastLabel: true,
          tickInterval: 24 * 3600 * 1000,
          tickWidth: 0,
          gridLineWidth: 1,
          accessibility: {
            rangeDescription: `Range: 16 days from today`,
          },
        },
        series: [
          {
            name: 'Minimum temperatures',
            type: 'line',
            data: minTemps,
            states: {
              hover: {
                enabled: false,
              },
            },
          },
          {
            name: 'Maximum temperatures',
            type: 'line',
            data: maxTemps,
            color: 'red',
            states: {
              hover: {
                enabled: false,
              },
            },
          },
        ],
      }));
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
