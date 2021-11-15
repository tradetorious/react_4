// Default options for highcharts
// there are options for success, loading, and error states

const options = {
  default: {
    title: {
      text: 'Default Text',
      style: {
        color: 'black',
      },
    },
    series: [
      {
        name: 'Minimum temperatures',
        type: 'line',
        states: {
          hover: {
            enabled: false,
          },
        },
        data: [[1], [1]],
      },
      {
        name: 'Maximum temperatures',
        type: 'line',
        color: 'red',
        states: {
          hover: {
            enabled: false,
          },
        },
        data: [[1], [1]],
      },
    ],
    subtitle: {
      text: 'Minimum and maximum temperature 16 day forecast',
      style: { color: 'black' },
    },
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
  },
  error: {
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
  },
  loading: {
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
  },
};

export default options;
